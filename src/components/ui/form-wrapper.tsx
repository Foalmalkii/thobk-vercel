import React, { type HTMLAttributes, type ReactNode } from "react";

type FormWrapperProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
};

export const FormWrapper = ({ children, ...props }: FormWrapperProps) => {
	return (
		<div className="grid gap-4" {...props}>
			{children}
		</div>
	);
};
