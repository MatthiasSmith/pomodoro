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
import Button from '../button';
import TimeSettingsField from './time-settings-field';
import RadioField from './radio-field';

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

  .settings-header-row {
    padding: 1.5rem 1.5rem 1.75rem;
  }

  .settings-heading {
    font-size: 1.5rem;
  }

  .close-btn {
    height: 28px;
    width: 28px;

    &:focus {
      outline: none;
      border-radius: 0.25rem;
      box-shadow: 0rem 0rem 0rem 0.125rem var(--focus-blue);
    }
  }

  .settings-form {
    border-top: 1px solid #e3e1e1;
    padding: 0 1.5rem;
  }

  .settings-form-section {
    padding: 1.5rem 0;

    &:not(:first-of-type) {
      border-top: 1px solid #e3e1e1;
    }
  }

  .settings-form-section__heading {
    font-size: 0.6875rem;
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.264375rem;
    text-align: center;
    text-transform: uppercase;
  }

  .radio-group-container {
    border: none;
    justify-content: center;
    margin-top: 1.125rem;
  }

  .font-settings-radio-container {
    input {
      background-color: var(--light-gray);
      transition: background-color 0.5s ease-out;
    }

    .selected input {
      background-color: var(--darker-blue);
    }
  }

  .color-settings-radio-container {
    .red-orange input {
      background-color: var(--red-orange);
    }

    .teal input {
      background-color: var(--teal);
    }

    .violet input {
      background-color: var(--violet);
    }
  }

  .sans-font {
    font-family: var(--font-family-sans);
    font-weight: var(--font-weight-bold);
  }

  .serif-font {
    font-family: var(--font-family-serif);
    font-weight: var(--font-weight-normal);
  }

  .mono-font {
    font-family: var(--font-family-mono);
    font-weight: var(--font-weight-bold);
  }

  .apply-btn {
    appearance: none;
    background-color: var(--red-orange);
    border: none;
    border-radius: 1.65625rem;
    display: block;
    color: white;
    font-family: var(--font-family-sans);
    font-weight: var(--font-weight-bold);
    font-size: 1rem;
    height: 3.3125rem;
    width: 8.75rem;
    margin: 0.25rem auto 0;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease-out;

    &:hover {
      background-color: var(--light-red-orange);
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      background-color: var(--light-red-orange);
      box-shadow: 0rem 0rem 0rem 0.135rem var(--focus-blue);
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    animation: fade-in 0.3s cubic-bezier(0.31, 1.18, 0.64, 1.05) 0s forwards;
    transform: translate(-50%, 0%);

    &.close {
      animation: fade-out 0.3s cubic-bezier(0.42, -0.18, 0.82, 0.18) 0s forwards;
    }

    .apply-btn {
      transition-property: background-color;

      &:hover {
        transform: unset;
      }
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

    .settings-header-row {
      padding: 2.125rem 2.5rem 2rem;
    }

    .settings-heading {
      font-size: 1.75rem;
    }

    .settings-form {
      padding: 0 2.5rem;
    }

    .settings-form-section:not(.settings-form-section__time) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .settings-form-section__heading {
      font-size: 0.8125rem;
      letter-spacing: 0.3125rem;
      text-align: left;
    }

    .time-fields__container {
      display: flex;
      justify-content: space-between;
      margin-top: 1.375rem;
    }

    .radio-group-container {
      margin-top: 0;
    }

    .apply-btn {
      margin: 0.7rem auto 0;
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
        <div className='settings-header-row flex-row space-between'>
          <h2 id='settingsHeading' className='settings-heading'>
            Settings
          </h2>
          <Button
            type='button'
            className='close-btn'
            onClick={handleClose}
            aria-label='Close settings dialog'
          >
            <svg
              aria-hidden={true}
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
            >
              <path
                fill='#1E213F'
                fillRule='evenodd'
                d='M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z'
                opacity='.5'
              />
            </svg>
          </Button>
        </div>
        <form className='settings-form'>
          <section className='settings-form-section settings-form-section__time'>
            <h3 className='settings-form-section__heading'>Time (minutes)</h3>
            <div className='time-fields__container'>
              <TimeSettingsField
                id='pomodoro-timer-input'
                name='pomodoro'
                label='pomodoro'
                value={settingsCopy.pomodoro}
                onChange={handleTimeChange}
              />
              <TimeSettingsField
                id='short-break-timer-input'
                name='shortBreak'
                label='short break'
                value={settingsCopy.shortBreak}
                onChange={handleTimeChange}
              />
              <TimeSettingsField
                id='long-break-timer-input'
                name='longBreak'
                label='long break'
                value={settingsCopy.longBreak}
                onChange={handleTimeChange}
              />
            </div>
          </section>
          <section className='settings-form-section settings-form-section__font'>
            <h3 className='settings-form-section__heading'>Font</h3>
            <fieldset className='radio-group-container font-settings-radio-container flex-row align-center'>
              <RadioField
                className='sans-font'
                id='sans'
                name='font'
                value='sans'
                isSelected={settingsCopy.font === 'sans'}
                label='Aa'
                onChange={handleFontChange}
                ariaLabel={'sans font'}
              />
              <RadioField
                className='serif-font'
                id='serif'
                name='font'
                value='serif'
                isSelected={settingsCopy.font === 'serif'}
                label='Aa'
                onChange={handleFontChange}
                ariaLabel={'serif font'}
              />
              <RadioField
                className='mono-font'
                id='mono'
                name='font'
                value='mono'
                isSelected={settingsCopy.font === 'mono'}
                label='Aa'
                onChange={handleFontChange}
                ariaLabel={'mono font'}
              />
            </fieldset>
          </section>
          <section className='settings-form-section settings-form-section__color'>
            <h3 className='settings-form-section__heading'>Color</h3>
            <fieldset className='radio-group-container color-settings-radio-container flex-row'>
              <RadioField
                className='red-orange'
                id='red-orange'
                name='color'
                value='red-orange'
                isSelected={settingsCopy.color === 'red-orange'}
                onChange={handleColorChange}
                ariaLabel='red-orange color'
              />
              <RadioField
                className='teal'
                id='teal'
                name='color'
                value='teal'
                isSelected={settingsCopy.color === 'teal'}
                onChange={handleColorChange}
                ariaLabel='teal color'
              />
              <RadioField
                className='violet'
                id='violet'
                name='color'
                value='violet'
                isSelected={settingsCopy.color === 'violet'}
                onChange={handleColorChange}
                ariaLabel='violet color'
              />
            </fieldset>
          </section>
          <Button
            className='apply-btn'
            type='submit'
            onClick={handleSaveSettings}
            aria-label='Apply changes and close the settings dialog'
          >
            Apply
          </Button>
        </form>
      </StyledDialog>
      <div className='tab-focus-trap' tabIndex={0}></div>
    </div>
  );
};

export default SettingsDialog;
