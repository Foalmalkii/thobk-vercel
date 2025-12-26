"use client";
import { useAuth } from "@/hooks/auth";
import React from "react";
import { Loading } from "./loading";
import { BranchLoading } from "./branch-loading";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, isInBranch } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/login",
  });

  if (isLoading) return <Loading />;

  if (user) return <div>{children}</div>;
};
