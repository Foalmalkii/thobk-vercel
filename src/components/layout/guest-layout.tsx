"use client";
import type React from "react";
import { useAuth } from "@/hooks/auth";

export const GuestLayout = ({ children }: { children: React.ReactNode }) => {
	useAuth({ middleware: "guest", redirectIfAuthenticated: "/dashboard" });
	return <>{children}</>;
};
