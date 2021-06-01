import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';

import {
  focusFirstTabbableElement,
  getFocusableElements,
} from '../../helpers/dialog-helper';
import { SettingsType } from '../../types/settings';
import { SettingsContext } from '../../providers/settings-provider';
import { SoundSettingsContext } from '../../providers/sound-settings-provider';
import { TABLET_BP } from '../../constants/breakpoints';
import SettingsDialogHeader from './settings-dialog-header';
import SettingsForm from './settings-form';

const closeSFX = require('../../../public/sounds/close-settings.mp3');

const StyledDialogBackdrop = styled.div`
  animation: fade-in 0.5s ease-out 0s forwards;
  background: rgba(0, 0, 0, 0.45);
  height: 100%;
  width: 100%;
  opacity: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;

  &.close {
    animation: fade-out 0.5s ease-out 0s forwards;
  }

  @media screen and (prefers-reduced-motion: reduce) {
    animation-duration: 0.3s;

    &.close {
      animation-duration: 0.3s;
    }
  }
`;

const StyledDialog = styled.div`
  animation: slide-in 0.5s cubic-bezier(0.31, 1.18, 0.64, 1.05) 0s forwards;
  background: white;
  border-radius: 0.9375rem;
  color: var(--darker-blue);
  height: 100%;
  width: 88%;
  max-height: 35.3125rem;
  max-width: 33.75rem;
  position: fixed;
  top: 2.875rem;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: 10;

  &:focus {
    outline: none;
    box-shadow: 0rem 0rem 0rem 0.185rem rgba(0, 0, 0, 0.45),
      0rem 0rem 0rem 0.25rem rgb(93, 96, 184);
  }

  &.close {
    animation: slide-out 0.5s cubic-bezier(0.42, -0.18, 0.82, 0.18) 0s forwards;
  }

  @keyframes slide-in {
    from {
      transform: translate(-50%, 150%);
    }
    to {
      transform: translate(-50%, 0%);
    }
  }

  @keyframes slide-out {
    from {
      transform: translate(-50%, 0%);
    }
    to {
      transform: translate(-50%, 150%);
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    animation: fade-in 0.3s cubic-bezier(0.31, 1.18, 0.64, 1.05) 0s forwards;
    transform: translate(-50%, 0%);

    &.close {
      animation: fade-out 0.3s cubic-bezier(0.42, -0.18, 0.82, 0.18) 0s forwards;
    }
  }

  @media screen and (min-width: ${TABLET_BP}em) {
    border-radius: 1.5625rem;
    max-height: 28.965rem;
    top: 50%;
    transform: translate(-50%, 110%);

    @keyframes slide-in {
      from {
        transform: translate(-50%, 150%);
      }
      to {
        transform: translate(-50%, -50%);
      }
    }

    @keyframes slide-out {
      from {
        transform: translate(-50%, -50%);
      }
      to {
        transform: translate(-50%, 150%);
      }
    }

    @media screen and (prefers-reduced-motion: reduce) {
      animation: fade-in 0.3s cubic-bezier(0.31, 1.18, 0.64, 1.05) 0s forwards;
      transform: translate(-50%, -50%);
    }
  }
`;

const SettingsDialog = ({ onClose }: { onClose: () => void }) => {
  const {
    settings,
    setSettings,
  }: { settings: SettingsType; setSettings: (value: SettingsType) => void } =
    useContext(SettingsContext);
  const {
    soundSettings: { volume, soundEnabled },
  } = useContext(SoundSettingsContext);
  const [settingsCopy, setSettingsCopy] = useState<SettingsType>({
    ...settings,
  });
  const dialogContainerRef = useRef(null);
  const backdropRef = useRef(null);
  const dialogRef = useRef(null);
  const [playClose] = useSound(closeSFX, {
    volume,
    soundEnabled,
  });
  const [focusableEls, setFocusableEls]: [
    Array<HTMLElement>,
    Dispatch<SetStateAction<Array<HTMLElement>>>
  ] = useState([]);

  useEffect(
    () => setFocusableEls(getFocusableElements(dialogContainerRef)),
    []
  );

  const handleAnimationEnd = (event: any) => {
    event.stopPropagation();
    const isReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (
      event.animationName === 'slide-in' ||
      (isReducedMotion && event.animationName === 'fade-in')
    ) {
      focusFirstTabbableElement(focusableEls);
    } else if (
      event.animationName === 'slide-out' ||
      (isReducedMotion && event.animationName === 'fade-out')
    ) {
      onClose();
    }
  };

  const handleClose = () => {
    backdropRef.current.classList.add('close');
    dialogRef.current.classList.add('close');
    playClose();
  };

  const handleKeyUp = (event: any) => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      handleClose();
      return;
    }

    if (
      event.shiftKey &&
      event.key === 'Tab' &&
      focusableEls[0] === document.activeElement
    ) {
      focusableEls[focusableEls.length - 2].focus();
    } else if (
      event.key === 'Tab' &&
      focusableEls[focusableEls.length - 1] === document.activeElement
    ) {
      focusableEls[1].focus();
    }
  };

  const handleSaveSettings = (event: any) => {
    event.preventDefault();
    setSettings({ ...settingsCopy });
    handleClose();
  };

  const handleTimeChange = (event: any) => {
    let newVal = event.currentTarget.value;
    if (event.type === 'click') {
      const field = Number(settingsCopy[event.field as keyof SettingsType]);
      newVal = event.action === 'increase' ? field + 1 : field - 1;
    }
    event.field === 'pomodoro'
      ? setSettingsCopy({ ...settingsCopy, pomodoro: newVal })
      : event.field === 'shortBreak'
      ? setSettingsCopy({ ...settingsCopy, shortBreak: newVal })
      : setSettingsCopy({ ...settingsCopy, longBreak: newVal });
  };

  const handleFontChange = (event: any) => {
    setSettingsCopy({ ...settingsCopy, font: event.currentTarget.value });
  };

  const handleColorChange = (event: any) => {
    setSettingsCopy({ ...settingsCopy, color: event.currentTarget.value });
  };

  return (
    <div
      className='dialog-container'
      onKeyUp={handleKeyUp}
      ref={dialogContainerRef}
    >
      <StyledDialogBackdrop ref={backdropRef} />
      <div className='tab-focus-trap' tabIndex={0}></div>
      <StyledDialog
        onAnimationEnd={handleAnimationEnd}
        role='dialog'
        aria-modal='true'
        aria-labelledby='settingsHeading'
        ref={dialogRef}
      >
        <SettingsDialogHeader onClose={handleClose} />
        <SettingsForm
          settings={settingsCopy}
          onTimeChange={handleTimeChange}
          onFontChange={handleFontChange}
          onColorChange={handleColorChange}
          onSave={handleSaveSettings}
        />
      </StyledDialog>
      <div className='tab-focus-trap' tabIndex={0}></div>
    </div>
  );
};

export default SettingsDialog;
