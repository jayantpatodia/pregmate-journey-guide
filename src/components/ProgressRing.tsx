
import React from 'react';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  text?: string;
  subText?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 200,
  strokeWidth = 12,
  text,
  subText,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (percentage * circumference) / 100;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#E8F4EA"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#AECFBA"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {text && <div className="text-2xl font-bold text-pregbuddy-dark">{text}</div>}
        {subText && <div className="text-sm text-muted-foreground">{subText}</div>}
      </div>
    </div>
  );
};

export default ProgressRing;
