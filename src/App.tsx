import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import GlobalStyles from './global-styles';
import Header from './components/header';
import PomodoroActions from './components/pomodoro-actions/pomodoro-actions';
import Timer from './components/timer/timer';
import SettingsDialog from './components/settings/settings-dialog';
import Button from './components/button';
import { TABLET_BP } from './constants/breakpoints';
import { SettingsContext } from './providers/settings-provider';

const SettingsIcon = require('../public/assets/icon-settings.svg');

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
`;

interface ActionsType {
  pomodoro: boolean;
  shortBreak: boolean;
  longBreak: boolean;
}

const App = () => {
  const { settings } = useContext(SettingsContext);
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
  const [areSettingsOpen, setAreSettingsOpen] = useState(true);

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
  }, [settings]);

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
          <Button title='settings' onClick={handleOpenSettings}>
            <img src={SettingsIcon} alt='Open the settings dialog' />
          </Button>
        </StyledSettingsRow>
        {areSettingsOpen && <SettingsDialog onClose={handleCloseSettings} />}
      </StyledMain>
    </>
  );
};

export default App;
