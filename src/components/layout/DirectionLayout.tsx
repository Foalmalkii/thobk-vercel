"use client";
import { DirectionProvider } from "@radix-ui/react-direction";
import { useLocale } from "next-intl";
import type React from "react";
import { getDirection } from "@/lib/types";

export const DirectionLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const locale = useLocale();
	const dir = getDirection(locale);
	return <DirectionProvider dir={dir}>{children}</DirectionProvider>;
};
