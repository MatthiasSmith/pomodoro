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

  return (
    <svg height={radius * 2} width={radius * 2} className={className}>
      <circle
        stroke='red'
        fill='transparent'
        strokeWidth={stroke}
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
