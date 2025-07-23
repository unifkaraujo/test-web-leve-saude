import React from 'react';

type ButtonLinkProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonLink({ children, className = '', ...props }: ButtonLinkProps) {
  return (
    <button
      className={`all-unset cursor-pointer text-[#646cff] text-sm underline hover:text-[#535bf2] focus:outline-auto focus:outline-4 focus:outline-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
