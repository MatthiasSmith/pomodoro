import React from 'react';
import styled from 'styled-components';
import Button from '../button';

const UpArrowIcon = require('../../../public/assets/icon-arrow-up.svg');

const StyledTimerField = styled.div`
  &:first-of-type {
    margin-top: 1.125rem;
  }

  &:not(:first-of-type) {
    margin-top: 0.5rem;
  }

  .field-label {
    color: #bbb;
    font-size: 0.75rem;
    font-weight: var(--font-weight-bold);
  }

  .field-input__container {
    position: relative;
  }

  .field-input {
    appearance: none;
    -moz-appearance: textfield;
    background-color: var(--light-gray);
    border: none;
    border-radius: 0.625rem;
    font-family: var(--font-family-sans);
    font-size: 0.875rem;
    font-weight: var(--font-weight-bold);
    width: 8.75rem;
    padding: 0.9375rem 1rem 0.6875rem;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      appearance: none;
      margin: 0;
    }
  }

  .arrow-btn {
    position: absolute;
    right: 1rem;
    z-index: 1;

    &:hover svg > path {
      stroke-opacity: 1;
    }

    &__up {
      top: 0.45rem;
    }

    &__down {
      bottom: 0.45rem;
    }

    svg > path {
      transition: stroke-opacity 0.2s ease-out;
    }
  }
`;

const TimeSettingsField = ({
  label,
  name,
  id,
  value,
  onChange,
}: {
  label: string;
  name: string;
  id: string;
  value: number | string;
  onChange: Function;
}) => {
  const handleChange = (event: any) => {
    const action =
      event.type === 'click' ? event.currentTarget.dataset.label : 'typing';
    const customEvent = { ...event, action, field: name };
    onChange(customEvent);
  };

  return (
    <StyledTimerField className='flex-row align-center space-between'>
      <label className='field-label' htmlFor={id}>
        {label}
      </label>
      <div className='field-input__container'>
        <input
          className='field-input'
          type='number'
          id={id}
          name={id}
          value={value}
          onChange={handleChange}
          min={1}
          max={60}
        />
        <Button
          className='arrow-btn arrow-btn__up'
          aria-label='increase value by 1'
          data-label='increase'
          onClick={handleChange}
        >
          <svg
            aria-hidden={true}
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='7'
          >
            <path
              fill='none'
              stroke='#1E213F'
              strokeOpacity='.25'
              strokeWidth='2'
              d='M1 6l6-4 6 4'
            />
          </svg>
        </Button>
        <Button
          className='arrow-btn arrow-btn__down'
          aria-label='decrease value by 1'
          data-label='decrease'
          onClick={handleChange}
        >
          <svg
            aria-hidden={true}
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='7'
          >
            <path
              fill='none'
              stroke='#1E213F'
              strokeOpacity='.25'
              strokeWidth='2'
              d='M1 1l6 4 6-4'
            />
          </svg>
        </Button>
      </div>
    </StyledTimerField>
  );
};

export default TimeSettingsField;