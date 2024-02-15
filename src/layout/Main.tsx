"use client";

import { Sidebar } from ".";

type Props = {
  children?: React.ReactNode;
};

export const Main: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
};
