import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyles from './global-styles';
import Theme from './theme';
import Header from './components/header';
import PomodoroActions from './components/pomodoro-actions/pomodoro-actions';
import Timer from './components/timer/timer';
import SettingsDialog from './components/settings/settings-dialog';
import Button from './components/button';
import { TABLET_BP } from './constants/breakpoints';
import { SettingsContext } from './providers/settings-provider';

const StyledMain = styled.main`
  margin: 0 auto;
  max-width: 25.625rem;
  padding: 0 1.5rem;
  width: 100%;

  @media screen and (min-width: ${TABLET_BP}em) {
    padding: 0;
  }
`;

const StyledSettingsRow = styled.div`
  margin-top: 4.9375rem;

  .open-settings-btn svg > path {
    transition: opacity 0.3s ease-out;
  }

  .open-settings-btn:hover svg > path {
    opacity: 0.85;
  }
`;

interface ActionsType {
  pomodoro: boolean;
  shortBreak: boolean;
  longBreak: boolean;
}

const App = () => {
  const { settings } = useContext(SettingsContext);
  const [theme, setTheme] = useState(Theme);
  const [timerInterval, setTimerInterval] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(settings.pomodoro * 60);
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
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);

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

  // update ui with new settings
  useEffect(() => {
    setIsFinished(false);

    if (actions.pomodoro) {
      setTotalSeconds(settings.pomodoro * 60);
      setSecondsLeft(settings.pomodoro * 60);
    } else if (actions.shortBreak) {
      setTotalSeconds(settings.shortBreak * 60);
      setSecondsLeft(settings.shortBreak * 60);
    } else {
      setTotalSeconds(settings.longBreak * 60);
      setSecondsLeft(settings.longBreak * 60);
    }

    if (isTiming) {
      clearInterval(timerInterval);
      setTimerInterval(null);
      setLastProgressUpdate(0);
      setIsTiming(false);
      setStartTime(null);
    }

    // update theme
    Theme.fontFamily =
      settings.font === 'serif'
        ? 'var(--font-family-serif)'
        : settings.font === 'mono'
        ? 'var(--font-family-mono)'
        : 'var(--font-family-sans)';
    Theme.primaryColor =
      settings.color === 'teal'
        ? 'var(--teal)'
        : settings.color === 'violet'
        ? 'var(--violet)'
        : 'var(--red-orange)';
    setTheme({ ...Theme });
  }, [settings]);

  const handleActionChange = (event: any) => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setIsFinished(false);
    setIsTiming(false);

    const updatedActions: ActionsType = { ...actions };
    Object.keys(updatedActions).forEach(
      (key) =>
        (updatedActions[key as keyof ActionsType] =
          event.target.id === key ? true : false)
    );
    setActions({ ...updatedActions });

    if (event.target.id === 'shortBreak') {
      setTotalSeconds(settings.shortBreak * 60);
      setSecondsLeft(settings.shortBreak * 60);
      setLastProgressUpdate(settings.shortBreak * 60);
    } else if (event.target.id === 'longBreak') {
      setTotalSeconds(settings.longBreak * 60);
      setSecondsLeft(settings.longBreak * 60);
      setLastProgressUpdate(settings.longBreak * 60);
    } else {
      setTotalSeconds(settings.pomodoro * 60);
      setSecondsLeft(settings.pomodoro * 60);
      setLastProgressUpdate(settings.pomodoro * 60);
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

  const handleOpenSettings = () => {
    setAreSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setAreSettingsOpen(false);
  };

  const updateTime = () => {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    setSecondsLeft(totalSeconds - diff);
  };

  return (
    <>
      <GlobalStyles />
      <Header />
      <ThemeProvider theme={Theme}>
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
          <StyledSettingsRow className='settings-btn-row flex-row justify-center'>
            <Button
              title='settings'
              onClick={handleOpenSettings}
              aria-label='Open settings dialog'
              className='open-settings-btn'
            >
              <svg
                aria-hidden={true}
                xmlns='http://www.w3.org/2000/svg'
                width='28'
                height='28'
              >
                <path
                  fill='#D7E0FF'
                  d='M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z'
                  opacity='.5'
                />
              </svg>
            </Button>
          </StyledSettingsRow>
          {areSettingsOpen && <SettingsDialog onClose={handleCloseSettings} />}
        </StyledMain>
      </ThemeProvider>
    </>
  );
};

export default App;
