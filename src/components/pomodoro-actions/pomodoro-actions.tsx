import React, { useContext } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';

import ActionChoice from './action-choice';
import ActionsType from '../../types/actions';
import { TABLET_BP } from '../../constants/breakpoints';
import { SoundSettingsContext } from '../../providers/sound-settings-provider';

const clickSFX = require('../../../public/sounds/snap.mp3');
const transitionDuration = 300;

interface ActionProps {
  actions: ActionsType;
}

const StyledPomodoroAction = styled.div<ActionProps>`
  background-color: var(--darker-blue);
  border-radius: 1.96875rem;
  height: 3.9375rem;
  margin: 0.8125rem auto 0;
  padding: 0.5rem 0.375rem;
  width: 20.4375rem;
  position: relative;
  z-index: 1;

  .shifting-marker {
    border-radius: 1.65625rem;
    position: absolute;
    top: 0.5rem;
    left: 0.375rem;
    width: 6.5625rem;
    height: 3rem;
    background: ${(props) => props.theme.primaryColor};
    transform: ${(props) =>
      props.actions.pomodoro
        ? 'translateX(0rem)'
        : props.actions.shortBreak
        ? 'translateX(6.5rem)'
        : 'translateX(13rem)'};
    transition: transform ${transitionDuration}ms
      cubic-bezier(0.4, 0.12, 0.95, 0.66);
    z-index: 0;
  }

  @media screen and (min-width: ${TABLET_BP}em) {
    width: 23.3125rem;

    .shifting-marker {
      width: 7.5rem;
      transform: ${(props) =>
        props.actions.pomodoro
          ? 'translateX(0rem)'
          : props.actions.shortBreak
          ? 'translateX(7.5rem)'
          : 'translateX(15rem)'};
    }
  }
`;

const PomodoroActions = ({
  actions,
  onChange,
}: {
  actions: any;
  onChange: (event: any) => void;
}) => {
  const {
    soundSettings: { volume, soundEnabled },
  } = useContext(SoundSettingsContext);
  const [playClick] = useSound(clickSFX, {
    volume,
    soundEnabled,
  });

  const handleChange = (event: any) => {
    setTimeout(playClick, transitionDuration - 75);
    onChange(event);
  };

  return (
    <StyledPomodoroAction actions={actions} className='flex-row space-between'>
      <ActionChoice
        id='pomodoro'
        name='action'
        value='pomodoro'
        isSelected={actions.pomodoro}
        onChange={handleChange}
      />
      <ActionChoice
        id='shortBreak'
        name='action'
        value='short break'
        isSelected={actions.shortBreak}
        onChange={handleChange}
      />
      <ActionChoice
        id='longBreak'
        name='action'
        value='long break'
        isSelected={actions.longBreak}
        onChange={handleChange}
      />
      <div id='shifting-marker' className='shifting-marker'></div>
    </StyledPomodoroAction>
  );
};

export default PomodoroActions;
