import type { Metadata } from "next";

import "../globals.css";

import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { DirectionLayout } from "@/components/layout/DirectionLayout";
import { PublicFooter } from "@/components/public/public-footer";
import { PublicNavbar } from "@/components/public/public-navbar";
import { getDirection } from "@/lib/types";

const ibmPlex = IBM_Plex_Sans_Arabic({
	subsets: ["arabic"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Thobk | ثوبك",
	description:
		"نظام إدارة محلات الخياطة الرجالية المتكامل في السعودية. الحل الأمثل لتتبع طلبات تفصيل الثياب، إدارة المقاسات، الفواتير، وشؤون العملاء بسهولة.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = useLocale();

	return (
		<html lang={locale} dir={getDirection(locale)}>
			<body className={`${ibmPlex.className} bg-white text-slate-900`}>
				<NextIntlClientProvider>
					<DirectionLayout>
						<div className="min-h-screen flex flex-col">
							<PublicNavbar landingHrefPrefix="/" />
							<main className="flex-1 flex items-center justify-center w-full px-4 pt-20 pb-8">
								{children}
							</main>
							<PublicFooter />
						</div>
					</DirectionLayout>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
