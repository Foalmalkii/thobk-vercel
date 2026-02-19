import { DigipLogo } from "@/components/ui/icons";

export function PublicFooter() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-slate-800 bg-black">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
				<div>
					<DigipLogo className="mb-3 h-10 w-auto brightness-0 invert" />
					<p className="text-base text-slate-300">
						منصة سعودية لإدارة أعمال الخياطة.
					</p>
					<div className="mt-4 flex items-center gap-6 text-sm">
						<a
							className="text-slate-400 transition hover:text-white"
							href="/privacy-policy"
						>
							سياسة الخصوصية
						</a>
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
				<p className="text-sm text-slate-400">
					© {currentYear} منصة ثوبك — جميع الحقوق محفوظة لمؤسسة المنظور الرقمي
					للاتصالات وتقنية المعلومات
				</p>
			</div>
		</footer>
	);
}
