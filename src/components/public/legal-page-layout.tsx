import type { ReactNode } from "react";
import { PublicFooter } from "@/components/public/public-footer";
import { PublicNavbar } from "@/components/public/public-navbar";

type LegalPageLayoutProps = {
	title: string;
	updatedAt: string;
	children: ReactNode;
};

export function LegalPageLayout({
	title,
	updatedAt,
	children,
}: LegalPageLayoutProps) {
	return (
		<div className="min-h-screen bg-white flex flex-col">
			<PublicNavbar landingHrefPrefix="/landing" />

			<main className="flex-1 px-6 pt-24 pb-12">
				<div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
					<header className="mb-8 border-b border-slate-200 pb-5">
						<h1 className="text-3xl md:text-4xl font-bold text-slate-900">
							{title}
						</h1>
						<p className="mt-2 text-sm text-slate-500">
							آخر تحديث: {updatedAt}
						</p>
					</header>

					<div className="space-y-8 text-slate-700 leading-8">{children}</div>
				</div>
			</main>

			<PublicFooter />
		</div>
	);
}
