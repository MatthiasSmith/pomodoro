import React, { useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import useSound from 'use-sound';

import GlobalStyles from './global-styles';
import Theme from './theme';
import Header from './components/header';
import PomodoroActions from './components/pomodoro-actions/pomodoro-actions';
import Timer from './components/timer/timer';
import SettingsDialog from './components/settings/settings-dialog';
import ActionsType from './types/actions';
import { DESKTOP_BP, TABLET_BP } from './constants/breakpoints';
import { SettingsContext } from './providers/settings-provider';
import { SoundSettingsContext } from './providers/sound-settings-provider';
import { SettingsType } from './types/settings';
import SoundToggle from './components/sound-toggle';
import SettingsButton from './components/settings-button';

const finishSFX = require('../public/sounds/timer-finish.mp3');

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
  margin: 4.9375rem auto 3rem;

  @media screen and (min-width: ${TABLET_BP}em) {
    margin: 9rem auto 6.4375rem;
  }

  @media screen and (min-width: ${DESKTOP_BP}em) {
    margin: 3.9375rem auto 3.5rem;
  }
`;

const App = () => {
  const { settings } = useContext(SettingsContext);
  const {
    soundSettings: { volume, soundEnabled },
  } = useContext(SoundSettingsContext);
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
  const [areSettingsOpen, setAreSettingsOpen] = useState(null);
  const [playFinishedSound] = useSound(finishSFX, { volume, soundEnabled });
  const settingsBtnRef = useRef<HTMLButtonElement>(null);

  // start the countdown
  useEffect(() => {
    if (startTime === null) return;
    setLastProgressUpdate(startTime);
    setTimerInterval(setInterval(updateTime, 20));
  }, [startTime]);

  // update timer progress
  useEffect(() => {
    setTimerProgress((secondsLeft / getCurrentActionSeconds()) * 100);

    if (Math.floor((Date.now() - lastProgressUpdate) / 1000) >= 60) {
      setLastProgressUpdate(Date.now());
    }

    // timer finished
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      setTimerInterval(null);
      setIsFinished(true);
      setIsTiming(false);
      playFinishedSound();
    }
  }, [secondsLeft]);

  // update ui with new settings
  useEffect(() => {
    setIsFinished(false);

    const currentAction = getCurrentAction();
    const newSeconds =
      Number(settings[currentAction as keyof SettingsType]) * 60;

    // only reset time if current action timing has changed
    let hasTimingChanged = false;
    if (totalSeconds !== newSeconds) {
      setTotalSeconds(newSeconds);
      setSecondsLeft(newSeconds);
      hasTimingChanged = true;
    }

    if (isTiming && hasTimingChanged) {
      clearInterval(timerInterval);
      setTimerInterval(null);
      setLastProgressUpdate(0);
      setIsTiming(false);
      setStartTime(null);
    }

    // update theme
    theme.fontFamily =
      settings.font === 'serif'
        ? 'var(--font-family-serif)'
        : settings.font === 'mono'
        ? 'var(--font-family-mono)'
        : 'var(--font-family-sans)';
    theme.primaryColor =
      settings.color === 'teal'
        ? 'var(--teal)'
        : settings.color === 'violet'
        ? 'var(--violet)'
        : 'var(--red-orange)';
    setTheme({ ...theme });
  }, [settings]);

  // re-focus the settings btn when the dialog is closed
  useEffect(
    () => areSettingsOpen === false && settingsBtnRef.current.focus(),
    [areSettingsOpen]
  );

  const getCurrentAction = () => {
    return Object.keys(actions).filter(
      (key) => actions[key as keyof ActionsType]
    )[0];
  };

  const getCurrentActionSeconds = () => {
    const currentlyActive = getCurrentAction();
    return Number(settings[currentlyActive as keyof SettingsType]) * 60;
  };

  const handleActionChange = (event: any) => {
    if (
      (isTiming || secondsLeft < getCurrentActionSeconds()) &&
      !confirm(
        'By switching timers you will interrupt your countdown progress.\n\nWould you like to continue anyways?'
      )
    )
      return;
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
      <ThemeProvider theme={theme}>
        <StyledMain>
          <SoundToggle />
          <PomodoroActions actions={actions} onChange={handleActionChange} />
          <Timer
            actionType={
              actions.pomodoro
                ? 'pomodoro'
                : actions.shortBreak
                ? 'short break'
                : 'long break'
            }
            secondsLeft={secondsLeft}
            progress={timerProgress}
            lastProgressUpdate={lastProgressUpdate}
            onStart={handleStart}
            onPause={handlePause}
            isTiming={isTiming}
            isFinished={isFinished}
          />
          <StyledSettingsRow className='settings-btn-row flex-row justify-center'>
            <SettingsButton onClick={handleOpenSettings} ref={settingsBtnRef} />
          </StyledSettingsRow>
          {areSettingsOpen && (
            <SettingsDialog
              actions={actions}
              isTiming={isTiming}
              onClose={handleCloseSettings}
            />
          )}
        </StyledMain>
      </ThemeProvider>
    </>
  );
};

export default App;
