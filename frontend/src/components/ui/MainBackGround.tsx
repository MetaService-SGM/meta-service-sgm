import React, { ReactNode } from "react";

type MainBackgroundProps = {
  children: ReactNode;
  className?: string;
};

export default function MainBackground({ children, className = "" }: MainBackgroundProps) {
  return (
    <div
      className={`shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-xl mt-4 ml-4 mr-4 w-full min-h-screen bg-white mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
