import React, { useContext } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';

import { SoundSettingsContext } from '../../providers/sound-settings-provider';

const clickSFX = require('../../../public/sounds/sound-on.mp3');

interface RadioFieldType {
  isSelected?: boolean;
}

const StyledRadioField = styled.div<RadioFieldType>`
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  &:not(:first-of-type) {
    margin-left: 1rem;
  }

  &:before {
    background: transparent;
    border: 1px solid var(--light-gray);
    border-radius: 50%;
    content: '';
    position: absolute;
    height: 3.125rem;
    width: 3.125rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    transition: all 0.3s ease-out;
    z-index: -1;
  }

  &:hover:not(.selected)::before {
    transform: translate(-50%, -50%) scale(1);
  }

  &.selected::after {
    border-radius: 50%;
    box-shadow: 0rem 0rem 0.5rem 0rem rgba(0, 0, 0, 0.15);
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 2.5rem;
    width: 2.5rem;
    animation: ripple 0.5s cubic-bezier(0.11, 0.45, 0.72, 1) forwards;
  }

  .radio-field__input {
    appearance: none;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      box-shadow: 0rem 0rem 0rem 0.185rem white,
        0rem 0rem 0rem 0.285rem var(--focus-blue);
    }
  }

  .radio-field__label {
    color: ${(props) => (props.isSelected ? 'white' : 'var(--dark-blue)')};
    cursor: pointer;
    font-size: 0.9375rem;
    line-height: 0.9375rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: color 0.5s ease-out;
  }

  .radio-field__checkmark {
    animation: scale-in 0.18s ease-out 0s forwards;
    background: none;
    border-bottom: solid 2px var(--darker-blue);
    border-left: solid 2px var(--darker-blue);
    box-sizing: unset;
    height: 0.25rem;
    width: 0.625rem;
    left: 50%;
    top: 50%;
    margin-top: -6px;
    position: absolute;
    transform: scale(0) rotate(-45deg) translate(-50%, -50%);
    transform-origin: left bottom;

    @keyframes scale-in {
      from {
        transform: scale(0) rotate(-45deg) translate(-50%, -50%);
      }
      to {
        transform: scale(1) rotate(-45deg) translate(-50%, -50%);
        transform-origin: 50% 50%;
      }
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    &::before {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1);
      transition-property: opacity;
    }

    &:hover:not(.selected)::before {
      opacity: 1;
    }

    &.selected::after {
      display: none;
    }

    .radio-field__checkmark {
      animation-name: fade-in;
      transform: scale(1) rotate(-45deg) translate(-50%, -50%);
      transform-origin: 50% 50%;
    }
  }
`;

const RadioField = ({
  id,
  name,
  value,
  label,
  isSelected,
  onChange,
  className,
  ariaLabel,
}: {
  id: string;
  name: string;
  value: string;
  isSelected: boolean;
  onChange: Function;
  label?: string;
  className?: string;
  ariaLabel?: string;
}) => {
  const {
    soundSettings: { volume, soundEnabled },
  } = useContext(SoundSettingsContext);
  const [playClick] = useSound(clickSFX, {
    playbackRate: 1.5,
    volume,
    soundEnabled,
  });

  const handleChange = (event: any) => {
    playClick();
    onChange(event);
  };

  return (
    <StyledRadioField
      isSelected={isSelected}
      className={`${className} ${isSelected && 'selected'}`}
    >
      <input
        className='radio-field__input'
        id={id}
        type='radio'
        name={name}
        value={value}
        checked={isSelected}
        onChange={handleChange}
        aria-label={ariaLabel || undefined}
      />
      {label ? (
        <label aria-hidden={true} htmlFor={id} className='radio-field__label'>
          {label}
        </label>
      ) : (
        isSelected && <div className='radio-field__checkmark'></div>
      )}
    </StyledRadioField>
  );
};

export default RadioField;
