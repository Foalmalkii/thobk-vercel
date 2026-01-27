"use client";
import type React from "react";
import { useAuth } from "@/hooks/auth";
import { BranchLoading } from "./branch-loading";
import { Loading } from "./loading";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const { user, isLoading, isInBranch } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/login",
	});

	if (isLoading) return <Loading />;

	if (user) return <div>{children}</div>;
};
