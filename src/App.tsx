import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import GlobalStyles from './global-styles';
import Header from './components/header';
import PomodoroActions from './components/pomodoro-actions/pomodoro-actions';
import Timer from './components/timer/timer';
import { TABLET_BP } from './constants/breakpoints';

const StyledMain = styled.main`
  margin: 0 auto;
  max-width: 25.625rem;
  padding: 0 1.5rem;
  width: 100%;

  @media screen and (min-width: ${TABLET_BP}em) {
    padding: 0;
  }
`;

interface ActionsType {
  pomodoro: boolean;
  shortBreak: boolean;
  longBreak: boolean;
}

const App = () => {
  const [timerInterval, setTimerInterval] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [startTime, setStartTime] = useState(null);
  const [lastProgressUpdate, setLastProgressUpdate] = useState(0);
  const [timerProgress, setTimerProgress] = useState(100);
  const [isTiming, setIsTiming] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [actions, setActions] = useState<ActionsType>({
    pomodoro: true,
    shortBreak: false,
    longBreak: false,
  });

  useEffect(() => {
    if (startTime === null) return;
    setLastProgressUpdate(startTime);
    setTimerInterval(setInterval(updateTime, 10));
  }, [startTime]);

  useEffect(() => {
    if (Math.floor((Date.now() - lastProgressUpdate) / 1000) >= 60) {
      setLastProgressUpdate(Date.now());
      setTimerProgress((secondsLeft / totalSeconds) * 100);
    }
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      setTimerInterval(null);
      setIsFinished(true);
    }
  }, [secondsLeft]);

  const handleActionChange = (event: any) => {
    clearInterval(timerInterval);
    setTimerInterval(null);

    const updatedActions: ActionsType = { ...actions };
    Object.keys(updatedActions).forEach(
      (key) =>
        (updatedActions[key as keyof ActionsType] =
          event.target.id === key ? true : false)
    );
    setActions({ ...updatedActions });

    if (event.target.id === 'shortBreak') {
      setTotalSeconds(5 * 60);
      setSecondsLeft(5 * 60);
      setLastProgressUpdate(5 * 60);
    } else if (event.target.id === 'longBreak') {
      setTotalSeconds(15 * 60);
      setSecondsLeft(15 * 60);
      setLastProgressUpdate(15 * 60);
    } else {
      setTotalSeconds(25 * 60);
      setSecondsLeft(25 * 60);
      setLastProgressUpdate(25 * 60);
    }
  };

  const handleStart = () => {
    if (timerInterval) return;
    setStartTime(Date.now());
    setIsTiming(true);
    setIsFinished(false);
  };

  const handlePause = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setIsTiming(false);
    setTotalSeconds(secondsLeft);
  };

  const updateTime = () => {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    setSecondsLeft(totalSeconds - diff);
  };

  return (
    <>
      <GlobalStyles />
      <Header />
      <StyledMain>
        <PomodoroActions actions={actions} onChange={handleActionChange} />
        <Timer
          secondsLeft={secondsLeft}
          progress={timerProgress}
          onStart={handleStart}
          onPause={handlePause}
          isTiming={isTiming}
          isFinished={isFinished}
        />
        {/* <div className='settings-btn-row'>
          <button type='button'>Settings</button>
        </div> */}
        {/* <div role='dialog' className='settings-dialog'>
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
        </div> */}
      </StyledMain>
    </>
  );
};

export default App;
