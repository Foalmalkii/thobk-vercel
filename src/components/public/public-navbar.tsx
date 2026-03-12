import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DigipLogo } from "@/components/ui/icons";

type PublicNavbarProps = {
	landingHrefPrefix?: string;
};

export function PublicNavbar({ landingHrefPrefix = "" }: PublicNavbarProps) {
	const navHeightClass = "h-16";

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl ${navHeightClass}`}
		>
			<div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6">
				<div className="flex items-center gap-4">
					<Link href="/">
						<DigipLogo className="h-10 w-auto" />
					</Link>
				</div>
				<nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
					<a
						className="transition hover:text-slate-900"
						href={`${landingHrefPrefix}#features`}
					>
						الميزات
					</a>
					<a
						className="transition hover:text-slate-900"
						href={`${landingHrefPrefix}#pricing`}
					>
						الأسعار
					</a>
					<a
						className="transition hover:text-slate-900"
						href={`${landingHrefPrefix}#customers`}
					>
						عملاؤنا
					</a>
					<a
						className="transition hover:text-slate-900"
						href={`${landingHrefPrefix}#contact`}
					>
						تواصل معنا
					</a>
				</nav>
				<div className="flex items-center gap-3">
					<Button
						asChild
						className="bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
					>
						<Link href="/login">الدخول للمنصة</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
