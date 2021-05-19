import React from 'react';

const ProgressRing = ({
  radius,
  stroke,
  progress,
  className,
}: {
  radius: number;
  stroke: number;
  progress: number;
  className?: string;
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const ariaProgressText =
    progress === 100
      ? 'Timer progress will update once per minute after the countdown begins.'
      : progress === 0
      ? 'Timer finished.'
      : (100 - progress).toString();

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className={className}
      role='progressbar'
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={100 - progress}
      aria-valuetext={ariaProgressText}
    >
      <circle
        fill='transparent'
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        strokeLinecap='round'
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default ProgressRing;
