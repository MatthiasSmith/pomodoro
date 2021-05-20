import React from 'react';
import styled from 'styled-components';

interface RadioFieldType {
  isSelected?: boolean;
}

const StyledRadioField = styled.div<RadioFieldType>`
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  position: relative;

  &:not(:first-of-type) {
    margin-left: 1rem;
  }

  &:before {
    background: transparent;
    border: 1px solid var(--light-gray);
    border-radius: 50%;
    content: '';
    opacity: 0;
    position: absolute;
    height: 3.125rem;
    width: 3.125rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.18s ease-out;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
  }

  .radio-field__input {
    appearance: none;
    cursor: pointer;
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
    transition: color 0.3s ease-out;
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
  const handleChange = (event: any) => {
    onChange(event);
  };

  return (
    <StyledRadioField isSelected={isSelected} className={`${className}`}>
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
