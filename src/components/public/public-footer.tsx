import { DigipLogo } from "@/components/ui/icons";

export function PublicFooter() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-slate-800 bg-black">
			<div className="mx-auto w-full max-w-7xl px-6 py-12">
				<p className="mb-8 text-center text-sm text-slate-400">
					<a
						className="transition hover:text-white"
						href="https://digip.sa"
						rel="noopener noreferrer"
						target="_blank"
					>
						© {currentYear} منصة ثوبك — جميع الحقوق محفوظة لمؤسسة المنظور الرقمي
						للاتصالات وتقنية المعلومات
					</a>
				</p>
				<div>
					<DigipLogo className="mb-3 h-10 w-auto brightness-0 invert" />
					<p className="mb-2 w-full text-right text-base text-slate-300">
						السجل التجاري: 1010812332
					</p>
					<p className="text-base text-slate-300">
						منصة سعودية لإدارة أعمال الخياطة.
					</p>
					<div className="mt-4 flex items-center gap-6 text-sm">
						<a
							className="text-slate-400 transition hover:text-white"
							href="/terms-and-conditions"
						>
							الشروط والأحكام
						</a>
						<a
							className="text-slate-400 transition hover:text-white"
							href="/sla"
						>
							اتفاقية مستوى الخدمة
						</a>
						<a
							className="text-slate-400 transition hover:text-white"
							href="/how-to-use"
						>
							كيفية الاستخدام
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
