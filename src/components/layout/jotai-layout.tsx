import { Provider } from "jotai";
import type React from "react";

export const JotaiLayout = ({ children }: { children: React.ReactNode }) => {
	return <Provider>{children}</Provider>;
};
