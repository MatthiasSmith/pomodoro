import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { TABLET_BP, DESKTOP_BP } from '../../constants/breakpoints';
import Button from '../button';
import ProgressRing from './progress-ring';

const pseudoElementMixin = css`
  border-radius: 50%;
  box-shadow: 0rem 0rem 2.7rem 0.35rem #363b6f;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: scale(1);
  z-index: -1;
`;

const StyledTimerButton = styled(Button)`
  border-radius: 50%;
  background: var(--timer-gradient); //var(--darker-blue);
  box-shadow: var(--timer-shadow);
  margin: 2.8125rem auto 0;
  height: 18.75rem;
  width: 18.75rem;
  padding: 1.00625rem;
  position: relative;

  &.active {
    animation: shrink 0.2s ease-in-out 0s 2 alternate;
  }

  &.active::before {
    ${pseudoElementMixin}
    animation: ripple 1.5s cubic-bezier(.11,.45,.72,1) 0.3s forwards;
  }

  &.active::after {
    ${pseudoElementMixin}
    animation: ripple 2s cubic-bezier(.11,.45,.72,1) 0.3s forwards;
  }

  &:hover {
    .timer__action-label {
      color: ${(props) => props.theme.primaryColor};
    }
  }

  &:focus {
    outline: none;
  }

  &:focus-visible .timer__action-label {
    color: ${(props) => props.theme.primaryColor};
    outline: none;
    border-radius: 0.125rem;
    box-shadow: 0rem 0rem 0rem 0.185rem var(--darker-blue),
      0rem 0rem 0rem 0.285rem rgba(255, 255, 255, 0.38);
  }

  @media screen and (prefers-reduced-motion: reduce) {
    &.active::before,
    &.active::after {
      display: none;
    }
  }

  @keyframes shrink {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.96);
    }
  }

  .timer__circle-container {
    background-color: var(--darker-blue);
    height: 16.7375rem;
    width: 16.7375rem;
    padding: 0.6175rem;
  }

  .timer__progress-circle {
    height: 15.503125rem;
    width: 15.503125rem;
    background: var(--darker-blue);
  }

  .timer__content-container {
    height: 100%;
    position: relative;
    z-index: 1;
  }

  .timer__time-label {
    color: var(--light-blue);
    font-size: 5rem;
    text-align: center;

    ${(props) =>
      props.theme.fontFamily === 'var(--font-family-serif)'
        ? css`
            font-family: var(--font-family-serif);
            font-weight: var(--font-weight-bold);
            line-height: 6.59375rem;
            margin-top: 0.75rem;
          `
        : props.theme.fontFamily === 'var(--font-family-mono)'
        ? css`
            font-family: var(--font-family-mono);
            font-weight: var(--font-weight-normal);
            letter-spacing: -0.625rem;
            line-height: 7.40625rem;
            margin-top: 0.75rem;
            margin-right: 0.5rem;
          `
        : css`
            font-family: var(--font-family-sans);
            font-weight: var(--font-weight-bold);
            letter-spacing: -0.25rem;
            line-height: 5rem;
            margin-top: 2rem;
            margin-right: 0.25rem;
          `}
  }

  .timer__action-label {
    color: var(--light-blue);
    font-size: 0.875rem;
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.820625rem;
    margin: 0 auto;
    padding-left: 0.820625rem;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    transition: color 0.3s ease-out;
    z-index: 1;

    ${(props) =>
      props.theme.fontFamily === 'var(--font-family-serif)'
        ? css`
            font-family: var(--font-family-serif);
            line-height: 1.15625rem;
            margin-top: 0.5rem;
          `
        : props.theme.fontFamily === 'var(--font-family-mono)'
        ? css`
            font-family: var(--font-family-mono);
            line-height: 1.295625rem;
          `
        : css`
            font-family: var(--font-family-sans);
            line-height: 0.875rem;
            margin-top: 0.75rem;
          `}
  }

  @media screen and (min-width: ${TABLET_BP}em) {
    width: 25.625rem;
    height: 25.625rem;
    margin: 6.8125rem auto 0;
    padding: 1.375rem;

    .timer__circle-container {
      height: 22.875rem;
      width: 22.875rem;
      padding: 0.84375rem;
    }

    .timer__progress-circle {
      height: 21.1875rem;
      width: 21.1875rem;
      padding: 0.84375rem;
    }

    .timer__time-label {
      font-size: 6.25rem;
      line-height: ${(props) =>
        props.theme.fontFamily === 'var(--font-family-serif)'
          ? '8.2425rem'
          : props.theme.fontFamily === 'var(--font-family-mono)'
          ? '9.25625rem'
          : '6.25rem'};
    }

    .timer__action-label {
      font-size: 1rem;
    }
  }

  @media screen and (min-width: ${DESKTOP_BP}em) {
    margin: 2.8125rem auto 0;
  }
`;

const StyledProgressRing = styled(ProgressRing)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  z-index: 0;

  circle {
    stroke: ${(props) => props.theme.primaryColor};
    stroke-width: 0.5625rem;
    transition: stroke-dashoffset 0.35s ease-out;
  }

  @media screen and (min-width: ${TABLET_BP}em) {
    circle {
      stroke-width: 0.6875rem;
    }
  }
`;

const Timer = ({
  actionType,
  secondsLeft,
  progress,
  lastProgressUpdate,
  onStart,
  onPause,
  isTiming,
  isFinished,
}: {
  actionType: string;
  secondsLeft: number;
  progress: number;
  lastProgressUpdate: number;
  onStart: Function;
  onPause: Function;
  isTiming: boolean;
  isFinished: boolean;
}) => {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft - minutes * 60;
  const [ariaMinutesLeft, setAriaMinutesLeft] = useState(minutes);
  const [ariaSecondsLeft, setAriaSecondsLeft] = useState(seconds);
  const [radius, setRadius] = useState(137.51);

  useEffect(() => {
    const isSmScreen = document.documentElement.clientWidth < TABLET_BP * 16;
    setRadius(isSmScreen ? 137.51 : 180.5);
  }, []);

  // update the aria timer so it will announce the change
  useEffect(() => {
    const mins = Math.floor(secondsLeft / 60);
    setAriaMinutesLeft(mins);
    setAriaSecondsLeft(secondsLeft - mins * 60);
  }, [lastProgressUpdate, actionType]);

  const handleClick = () => {
    if (!isTiming || isFinished) {
      onStart();
    } else {
      const mins = Math.floor(secondsLeft / 60);
      setAriaMinutesLeft(mins);
      setAriaSecondsLeft(secondsLeft - mins * 60);
      onPause();
    }
  };

  return (
    <StyledTimerButton
      onClick={handleClick}
      className={`timer flex-col-centered ${isTiming ? 'active' : ''}`}
      aria-label={`${
        isFinished ? 'restart' : isTiming ? 'pause' : 'start'
      } the timer`}
    >
      <div className='timer__circle-container flex-col-centered circle'>
        <div className='timer__progress-circle flex-col-centered circle'>
          <StyledProgressRing radius={radius} stroke={9} progress={progress} />
          <div className='timer__content-container flex-col justify-center'>
            {isFinished ? (
              <span className='sr-only' role='alert' aria-live='assertive'>
                Your {actionType} timer has finished. Would you like to restart
                it?
              </span>
            ) : isTiming ? (
              <span className='sr-only' role='alert' aria-live='assertive'>
                {actionType} timer started. Counting down from{' '}
                {ariaMinutesLeft > 0 && ariaMinutesLeft + ' minutes'}
                {ariaSecondsLeft > 0 && ' ' + ariaSecondsLeft + ' seconds'}
              </span>
            ) : (
              <span
                className='sr-only'
                role='alert'
                aria-live='assertive'
                aria-atomic={true}
              >
                {actionType} timer paused at
                {ariaMinutesLeft > 0 && ariaMinutesLeft + ' minutes '}
                {ariaSecondsLeft > 0 && ariaSecondsLeft + ' seconds'}
              </span>
            )}
            <h2
              className='sr-only'
              role='timer'
              aria-atomic='true'
              aria-live='assertive'
            >
              {ariaMinutesLeft > 0 && ariaMinutesLeft + ' minutes '}
              {ariaSecondsLeft > 0 && ariaSecondsLeft + ' seconds'} remain
            </h2>
            <h2 className='timer__time-label' aria-hidden={true}>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </h2>
            <h3 className='timer__action-label'>
              {isFinished ? 'restart' : isTiming ? 'pause' : 'start'}
            </h3>
          </div>
        </div>
      </div>
    </StyledTimerButton>
  );
};

export default Timer;
