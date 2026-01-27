import React, { type HTMLAttributes, type ReactNode } from "react";

type InputWrapperProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
};

export const InputWrapper = ({ children, ...props }: InputWrapperProps) => {
	return (
		<div className="grid gap-2" {...props}>
			{children}
		</div>
	);
};
