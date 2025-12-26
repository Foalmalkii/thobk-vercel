import React from "react";

export const InputsGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-4 gap-4 w-full">{children}</div>;
};
