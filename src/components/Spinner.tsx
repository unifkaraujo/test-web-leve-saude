import React from 'react';
import clsx from 'clsx';

interface SpinnerProps {
  size?: number;
  colorClass?: string;
}

export function Spinner({ size = 20, colorClass = 'text-white' }: SpinnerProps) {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-2 border-t-transparent',
        colorClass
      )}
      style={{
        width: size,
        height: size,
        borderColor: 'currentColor',
        borderTopColor: 'transparent',
      }}
    />
  );
}
