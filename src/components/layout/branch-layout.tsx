"use client";
import type React from "react";
import { useAuth } from "@/hooks/auth";
import { BranchLoading } from "./branch-loading";
import { Loading } from "./loading";

export const BranchLayout = ({ children }: { children: React.ReactNode }) => {
	const { isInBranch, user, isLoading } = useAuth({ middleware: "auth" });
	if (!user || isLoading) return <Loading />;
	if (isInBranch === null) {
		console.log(isInBranch);
		return <BranchLoading />;
	} else return <>{children}</>;
};
