import { Provider } from "jotai";
import React from "react";

export const JotaiLayout = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};
