import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-lg border border-transparent px-5 py-2.5 text-base text-white font-medium font-sans bg-[#1a1a1a] cursor-pointer transition-colors duration-250 hover:border-[#646cff] focus:outline-auto focus:outline-4 focus:outline-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
