import type { Metadata } from "next";

import "../globals.css";

import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { getDirection } from "@/lib/types";
import { DirectionLayout } from "@/components/layout/DirectionLayout";

const ibmPlex = IBM_Plex_Sans_Arabic({
	subsets: ["arabic"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "ثوبك | منصة الخياطة الذكية",
	description:
		"منصة SaaS لإدارة الورش والخياطين: القياسات، الطلبات، الدفع، والتسليم في مكان واحد.",
};

export default function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = useLocale();

	return (
		<html lang={locale} dir={getDirection(locale)}>
			<body className={`${ibmPlex.className} bg-white text-slate-900`}>
				<NextIntlClientProvider>
					<DirectionLayout>{children}</DirectionLayout>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
