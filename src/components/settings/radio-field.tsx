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

  &:hover::before {
    background: transparent;
    border: 1px solid var(--light-gray);
    border-radius: 50%;
    content: '';
    position: absolute;
    height: 3.125rem;
    width: 3.125rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .radio-field__input {
    appearance: none;
    cursor: pointer;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
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
  }

  .radio-field__checkmark {
    background: none;
    border-bottom: solid 3px var(--darker-blue);
    border-left: solid 3px var(--darker-blue);
    box-sizing: unset;
    height: 5px;
    width: 12px;
    left: 50%;
    top: 44%;
    margin-top: -6px;
    position: absolute;
    transform: rotate(-45deg) translate(-50%, -50%);
    transition: transform 0.1s ease-out;
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
}: {
  id: string;
  name: string;
  value: string;
  isSelected: boolean;
  onChange: Function;
  label?: string;
  className?: string;
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
      />
      {label ? (
        <label htmlFor={id} className='radio-field__label'>
          {label}
        </label>
      ) : (
        isSelected && <div className='radio-field__checkmark'></div>
      )}
    </StyledRadioField>
  );
};

export default RadioField;
