import {
	RulerDimensionLine,
	Check,
	ListTodo,
	CreditCard,
	Store,
	MessageCircle,
	Warehouse,
	X,
} from "lucide-react";
import Link from "next/link";
import { PublicFooter } from "@/components/public/public-footer";
import { PublicNavbar } from "@/components/public/public-navbar";
import { Button } from "@/components/ui/button";

const features = [
	{
		icon: RulerDimensionLine,
		title: "قياسات موثوقة",
		description:
			"ملف قياسات موحد لكل عميل مع تاريخ تعديلات واضح وتقليل أخطاء التفصيل.",
	},
	{
		icon: ListTodo,
		title: "إدارة الطلبات",
		description: "سير عمل واضح من الاستلام حتى التسليم مع حالات متابعة دقيقة.",
	},
	{
		icon: CreditCard,
		title: "فواتير ودفع",
		description: "فواتير جاهزة، إشعارات دفع، وتقارير مالية مفهومة بلحظة.",
	},
	{
		icon: Store,
		title: "إدارة الفروع والموظفين",
		description: "إمكانية إدارة عدة فروع وحسابات الموظفين",
	},
	{
		icon: Warehouse,
		title: "إدارة المخزون",
		description: "تتبّع ذكي للأقمشة.",
	},
	{
		icon: MessageCircle,
		title: "تواصل احترافي",
		description: "رسائل واتساب مدمجة وتحديثات حالة الطلب للعملاء.",
	},
];

const plans = [
	{
		title: "باقة البداية",
		description: "مناسبة للانطلاق الأساسية.",
		monthlyPrice: "49",
		annualPrice: "499",
		features: [
			{ label: "فرع واحد", included: true },
			{ label: "موظف واحد", included: true },
			{ label: "حد أقصى 100 طلب شهريًا", included: true },
			{ label: "إدارة المخزون", included: false },
			{ label: "التقارير", included: false },
			{ label: "رصيد SMS/واتساب ابتدائي", included: false },
			{ label: "دعم العملاء", included: false },
			{ label: "المصنع", included: false },
		],
		accent: false,
	},
	{
		title: "الباقة الصغيرة",
		description: "حل مناسب لنمو نشاطك.",
		monthlyPrice: "99",
		annualPrice: "999",
		features: [
			{ label: "فرع واحد", included: true },
			{ label: "3 موظفين", included: true },
			{ label: "حد أقصى 300 طلب شهريًا", included: true },
			{ label: "إدارة المخزون", included: true },
			{ label: "التقارير", included: true },
			{ label: "50 رصيد SMS/واتساب ابتدائي", included: true },
			{ label: "دعم العملاء عبر واتساب", included: true },
			{ label: "المصنع", included: false },
		],
		accent: true,
	},
	{
		title: "الباقة المتوسطة",
		description: "للفروع النشطة والمتوسعة.",
		monthlyPrice: "149",
		annualPrice: "1499",
		features: [
			{ label: "3 فروع", included: true },
			{ label: "10 موظفين", included: true },
			{ label: "حد أقصى 1000 طلب شهريًا", included: true },
			{ label: "إدارة المخزون", included: true },
			{ label: "التقارير", included: true },
			{ label: "100 رصيد SMS/واتساب ابتدائي", included: true },
			{ label: "مدير حساب", included: true },
			{ label: "المصنع", included: true },
		],
		accent: false,
	},
	{
		title: "الباقة الكبيرة",
		description: "للعمليات الكبيرة متعددة الفروع.",
		monthlyPrice: "199",
		annualPrice: "1999",
		features: [
			{ label: "10 فروع", included: true },
			{ label: "50 موظفًا", included: true },
			{ label: "طلبات شهرية غير محدودة", included: true },
			{ label: "إدارة المخزون", included: true },
			{ label: "التقارير", included: true },
			{ label: "300 رصيد SMS/واتساب ابتدائي", included: true },
			{ label: "مدير حساب", included: true },
			{ label: "المصنع", included: true },
		],
		accent: false,
	},
];

const addons = [
	{
		title: "رصيد رسائل SMS",
		description: "اشحن الرصيد حسب احتياجك لإشعارات العملاء.",
		price: "حسب الاستخدام",
	},
	{
		title: "رصيد رسائل WhatsApp",
		description: "اشحن الرصيد حسب احتياجك لإشعارات العملاء.",
		price: "حسب الاستخدام",
	},
	{
		title: "نطاق مخصص لمحلك",
		description: "احصل على نطاق باسم محلك وربط سريع بالمنصة.",
		price: "ابتداءً من 150 ر.س / سنويًا",
	},
];

const customers = ["سارتوريز"];

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-white flex flex-col">
			<PublicNavbar />

			<main className="pt-16 flex-1">
				{/* Hero Section */}
				<section className="mx-auto w-full max-w-7xl px-6 py-[7.5rem]">
					<div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
						<div className="flex-1">
							<h1 className="text-5xl font-bold leading-[1.2] text-slate-900 md:text-6xl md:leading-[1.2] lg:text-7xl lg:leading-[1.2]">
								نظام خياطة ذكي
								<br />
								<span className="text-slate-600">يدير عملك بكل احترافية وسهولة</span>
							</h1>
							<p className="mt-6 text-xl text-slate-600 leading-relaxed">
								ثوبك يجمع القياسات والطلبات والفوترة في منصة واحدة. أسرع، أوضح،
								وأقرب لعملائك.
							</p>
							<div className="mt-10 flex flex-wrap gap-4">
								<a href="#contact">
									<Button
										className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg h-12 px-8 text-base"
										size="lg"
									>
										تواصل معنا
									</Button>
								</a>
								<Link href="/how-to-use">
									<Button
										variant="outline"
										className="border-2 border-slate-300 bg-white hover:bg-slate-50 h-12 px-8 text-base"
										size="lg"
									>
										شاهد عرضًا توضيحيًا
									</Button>
								</Link>
							</div>
						</div>
						<div className="flex-1">
							<div className="rounded-3xl border-2 border-slate-200 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden">
								<div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 py-4">
									<span className="h-3 w-3 rounded-full bg-red-500" />
									<span className="h-3 w-3 rounded-full bg-yellow-400" />
									<span className="h-3 w-3 rounded-full bg-green-500" />
								</div>
								<div className="bg-slate-50 p-2">
									<div className="overflow-hidden rounded-2xl bg-white">
										<img
											alt="لقطة شاشة من لوحة ثوبك"
											className="h-auto w-full"
											src="/images/landing-dashboard.png"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-10 flex justify-center">
						<div className="inline-flex max-w-full items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-2 shadow-sm">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white border border-emerald-200">
								<img src="/images/zatca.png" className="h-5 w-5" alt="ZATCA" />
							</div>
							<p className="whitespace-nowrap text-sm font-semibold text-slate-800">
								متوافق مع متطلبات هيئة الزكاة والضريبة والجمارك - المرحلة الأولى
							</p>
						</div>
					</div>
				</section>
				<section
					id="features"
					className="mx-auto w-full max-w-7xl px-6 py-[7.5rem] scroll-mt-16"
				>
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-4xl font-bold text-slate-900 md:text-5xl mb-4">
							كل الأدوات التي تحتاجها لإدارة محلك
						</h2>
						<p className="text-lg text-slate-600">
							بسيطة، واضحة، ومصممة خصيصًا للخياطين.
						</p>
					</div>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{features.map((item) => (
								<div
									key={item.title}
									className="group relative rounded-2xl border-2 border-slate-200 bg-white p-8 transition-all hover:border-slate-900 hover:shadow-xl"
								>
									<div className="relative">
										<div className="mb-5 flex items-center gap-4">
											<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 group-hover:scale-110 transition-transform">
												<item.icon className="h-7 w-7 text-white" />
											</div>
											<h3 className="text-xl font-bold text-slate-900">
												{item.title}
											</h3>
										</div>
										<p className="text-base text-slate-600 leading-relaxed">
											{item.description}
										</p>
									</div>
							</div>
						))}
					</div>
				</section>

				{/* Pricing Section */}
				<section
					id="pricing"
					className="relative overflow-hidden bg-white px-6 py-[7.5rem] scroll-mt-16"
				>
					<div className="mx-auto w-full max-w-7xl">
						<div className="text-center max-w-3xl mx-auto mb-16">
							<h2 className="text-5xl font-bold md:text-6xl mb-5 text-slate-900">
								الأسعار
							</h2>
							<p className="text-xl text-slate-600">
								اختر الباقة التي تناسب احتياجك، مع إمكانية الترقية في أي وقت
							</p>
						</div>

						{/* Plans */}
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto mb-24">
							{plans.map((plan) => (
								<div
									key={plan.title}
									className={`relative rounded-3xl border-2 transition-all duration-300 hover:shadow-2xl ${
										plan.accent
											? "border-slate-900 bg-slate-900 text-white lg:scale-[1.02]"
											: "border-slate-200 bg-white hover:border-slate-300"
									}`}
								>
									{plan.accent && (
										<div className="absolute -top-4 left-1/2 -translate-x-1/2">
											<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
												الأكثر اختيارًا
											</div>
										</div>
									)}

										<div className="p-4 md:p-5">
										{/* Header */}
										<div className="text-center mb-8">
											<h3
												className={`text-2xl font-bold mb-2 ${plan.accent ? "text-white" : "text-slate-900"}`}
											>
												{plan.title}
											</h3>
											<p
												className={`text-base ${plan.accent ? "text-slate-300" : "text-slate-600"}`}
											>
												{plan.description}
											</p>
										</div>

										{/* Pricing */}
											<div className="mb-5">
												<div
													className={`text-center p-4 rounded-2xl ${
														plan.accent ? "bg-slate-800" : "bg-slate-50"
													}`}
												>
												<div className="mb-6">
													<div className="flex items-baseline justify-center gap-2 mb-1">
														<span
															className={`text-6xl font-black ${plan.accent ? "text-white" : "text-slate-900"}`}
														>
															{plan.monthlyPrice}
														</span>
														<div className="text-right">
															<span
																className={`text-2xl font-bold ${plan.accent ? "text-slate-300" : "text-slate-600"}`}
															>
																ر.س
															</span>
															<p
																className={`text-sm ${plan.accent ? "text-slate-400" : "text-slate-500"}`}
															>
																/ شهريًا
															</p>
														</div>
													</div>
												</div>

												<div
													className={`pt-4 border-t ${plan.accent ? "border-slate-700" : "border-slate-200"}`}
												>
													<p
														className={`text-sm font-semibold mb-2 ${plan.accent ? "text-slate-400" : "text-slate-600"}`}
													>
														أو ادفع سنويًا
													</p>
													<div className="flex items-baseline justify-center gap-2">
														<span
															className={`text-3xl font-bold ${plan.accent ? "text-white" : "text-slate-900"}`}
														>
															{plan.annualPrice}
														</span>
														<span
															className={`text-lg ${plan.accent ? "text-slate-300" : "text-slate-600"}`}
														>
															ر.س / سنويًا
														</span>
													</div>
													<div className="mt-2 inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
														وفر{" "}
														{(
															parseFloat(plan.monthlyPrice) * 12 -
															parseFloat(plan.annualPrice.replace(",", ""))
														).toFixed(0)}{" "}
														ر.س
													</div>
												</div>
											</div>
										</div>

										{/* Features */}
										<div className="space-y-4 mb-8">
											{plan.features.map((feature) => (
												<div key={feature.label} className="flex items-center gap-3">
													<div
														className={`flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 ${
															feature.included
																? plan.accent
																	? "bg-white"
																	: "bg-slate-900"
																: plan.accent
																	? "bg-slate-700"
																	: "bg-slate-200"
														}`}
													>
														{feature.included ? (
															<Check
																className={`h-4 w-4 ${plan.accent ? "text-slate-900" : "text-white"} stroke-[3]`}
															/>
														) : (
															<X
																className={`h-4 w-4 ${plan.accent ? "text-slate-300" : "text-slate-500"} stroke-[3]`}
															/>
														)}
													</div>
													<span
														className={`text-base ${
															feature.included
																? plan.accent
																	? "text-slate-200"
																	: "text-slate-700"
																: plan.accent
																	? "text-slate-400"
																	: "text-slate-500"
														}`}
													>
														{feature.label}
													</span>
												</div>
											))}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Add-ons Section */}
						<div className="max-w-5xl mx-auto">
							<div className="text-center mb-12">
								<h3 className="text-3xl font-bold text-slate-900 mb-3">
									إضافات اختيارية
								</h3>
								<p className="text-lg text-slate-600">
									عزز تجربتك مع هذه الإضافات المفيدة
								</p>
							</div>

							<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
								{addons.map((addon) => (
									<div
										key={addon.title}
										className="group relative rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-slate-900 hover:shadow-xl transition-all"
									>
										<h4 className="text-lg font-bold text-slate-900 mb-2">
											{addon.title}
										</h4>
										<p className="text-sm text-slate-600 mb-4 leading-relaxed">
											{addon.description}
										</p>
										<div className="pt-4 border-t border-slate-200">
											<p className="text-sm font-semibold text-slate-500 mb-1">
												السعر
											</p>
											<p className="text-base font-bold text-slate-900">
												{addon.price}
											</p>
										</div>
									</div>
								))}

								{/* Enterprise Card */}
								<div className="group relative rounded-2xl border-2 border-slate-900 bg-slate-900 p-6 hover:shadow-xl transition-all">
									<div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
										المنشآت الكبيرة
									</div>
									<h4 className="text-lg font-bold text-white mb-2">
										حلول خاصة
									</h4>
									<p className="text-sm text-slate-300 mb-4 leading-relaxed">
										خصومات خاصة وميزات مخصصة للمنشآت الكبيرة
									</p>
									<div className="pt-4 border-t border-slate-700">
										<p className="text-sm font-semibold text-slate-400 mb-1">
											السعر
										</p>
										<p className="text-base font-bold text-white">تواصل معنا</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Customers Section */}
				<section
					id="customers"
					className="mx-auto w-full max-w-7xl px-6 py-[7.5rem] scroll-mt-16"
				>
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
							علامات تثق بثوبك يوميًا
						</h2>
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{customers.map((customer) => (
							<div
								key={customer}
								className="flex h-32 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white text-xl font-bold text-slate-900 hover:border-slate-900 hover:shadow-lg transition-all"
							>
								{customer}
							</div>
						))}
					</div>
				</section>

				{/* Contact & Sales Section */}
				<section
					id="contact"
					className="bg-white px-6 py-[7.5rem] scroll-mt-16"
				>
					<div className="mx-auto w-full max-w-7xl">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-slate-900 md:text-5xl mb-4">
								تواصل معنا
							</h2>
							<p className="text-xl text-slate-600">
								فريقنا جاهز لمساعدتك، اختر الطريقة الأنسب للتواصل
							</p>
						</div>

						{/* Contact Methods Grid */}
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto mb-16">
							{/* WhatsApp Sales Rep 1 */}
							<a
								href="https://wa.me/966539288864"
								target="_blank"
								rel="noopener noreferrer"
								className="group relative rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-emerald-500 hover:shadow-xl transition-all"
							>
								<div className="text-center">
									<div className="flex justify-center mb-4">
										<div className="relative">
											<div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg group-hover:bg-emerald-500/30 transition-all"></div>
											<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 group-hover:bg-emerald-500 transition-all">
												<svg
													className="h-8 w-8 text-white"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
												</svg>
											</div>
										</div>
									</div>
									<p className="text-xs font-semibold text-slate-500 mb-2">
										خالد
									</p>
									<p className="text-lg font-black text-slate-900 direction-ltr mb-3">
										0539288864
									</p>
									<div className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold">
										<span>واتساب</span>
										<svg
											className="h-4 w-4 group-hover:translate-x-1 transition-transform"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 19l-7-7 7-7"
											/>
										</svg>
									</div>
								</div>
							</a>

							{/* WhatsApp Sales Rep 2 */}
							<a
								href="https://wa.me/966568698492"
								target="_blank"
								rel="noopener noreferrer"
								className="group relative rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-emerald-500 hover:shadow-xl transition-all"
							>
								<div className="text-center">
									<div className="flex justify-center mb-4">
										<div className="relative">
											<div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg group-hover:bg-emerald-500/30 transition-all"></div>
											<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 group-hover:bg-emerald-500 transition-all">
												<svg
													className="h-8 w-8 text-white"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
												</svg>
											</div>
										</div>
									</div>
									<p className="text-xs font-semibold text-slate-500 mb-2">
										فيصل
									</p>
									<p className="text-lg font-black text-slate-900 direction-ltr mb-3">
										0568698492
									</p>
									<div className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold">
										<span>واتساب</span>
										<svg
											className="h-4 w-4 group-hover:translate-x-1 transition-transform"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 19l-7-7 7-7"
											/>
										</svg>
									</div>
								</div>
							</a>

							{/* General WhatsApp */}
							<a
								href="https://wa.me/966561433476"
								target="_blank"
								rel="noopener noreferrer"
								className="group relative rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-emerald-500 hover:shadow-xl transition-all"
							>
								<div className="text-center">
									<div className="flex justify-center mb-4">
										<div className="relative">
											<div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg group-hover:bg-emerald-500/30 transition-all"></div>
											<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 group-hover:bg-emerald-500 transition-all">
												<svg
													className="h-8 w-8 text-white"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
												</svg>
											</div>
										</div>
									</div>
									<p className="text-xs font-semibold text-slate-500 mb-2">
										سلطان
									</p>
									<p className="text-lg font-black text-slate-900 direction-ltr mb-3">
										0561433476
									</p>
									<div className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold">
										<span>واتساب</span>
										<svg
											className="h-4 w-4 group-hover:translate-x-1 transition-transform"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 19l-7-7 7-7"
											/>
										</svg>
									</div>
								</div>
							</a>

							{/* WhatsApp Technical Support */}
							<a
								href="https://wa.me/966561709632"
								target="_blank"
								rel="noopener noreferrer"
								className="group relative rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-emerald-500 hover:shadow-xl transition-all"
							>
								<div className="text-center">
									<div className="flex justify-center mb-4">
										<div className="relative">
											<div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg group-hover:bg-emerald-500/30 transition-all"></div>
											<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 group-hover:bg-emerald-500 transition-all">
												<svg
													className="h-8 w-8 text-white"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
												</svg>
											</div>
										</div>
									</div>
									<p className="text-xs font-semibold text-slate-500 mb-2">
										الدعم الفني
									</p>
									<p className="text-lg font-black text-slate-900 direction-ltr mb-3">
										0561709632
									</p>
									<div className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold">
										<span>واتساب</span>
										<svg
											className="h-4 w-4 group-hover:translate-x-1 transition-transform"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 19l-7-7 7-7"
											/>
										</svg>
									</div>
								</div>
							</a>
						</div>
					</div>
				</section>
			</main>

			<PublicFooter />
		</div>
	);
}
