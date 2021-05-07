import * as React from 'react';

import GlobalStyles from './global-styles';

const LogoSvg = require('../public/assets/logo.svg');

const App = () => {
  return (
    <>
      <GlobalStyles />
      <header>
        <img src={LogoSvg} alt='' />
        <h1 className='sr-only'>Pomodoro</h1>
      </header>
      <main>
        <div className='action-container'>
          <div className='action-btn'>
            <input
              id='pomodoro'
              type='radio'
              name='action'
              value='pomodoro'
              defaultChecked
            />
            <label htmlFor='pomodoro'>pomodoro</label>
          </div>
          <div className='action-btn'>
            <input
              id='short-break'
              type='radio'
              name='action'
              value='short break'
            />
            <label htmlFor='short-break'>short break</label>
          </div>
          <div className='action-btn'>
            <input
              id='long-break'
              type='radio'
              name='action'
              value='long break'
            />
            <label htmlFor='long-break'>long break</label>
          </div>
        </div>
        <div className='timer-container'>
          <h2>start</h2>
          {/* pause
  restart */}
        </div>
        <div className='settings-btn-row'>
          <button type='button'>Settings</button>
        </div>
        <div role='dialog' className='settings-dialog'>
          <header className='flex-row'>
            <h2>Settings</h2>
            <button type='button'>close</button>
          </header>
          <form className='settings-form'>
            <section className='time-settings-section'>
              <h3>Time (minutes)</h3>
              <div className='select-container'>
                <label htmlFor='pomodoro-select'>pomodoro</label>
                <select name='pomodoro' id='pomodoro-select'>
                  25
                </select>
              </div>
              <div className='select-container'>
                <label htmlFor='short-break-select'>short break</label>
                <select name='short-break' id='short-break-select'>
                  5
                </select>
              </div>
              <div className='select-container'>
                <label htmlFor='long-break-select'>long break</label>
                <select name='long-break' id='long-break-select'>
                  15
                </select>
              </div>
            </section>
            <section className='font-settings-section flex-row'>
              <h3>Font</h3>
              <div className='font-settings-radio-container'>
                <div className='font-choice'>
                  <input
                    type='radio'
                    name='font'
                    id='sans'
                    value='sans'
                    defaultChecked
                  />
                  <label className='sans-font-label' htmlFor='sans'>
                    Aa
                  </label>
                </div>
                <div className='font-choice'>
                  <input type='radio' name='font' id='serif' value='serif' />
                  <label className='serif-font-label' htmlFor='serif'>
                    Aa
                  </label>
                </div>
                <div className='font-choice'>
                  <input type='radio' name='font' id='mono' value='mono' />
                  <label className='mono-font-label' htmlFor='mono'>
                    Aa
                  </label>
                </div>
              </div>
            </section>
            <section className='color-settings-container flex-row'>
              <h3>Color</h3>
              <div className='color-settings-radio-container'>
                <div className='color-choice'>
                  <input
                    type='radio'
                    name='color'
                    id='orange-red'
                    value='orange-red'
                    aria-label='orange-red'
                    defaultChecked
                  />
                </div>
                <div className='color-choice'>
                  <input
                    type='radio'
                    name='color'
                    id='teal'
                    value='teal'
                    aria-label='teal'
                  />
                </div>
                <div className='color-choice'>
                  <input
                    type='radio'
                    name='color'
                    id='violet'
                    value='violet'
                    aria-label='violet'
                  />
                </div>
              </div>
            </section>
            <button type='submit'>Apply</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default App;
