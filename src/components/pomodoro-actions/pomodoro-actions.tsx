import React from 'react';
import styled from 'styled-components';

import ActionChoice from './action-choice';
import { TABLET_BP } from '../../constants/breakpoints';

const StyledPomodoroAction = styled.div`
  background-color: var(--darker-blue);
  border-radius: 1.96875rem;
  height: 3.9375rem;
  margin-top: 0.625rem; //0.8125rem;
  padding: 0.5rem 0.375rem;
  width: 100%;

  @media screen and (min-width: ${TABLET_BP}em) {
    max-width: 373px;
    margin: 0.625rem auto 0;
  }
`;

const PomodoroActions = ({
  actions,
  onChange,
}: {
  actions: any;
  onChange: Function;
}) => {
  return (
    <StyledPomodoroAction className='flex-row space-between'>
      <ActionChoice
        id='pomodoro'
        name='action'
        value='pomodoro'
        isSelected={actions.pomodoro}
        onChange={onChange}
      />
      <ActionChoice
        id='shortBreak'
        name='action'
        value='short break'
        isSelected={actions.shortBreak}
        onChange={onChange}
      />
      <ActionChoice
        id='longBreak'
        name='action'
        value='long break'
        isSelected={actions.longBreak}
        onChange={onChange}
      />
    </StyledPomodoroAction>
  );
};

export default PomodoroActions;
