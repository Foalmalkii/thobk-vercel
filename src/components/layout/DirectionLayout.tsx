"use client";
import { getDirection } from "@/lib/types";
import { DirectionProvider } from "@radix-ui/react-direction";
import { useLocale } from "next-intl";
import React from "react";

export const DirectionLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const locale = useLocale();
	const dir = getDirection(locale);
	return <DirectionProvider dir={dir}>{children}</DirectionProvider>;
};
