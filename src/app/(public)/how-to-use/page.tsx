import { PublicFooter } from "@/components/public/public-footer";
import { PublicNavbar } from "@/components/public/public-navbar";

export default function HowToUsePage() {
	return (
		<div className="min-h-screen bg-white flex flex-col">
			<PublicNavbar landingHrefPrefix="/landing" />

			<main className="pt-24 pb-12 px-6 flex-1">
				<div className="mx-auto w-full max-w-5xl space-y-6">
					<h1 className="text-4xl font-bold text-slate-900">كيفية الاستخدام</h1>
					<p className="text-lg text-slate-600">
						شاهد الفيديو التالي للتعرف على طريقة استخدام المنصة.
					</p>

					<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
						<div className="aspect-video w-full overflow-hidden rounded-xl">
							<iframe
								className="h-full w-full"
								src="https://www.youtube-nocookie.com/embed/m2ZauYMrIYY"
								title="كيفية استخدام المنصة"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
							/>
						</div>
					</div>
				</div>
			</main>
			<PublicFooter />
		</div>
	);
}
