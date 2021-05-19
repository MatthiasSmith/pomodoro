import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { TABLET_BP } from '../../constants/breakpoints';

import ProgressRing from './progress-ring';

const StyledTimer = styled.div`
  background-color: var(--darker-blue);
  box-shadow: inset -1.25rem -1.25rem 1.5rem 0.5rem rgba(255, 255, 255, 0.08),
    -1.35rem -1.35rem 3.5rem -0.5rem rgba(255, 255, 255, 0.08),
    1.5rem 1.5rem 3.5rem -0.25rem rgba(0, 0, 0, 0.5);
  margin: 2.8125rem auto 0;
  height: 18.75rem;
  width: 18.75rem;
  padding: 1.00625rem;
  position: relative;

  .timer-circle-container {
    background-color: var(--darker-blue);
    padding: 0.6175rem;
  }

  .timer-progress-circle {
    background: var(--darker-blue);
  }

  .content-container {
    height: 100%;
  }

  .timer-label {
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

    font-size: 5rem;
    text-align: center;
  }

  .timer-btn {
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--light-blue);
    display: block;
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

    &:hover {
      color: ${(props) => props.theme.primaryColor};
    }
  }

  @media screen and (min-width: ${TABLET_BP}em) {
    box-shadow: inset -1.25rem -1.25rem 1.5rem 0.5rem rgba(255, 255, 255, 0.08),
      -2.55rem -2.55rem 4.75rem -2rem rgba(255, 255, 255, 0.08),
      2.55rem 2.55rem 4.75rem -0.5rem rgba(0, 0, 0, 0.5);
    width: 25.625rem;
    height: 25.625rem;
    margin: 6.8125rem auto 0;
    padding: 1.375rem;

    .timer-circle-container {
      padding: 0.84375rem;
    }

    .timer-label {
      font-size: 6.25rem;
      line-height: ${(props) =>
        props.theme.fontFamily === 'var(--font-family-serif)'
          ? '8.2425rem'
          : props.theme.fontFamily === 'var(--font-family-mono)'
          ? '9.25625rem'
          : '6.25rem'};
    }

    .timer-btn {
      font-size: 1rem;
    }
  }
`;

const StyledProgressRing = styled(ProgressRing)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);

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
  secondsLeft,
  progress,
  onStart,
  onPause,
  isTiming,
  isFinished,
}: {
  secondsLeft: number;
  progress: number;
  onStart: Function;
  onPause: Function;
  isTiming: boolean;
  isFinished: boolean;
}) => {
  const [radius, setRadius] = useState(137.51);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft - minutes * 60;

  useEffect(() => {
    const isSmScreen = document.documentElement.clientWidth < TABLET_BP * 16;
    setRadius(isSmScreen ? 137.51 : 180.5);
  }, []);

  const handleStart = () => {
    onStart();
  };

  const handlePause = () => {
    onPause();
  };

  return (
    <StyledTimer className='timer-container flex-col-centered circle'>
      <div className='timer-circle-container flex-col-centered fill-container circle'>
        <div className='timer-progress-circle flex-col fill-container circle'>
          <StyledProgressRing radius={radius} stroke={9} progress={progress} />
          <div className='content-container flex-col justify-center'>
            <h2 className='timer-label' role='timer' aria-live='polite'>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </h2>
            {isFinished ? (
              <button type='button' className='timer-btn' onClick={handleStart}>
                restart
              </button>
            ) : isTiming ? (
              <button type='button' className='timer-btn' onClick={handlePause}>
                pause
              </button>
            ) : (
              <button type='button' className='timer-btn' onClick={handleStart}>
                start
              </button>
            )}
          </div>
        </div>
      </div>
    </StyledTimer>
  );
};

export default Timer;
