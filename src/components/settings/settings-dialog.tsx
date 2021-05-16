import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { SettingsType } from '../../types/settings';
import { SettingsContext } from '../../providers/settings-provider';
import Button from '../button';
import TimeSettingsField from './time-settings-field';
import RadioField from './radio-field';

const StyledDialogBackdrop = styled.div`
  background: rgba(0, 0, 0, 0.45);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
`;

const StyledDialog = styled.div`
  background: white;
  border-radius: 0.9375rem;
  color: var(--darker-blue);
  height: 100%;
  width: 88%;
  max-height: 35.0625rem;
  max-width: 33.75rem;
  position: fixed;
  top: 2.875rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  .settings-header-row {
    padding: 1.5rem 1.5rem 1.75rem;
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
    justify-content: center;
    margin-top: 1.125rem;
  }

  .font-settings-radio-container {
    input {
      background-color: var(--light-gray);
    }

    .isSelected input {
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
    background: var(--red-orange);
    border: none;
    border-radius: 1.65625rem;
    display: block;
    color: white;
    font-family: var(--font-family-sans);
    font-weight: var(--font-weight-bold);
    font-size: 1rem;
    height: 3.3125rem;
    width: 8.75rem;
    margin: 0.5rem auto 0;
    position: relative;
    z-index: 1;
  }
`;

const RulesDialog = ({ onClose }: { onClose: () => void }) => {
  const {
    settings,
    setSettings,
  }: { settings: SettingsType; setSettings: (value: SettingsType) => void } =
    useContext(SettingsContext);
  const [settingsCopy, setSettingsCopy] = useState<SettingsType>({
    ...settings,
  });
  const backdropRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current.focus();
  }, []);

  const handleKeyUp = (event: any) => {
    event.stopPropagation();

    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleSaveSettings = (event: any) => {
    event.preventDefault();
    setSettings({ ...settingsCopy });
    onClose();
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
    <>
      <StyledDialogBackdrop ref={backdropRef} />
      <StyledDialog
        ref={dialogRef}
        tabIndex={-1}
        onKeyUp={handleKeyUp}
        role='dialog'
        aria-labelledby='settingsHeader'
      >
        <div className='settings-header-row flex-row space-between'>
          <h2 id='settingsHeader'>Settings</h2>
          <Button
            type='button'
            onClick={onClose}
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
          </section>
          <section className='settings-form-section settings-form-section__font'>
            <h3 className='settings-form-section__heading'>Font</h3>
            <div className='radio-group-container font-settings-radio-container flex-row align-center'>
              <RadioField
                className={`sans-font ${
                  settingsCopy.font === 'sans' ? 'isSelected' : ''
                }`}
                id='sans'
                name='font'
                value='sans'
                isSelected={settingsCopy.font === 'sans'}
                label='Aa'
                onChange={handleFontChange}
              />
              <RadioField
                className={`serif-font ${
                  settingsCopy.font === 'serif' ? 'isSelected' : ''
                }`}
                id='serif'
                name='font'
                value='serif'
                isSelected={settingsCopy.font === 'serif'}
                label='Aa'
                onChange={handleFontChange}
              />
              <RadioField
                className={`mono-font ${
                  settingsCopy.font === 'mono' ? 'isSelected' : ''
                }`}
                id='mono'
                name='font'
                value='mono'
                isSelected={settingsCopy.font === 'mono'}
                label='Aa'
                onChange={handleFontChange}
              />
            </div>
          </section>
          <section className='settings-form-section settings-form-section__color'>
            <h3 className='settings-form-section__heading'>Color</h3>
            <div className='radio-group-container color-settings-radio-container flex-row'>
              <RadioField
                className='red-orange'
                id='red-orange'
                name='color'
                value='red-orange'
                isSelected={settingsCopy.color === 'red-orange'}
                onChange={handleColorChange}
                aria-label='red-orange color'
              />
              <RadioField
                className='teal'
                id='teal'
                name='color'
                value='teal'
                isSelected={settingsCopy.color === 'teal'}
                onChange={handleColorChange}
                aria-label='teal color'
              />
              <RadioField
                className='violet'
                id='violet'
                name='color'
                value='violet'
                isSelected={settingsCopy.color === 'violet'}
                onChange={handleColorChange}
                aria-label='violet color'
              />
            </div>
          </section>
          <Button
            className='apply-btn'
            type='submit'
            onClick={handleSaveSettings}
          >
            Apply
          </Button>
        </form>
      </StyledDialog>
    </>
  );
};

export default RulesDialog;
