"use client";
import { useAuth } from "@/hooks/auth";
import React from "react";
import { Loading } from "./loading";
import { BranchLoading } from "./branch-loading";

export const BranchLayout = ({ children }: { children: React.ReactNode }) => {
  const { isInBranch, user, isLoading } = useAuth({ middleware: "auth" });
  if (!user || isLoading) return <Loading />;
  if (isInBranch === null) {
    console.log(isInBranch);
    return <BranchLoading />;
  } else return <>{children}</>;
};
