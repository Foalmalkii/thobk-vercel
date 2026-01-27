import React from "react";
import { Spinner } from "../ui/spinner";

export const Loading = () => {
	return (
		<div className="w-full h-full ">
			<Spinner className="absolute top-1/2 right-1/2 translate-x-1/2 h-8 w-8" />
		</div>
	);
};
