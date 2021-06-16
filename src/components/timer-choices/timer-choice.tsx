import React from 'react';
import styled from 'styled-components';

import { TABLET_BP } from '../../constants/breakpoints';

interface TimerChoiceProps {
  isSelected?: boolean;
}

const StyledTimerChoice = styled.div<TimerChoiceProps>`
  position: relative;
  z-index: 1;
  -webkit-tap-highlight-color: transparent;

  &:hover .timer-choice__label {
    opacity: 1;
  }

  .timer-choice__radio {
    appearance: none;
    border: none;
    border-radius: 1.65625rem;
    cursor: pointer;
    height: 3rem;
    min-width: 6.5625rem;
    width: 100%;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      box-shadow: 0rem 0rem 0rem 0.125rem var(--darker-blue),
        0rem 0rem 0rem 0.25rem rgba(255, 255, 255, 0.38);
    }
  }

  .timer-choice__label {
    color: ${(props) =>
      props.isSelected ? 'var(--dark-blue)' : 'var(--light-blue)'};
    cursor: pointer;
    font-family: ${(props) => props.theme.fontFamily};
    font-size: 0.75rem;
    font-weight: var(--font-weight-bold);
    line-height: 0.75rem;
    opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease-out, color 0.3s ease-out;
    white-space: nowrap;
  }

  @media screen and (min-width: ${TABLET_BP}em) {
    .timer-choice__radio {
      min-width: 7.5rem;
    }

    .timer-choice__label {
      font-size: 0.875rem;
      line-height: 0.875rem;
    }
  }
`;

const TimerChoice = ({
  id,
  name,
  value,
  isSelected,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  isSelected?: boolean;
  onChange: Function;
}) => {
  const handleChange = (event: any) => {
    onChange(event);
  };

  return (
    <StyledTimerChoice isSelected={isSelected}>
      <input
        className='timer-choice__radio'
        id={id}
        type='radio'
        name={name}
        value={value}
        checked={isSelected}
        onChange={handleChange}
      />
      <label htmlFor={id} className='timer-choice__label'>
        {value}
      </label>
    </StyledTimerChoice>
  );
};

export default TimerChoice;
