import React from 'react';
import styled from 'styled-components';

import { SettingsType } from '../../types/settings';
import { TABLET_BP } from '../../constants/breakpoints';
import Button from '../button';
import TimeSettingsField from './time-settings-field';
import RadioField from './radio-field';

const StyledSettingsForm = styled.form`
  border-top: 1px solid #e3e1e1;
  padding: 0 1.5rem;

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
    background-color: var(--red-orange);
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
    .apply-btn {
      transition-property: background-color;

      &:hover {
        transform: unset;
      }
    }
  }

  @media screen and (min-width: ${TABLET_BP}em) {
    padding: 0 2.5rem;

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

const SettingsForm = ({
  settings,
  onTimeChange,
  onFontChange,
  onColorChange,
  onSave,
}: {
  settings: SettingsType;
  onTimeChange: (event: any) => void;
  onFontChange: (event: any) => void;
  onColorChange: (event: any) => void;
  onSave: (event: any) => void;
}) => {
  return (
    <StyledSettingsForm>
      <section className='settings-form-section settings-form-section__time'>
        <h3 className='settings-form-section__heading'>Time (minutes)</h3>
        <div className='time-fields__container'>
          <TimeSettingsField
            id='pomodoro-timer-input'
            name='pomodoro'
            label='pomodoro'
            value={settings.pomodoro}
            onChange={onTimeChange}
          />
          <TimeSettingsField
            id='short-break-timer-input'
            name='shortBreak'
            label='short break'
            value={settings.shortBreak}
            onChange={onTimeChange}
          />
          <TimeSettingsField
            id='long-break-timer-input'
            name='longBreak'
            label='long break'
            value={settings.longBreak}
            onChange={onTimeChange}
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
            isSelected={settings.font === 'sans'}
            label='Aa'
            onChange={onFontChange}
            ariaLabel={'sans font'}
          />
          <RadioField
            className='serif-font'
            id='serif'
            name='font'
            value='serif'
            isSelected={settings.font === 'serif'}
            label='Aa'
            onChange={onFontChange}
            ariaLabel={'serif font'}
          />
          <RadioField
            className='mono-font'
            id='mono'
            name='font'
            value='mono'
            isSelected={settings.font === 'mono'}
            label='Aa'
            onChange={onFontChange}
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
            isSelected={settings.color === 'red-orange'}
            onChange={onColorChange}
            ariaLabel='red-orange color'
          />
          <RadioField
            className='teal'
            id='teal'
            name='color'
            value='teal'
            isSelected={settings.color === 'teal'}
            onChange={onColorChange}
            ariaLabel='teal color'
          />
          <RadioField
            className='violet'
            id='violet'
            name='color'
            value='violet'
            isSelected={settings.color === 'violet'}
            onChange={onColorChange}
            ariaLabel='violet color'
          />
        </fieldset>
      </section>
      <Button
        className='apply-btn'
        type='submit'
        onClick={onSave}
        aria-label='Apply changes and close the settings dialog'
      >
        Apply
      </Button>
    </StyledSettingsForm>
  );
};

export default SettingsForm;
