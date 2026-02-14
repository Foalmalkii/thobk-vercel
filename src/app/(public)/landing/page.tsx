import { Button } from "@/components/ui/button";
import { DigipLogo } from "@/components/ui/icons";
import {
	BadgeCheck,
	ClipboardCheck,
	CreditCard,
	LayoutTemplate,
	MessageCircle,
	Package,
} from "lucide-react";

const features = [
	{
		icon: BadgeCheck,
		title: "قياسات موثوقة",
		description:
			"ملف قياسات موحد لكل عميل مع تاريخ تعديلات واضح وتقليل أخطاء التفصيل.",
	},
	{
		icon: ClipboardCheck,
		title: "إدارة الطلبات",
		description:
			"سير عمل واضح من الاستلام حتى التسليم مع حالات متابعة دقيقة.",
	},
	{
		icon: CreditCard,
		title: "فواتير ودفع",
		description:
			"فواتير جاهزة، إشعارات دفع، وتقارير مالية مفهومة بلحظة.",
	},
	{
		icon: LayoutTemplate,
		title: "قوالب تصميم",
		description:
			"قوالب جاهزة للقصّات والياقات والأساور لتسريع الطلبات.",
	},
	{
		icon: Package,
		title: "مخزون منظم",
		description:
			"تتبّع الأقمشة والألوان مع تنبيهات عند انخفاض المخزون.",
	},
	{
		icon: MessageCircle,
		title: "تواصل احترافي",
		description:
			"رسائل واتساب مدمجة وتحديثات حالة الطلب للعملاء.",
	},
];

const plans = [
	{
		title: "الباقة الأساسية",
		description: "الانطلاقة الذكية للمحلات الصغيرة.",
		monthlyPrice: "99 ر.س",
		annualPrice: "999 ر.س",
		features: [
			"فرع واحد",
			"حتى 5 موظفين",
			"حتى 300 طلب شهريًا",
		],
		accent: false,
	},
	{
		title: "الباقة المميزة",
		description: "أفضل خيار للمحلات النشطة.",
		monthlyPrice: "249 ر.س",
		annualPrice: "2,490 ر.س",
		features: [
			"حتى 5 فروع",
			"حتى 20 موظفًا",
			"طلبات غير محدودة",
		],
		accent: true,
	},
];

const addons = [
	{
		title: "رصيد رسائل SMS",
		description: "اشحن الرصيد حسب احتياجك لإشعارات العملاء.",
		price: "حسب الاستخدام",
	},
	{
		title: "نطاق مخصص لمحلك",
		description: "احصل على نطاق باسم محلك وربط سريع بالمنصة.",
		price: "ابتداءً من 150 ر.س / سنويًا",
	},
];

const customers = [
	"سارتوريز",
];

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-white">
			<header className="border-b border-slate-200">
				<div className="mx-auto flex w-full max-w-8xl items-center justify-between px-6 py-6">
					<div className="flex items-center gap-4">
						<DigipLogo className="h-10 w-auto" />
					</div>
					<nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
						<a className="transition hover:text-slate-900" href="#features">
							الميزات
						</a>
						<a className="transition hover:text-slate-900" href="#pricing">
							الأسعار
						</a>
						<a className="transition hover:text-slate-900" href="#customers">
							عملاؤنا
						</a>
						<a className="transition hover:text-slate-900" href="#contact">
							تواصل معنا
						</a>
					</nav>
					<div className="flex items-center gap-3">
						<Button className="border border-slate-900 bg-white text-slate-900 hover:bg-slate-100" variant="secondary">
							تسجيل الدخول
						</Button>
						<Button className="bg-slate-900 text-white hover:bg-slate-800">
							ابدأ الآن
						</Button>
					</div>
				</div>
			</header>

			<main>
				<section className="mx-auto flex w-full max-w-8xl flex-col gap-10 px-6 pb-16 pt-14 lg:flex-row lg:items-center">
					<div className="flex-1">
						<h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
							نظام خياطة ذكي
							<br />
							يرتب عملك ويكبر طلباتك
						</h1>
						<p className="mt-5 text-lg text-slate-600">
							ثوبك يجمع القياسات والطلبات والفوترة في منصة واحدة. أسرع، أوضح،
							وأقرب لعملائك.
						</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<Button className="bg-slate-900 text-white hover:bg-slate-800" size="lg">
								تواصل معنا
							</Button>
						</div>
					</div>
					<div className="flex-1">
						<div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
							<div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
								<span className="h-2.5 w-2.5 rounded-full border border-slate-400 bg-red-500" />
								<span className="h-2.5 w-2.5 rounded-full border border-slate-400 bg-yellow-400" />
								<span className="h-2.5 w-2.5 rounded-full border border-slate-400 bg-green-600" />
							</div>
							<div className="bg-slate-50 rounded-b-2xl">
								<div className="overflow-hidden rounded-b-2xl bg-white">
									<img
										alt="لقطة شاشة من لوحة ثوبك"
										className="h-auto w-full"
										src="/images/landing-dashboard.png"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="mx-auto w-full max-w-8xl px-6 py-16">
					<div className="flex items-center justify-center">
						<div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2">
							<span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold">
								<img src="/images/zatca.png" />
							</span>
							<span className="text-slate-600 font-bold text-sm">متوافق مع المرحلة الأولى من هيئة الزكاة والضريبة والجمارك</span>
						</div>
					</div>
				</section>

				<section id="features" className="mx-auto w-full max-w-8xl px-6 py-16">
					<div className="flex flex-col gap-4">
						<h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
							كل الأدوات التي تحتاجها لإدارة ورشتك
						</h2>
						<p className="text-base text-slate-600">
							بسيطة، واضحة، ومصممة خصيصًا للخياطين والمحلات.
						</p>
					</div>
					<div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{features.map((item) => (
							<div
								key={item.title}
								className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
							>
								<div className="flex items-center gap-3">
									<span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-900">
										<item.icon className="h-5 w-5 text-slate-900" />
									</span>
									<h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
								</div>
								<p className="mt-3 text-sm text-slate-600">{item.description}</p>
							</div>
						))}
					</div>
				</section>

				<section id="pricing" className="bg-slate-700 text-white mx-auto w-full max-w-8xl px-6 py-16">
					<div className="flex flex-col gap-4">
						<h2 className="text-3xl font-semibold md:text-4xl">
							خطة واضحة باشتراك مرن
						</h2>
						<p className="text-base text-slate-400">
							اختر الباقة المناسبة، وحدد نموذج الفوترة الشهري أو السنوي.
						</p>
					</div>
					<div className="mt-10 grid gap-6 lg:grid-cols-2">
						{plans.map((plan) => (
							<div
								key={plan.title}
								className={`rounded-[32px] border p-6 ${
									plan.accent
										? "border-slate-900 bg-white shadow-sm"
										: "border-slate-200 bg-slate-50"
								}`}
							>
								<div className="flex items-start justify-between gap-4">
									<div>
										<h3 className="text-lg font-semibold text-slate-900">
											{plan.title}
										</h3>
										<p className="mt-1 text-sm text-slate-600">
											{plan.description}
										</p>
									</div>
									{plan.accent ? (
										<span className="rounded-full border border-slate-900 bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
											الأكثر اختيارًا
										</span>
									) : null}
								</div>
								<div className="mt-6 grid gap-3 sm:grid-cols-2">
									<div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
										<p className="text-xs text-slate-500">شهريًا</p>
										<p className="mt-2 text-2xl font-semibold text-slate-900">
											{plan.monthlyPrice}
										</p>
									</div>
									<div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
										<p className="text-xs text-slate-500">سنويًا</p>
										<p className="mt-2 text-2xl font-semibold text-slate-900">
											{plan.annualPrice}
										</p>
										<p className="mt-1 text-xs text-slate-500">
											وفر شهرين مع الدفع السنوي
										</p>
									</div>
								</div>
								<ul className="mt-6 space-y-3 text-sm text-slate-700">
									{plan.features.map((feature) => (
										<li
											key={feature}
											className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-2"
										>
											<span>{feature}</span>
											<span className="text-slate-900">✓</span>
										</li>
									))}
								</ul>
								<Button
									className={`mt-6 w-full ${
										plan.accent
											? "bg-slate-900 text-white hover:bg-slate-800"
											: "border border-slate-900 bg-white text-slate-900 hover:bg-slate-100"
									}`}
									variant={plan.accent ? "default" : "outline"}
								>
									ابدأ الآن
								</Button>
							</div>
						))}
					</div>


					<div className="mt-10">
						<div className="flex flex-col gap-2">
							<p className="text-sm text-slate-400">إضافات اختيارية</p>
							<h3 className="text-xl font-semibold">
								خصّص تجربتك حسب احتياجك
							</h3>
						</div>
						<div className="mt-6 grid gap-4 md:grid-cols-2">
							{addons.map((addon) => (
								<div
									key={addon.title}
									className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
								>
									<div className="flex items-center justify-between gap-3">
										<p className="text-sm font-semibold text-slate-900">
											{addon.title}
										</p>
										<span className="text-xs text-slate-500">{addon.price}</span>
									</div>
									<p className="mt-2 text-sm text-slate-600">{addon.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section id="customers" className="mx-auto w-full max-w-8xl px-6 py-16">
					<div className="flex flex-col gap-4">
						<h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
							علامات تثق بثوبك يوميًا
						</h2>
					</div>
					<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{customers.map((customer) => (
							<div
								key={customer}
								className="flex h-20 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700"
							>
								{customer}
							</div>
						))}
					</div>
				</section>

				<section id="contact" className="mx-auto w-full max-w-8xl px-6 py-16">
					<div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
						<div>
							<h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
								جاهزون لمساعدتك في الإعداد
							</h2>
							<p className="mt-4 text-base text-slate-600">
								دعنا نعرف تفاصيل محلك وسنرتب لك عرضًا تجريبيًا مناسبًا.
							</p>
							<div className="mt-6 space-y-3 text-sm text-slate-700">
								<p>البريد الإلكتروني: contact@digip.sa</p>
								<p>الواتس آب: 966561709632+</p>
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer className="border-t border-slate-200">
				<div className="mx-auto flex w-full max-w-8xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
					<div>
					<DigipLogo className="h-10 w-auto" />
						<p className="mt-2 text-sm text-slate-500">
							منصة سعودية لإدارة أعمال الخياطة.
						</p>
					</div>
					<p className="text-xs text-slate-400">منصة ثوبك 2026 © جميع الحقوق محفوظة لمؤسسة المنظور الرقمي للاتصالات وتقنية المعلومات</p>
				</div>
			</footer>
		</div>
	);
}
