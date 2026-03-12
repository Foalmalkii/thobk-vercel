import { Check, X } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PublicFooter } from "@/components/public/public-footer";
import { PublicNavbar } from "@/components/public/public-navbar";
import { Button } from "@/components/ui/button";
import { SmsCreditCard } from "@/components/public/sms-credit-modal";
import { SarIcon } from "@/components/ui/sar-icon";

const customers = ["سارتوريز"];

export default async function LandingPage() {
	const t = await getTranslations("landing");

	const plans = [
		{
			title: t("plan_1_title"),
			description: t("plan_1_desc"),
			monthlyPrice: "49",
			annualPrice: "499",
			features: [
				{ label: t("feat_one_branch"), included: true },
				{ label: t("feat_one_employee"), included: true },
				{ label: t("feat_inventory"), included: false },
				{ label: t("feat_reports"), included: false },
				{ label: t("feat_sms_starter"), included: false },
				{ label: t("feat_support"), included: false },
				{ label: t("feat_factory"), included: false },
			],
			accent: false,
		},
		{
			title: t("plan_2_title"),
			description: t("plan_2_desc"),
			monthlyPrice: "99",
			annualPrice: "999",
			features: [
				{ label: t("feat_one_branch"), included: true },
				{ label: t("feat_three_employees"), included: true },
				{ label: t("feat_inventory"), included: true },
				{ label: t("feat_reports"), included: true },
				{ label: t("feat_sms_50"), included: true },
				{ label: t("feat_support_wa"), included: true },
				{ label: t("feat_factory"), included: false }, //TODO: close it later, when packs are
			],
			accent: true,
		},
		{
			title: t("plan_3_title"),
			description: t("plan_3_desc"),
			monthlyPrice: "149",
			annualPrice: "1499",
			features: [
				{ label: t("feat_three_branches"), included: true },
				{ label: t("feat_ten_employees"), included: true },
				{ label: t("feat_inventory"), included: true },
				{ label: t("feat_reports"), included: true },
				{ label: t("feat_sms_100"), included: true },
				{ label: t("feat_account_manager"), included: true },
				{ label: t("feat_factory"), included: true },
			],
			accent: false,
		},
		{
			title: t("plan_4_title"),
			description: t("plan_4_desc"),
			monthlyPrice: "199",
			annualPrice: "1999",
			features: [
				{ label: t("feat_ten_branches"), included: true },
				{ label: t("feat_fifty_employees"), included: true },
				{ label: t("feat_inventory"), included: true },
				{ label: t("feat_reports"), included: true },
				{ label: t("feat_sms_300"), included: true },
				{ label: t("feat_account_manager"), included: true },
				{ label: t("feat_factory"), included: true },
			],
			accent: false,
		},
	];

	const addons = [
		{
			title: t("addon_whatsapp_title"),
			description: t("addon_whatsapp_desc"),
			price: t("addon_usage_based"),
		},
		{
			title: t("addon_domain_title"),
			description: t("addon_domain_desc"),
			price: t("addon_domain_price"),
		},
	];

	const contacts = [
		{ href: "https://wa.me/966539288864", name: "خالد", phone: "0539288864" },
		{ href: "https://wa.me/966568698492", name: "فيصل", phone: "0568698492" },
		{ href: "https://wa.me/966561433476", name: "سلطان", phone: "0561433476" },
		{
			href: "https://wa.me/966561709632",
			name: t("contact_tech_support"),
			phone: "0561709632",
		},
	];

	return (
		<div className="min-h-screen bg-white flex flex-col">
			<PublicNavbar />

			<main className="pt-16 flex-1">
				{/* ─── Hero ─── */}
				<section className="relative overflow-hidden mx-auto w-full max-w-7xl px-6 pt-28 pb-20 md:pt-36 md:pb-28">
					{/* Subtle background gradient */}
					<div className="pointer-events-none absolute inset-0 -z-10">
						<div className="absolute top-0 end-0 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/3 rounded-full bg-zinc-100 blur-3xl opacity-80" />
						<div className="absolute bottom-0 start-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/4 rounded-full bg-zinc-50 blur-3xl" />
					</div>

					<div className="flex flex-col gap-16 lg:flex-row lg:items-center">
						{/* Copy */}
						<div className="flex-1 max-w-2xl">
							{/* Section label */}
							<p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-6">
								{t("hero_label")}
							</p>

							<h1 className="text-5xl font-black leading-[1.1] tracking-tight text-zinc-950 md:text-6xl lg:text-[4.5rem]">
								{t("hero_headline_1")}
								<br />
								<span className="text-zinc-400">{t("hero_headline_2")}</span>
							</h1>

							<p className="mt-6 text-lg text-zinc-500 leading-relaxed max-w-md">
								{t("hero_body")}
							</p>

							<div className="mt-10 flex flex-wrap gap-3">
								<a href="#contact">
									<Button
										className="bg-zinc-950 text-white hover:bg-zinc-800 h-12 px-8 text-base rounded-xl"
										size="lg"
									>
										{t("hero_cta_contact")}
									</Button>
								</a>
								<Link href="/how-to-use">
									<Button
										variant="outline"
										className="border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-900 h-12 px-8 text-base rounded-xl"
										size="lg"
									>
										{t("hero_cta_demo")}
									</Button>
								</Link>
							</div>

							{/* Divider */}
							<div className="mt-12 border-t border-zinc-100" />

							{/* Stats row */}
							<div className="mt-6 flex flex-wrap items-start gap-8">
								<div className="flex flex-col gap-0.5">
									<p className="text-2xl font-black text-zinc-950 tabular-nums leading-none">
										{t("stat_tailors_value")}
									</p>
									<p className="text-xs text-zinc-500 mt-1 leading-snug">
										{t("stat_tailors_label")}
									</p>
								</div>
								<div className="h-10 w-px bg-zinc-200 mt-1 hidden sm:block" />
								<div className="flex flex-col gap-0.5">
									<p className="text-2xl font-black text-zinc-950 tabular-nums leading-none">
										{t("stat_speed_value")}
									</p>
									<p className="text-xs text-zinc-500 mt-1 leading-snug">
										{t("stat_speed_label")}
									</p>
								</div>
								<div className="h-10 w-px bg-zinc-200 mt-1 hidden sm:block" />
								<div className="flex flex-col gap-0.5">
									<div className="flex items-center gap-1.5">
										<img
											src="/images/zatca.png"
											className="h-4 w-4 shrink-0"
											alt=""
										/>
										<p className="text-sm font-black text-emerald-700 leading-none">
											{t("stat_zatca_compliant")}
										</p>
									</div>
									<p className="text-xs text-zinc-500 mt-1 leading-snug max-w-[160px]">
										{t("stat_zatca_name")}
									</p>
								</div>
							</div>
						</div>

						{/* Dashboard mockup */}
						<div className="flex-1 relative">
							{/* Glow aura */}
							<div className="absolute inset-8 -z-10 rounded-3xl bg-zinc-100 blur-3xl" />

							{/* Browser chrome */}
							<div className="relative rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/10 overflow-hidden">
								<div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50 px-5 py-3.5">
									<span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
									<span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
									<span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
									<div className="mx-auto flex h-5 w-48 items-center justify-center rounded bg-zinc-100 text-[10px] text-zinc-400">
										thobk.digip.sa
									</div>
								</div>
								<div className="bg-zinc-50 p-2">
									<div className="overflow-hidden rounded-xl bg-white">
										<img
											alt={t("hero_img_alt")}
											className="h-auto w-full"
											src="/images/landing-dashboard.png"
										/>
									</div>
								</div>
							</div>

							{/* Floating order-ready card */}
							<div className="absolute -bottom-4 -start-6 z-10 rounded-xl border border-zinc-200 bg-white shadow-xl px-4 py-3 flex items-center gap-3">
								<div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
									<Check className="h-4 w-4 text-emerald-600" strokeWidth={3} />
								</div>
								<div>
									<p className="text-xs font-bold text-zinc-900 leading-none mb-1">
										{t("order_ready_title")}
									</p>
									<p className="text-[10px] text-zinc-400">
										{t("order_ready_subtitle")}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* ─── Features ─── */}
				<section
					id="features"
					className="mx-auto w-full max-w-7xl px-6 py-[7.5rem] scroll-mt-16"
				>
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-4xl font-bold text-slate-900 md:text-5xl mb-4">
							{t("features_heading")}
						</h2>
						<p className="text-lg text-slate-600">{t("features_subheading")}</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{/* 1 – Measurements */}
						<div className="group rounded-2xl border-2 border-slate-200 bg-white overflow-hidden transition-all hover:border-slate-900 hover:shadow-xl">
							<div className="bg-slate-50 border-b border-slate-100 p-5">
								<svg
									viewBox="0 0 280 168"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-auto"
									aria-hidden="true"
								>
									{/* Card */}
									<rect
										x="16"
										y="8"
										width="248"
										height="152"
										rx="10"
										fill="white"
										stroke="#e2e8f0"
										strokeWidth="1.5"
									/>
									{/* Header */}
									<rect
										x="16"
										y="8"
										width="248"
										height="44"
										rx="10"
										fill="#f8fafc"
									/>
									<rect x="16" y="44" width="248" height="8" fill="#f8fafc" />
									{/* Avatar */}
									<circle cx="48" cy="30" r="14" fill="#e2e8f0" />
									<circle cx="48" cy="25" r="5" fill="#94a3b8" />
									<path d="M35 42 Q48 34 61 42" fill="#94a3b8" />
									{/* Name + subtitle */}
									<rect
										x="72"
										y="20"
										width="108"
										height="8"
										rx="4"
										fill="#1e293b"
									/>
									<rect
										x="72"
										y="33"
										width="72"
										height="6"
										rx="3"
										fill="#94a3b8"
									/>
									{/* Badge */}
									<rect
										x="218"
										y="22"
										width="34"
										height="16"
										rx="8"
										fill="#0f172a"
									/>
									<rect
										x="223"
										y="26"
										width="24"
										height="7"
										rx="3.5"
										fill="white"
										opacity="0.55"
									/>
									{/* Row 1 */}
									<rect
										x="32"
										y="62"
										width="100"
										height="7"
										rx="3.5"
										fill="#cbd5e1"
									/>
									<rect
										x="224"
										y="62"
										width="40"
										height="7"
										rx="3.5"
										fill="#1e293b"
									/>
									<line
										x1="32"
										y1="78"
										x2="248"
										y2="78"
										stroke="#f1f5f9"
										strokeWidth="1.5"
									/>
									{/* Row 2 */}
									<rect
										x="32"
										y="86"
										width="86"
										height="7"
										rx="3.5"
										fill="#cbd5e1"
									/>
									<rect
										x="224"
										y="86"
										width="40"
										height="7"
										rx="3.5"
										fill="#1e293b"
									/>
									<line
										x1="32"
										y1="102"
										x2="248"
										y2="102"
										stroke="#f1f5f9"
										strokeWidth="1.5"
									/>
									{/* Row 3 */}
									<rect
										x="32"
										y="110"
										width="112"
										height="7"
										rx="3.5"
										fill="#cbd5e1"
									/>
									<rect
										x="224"
										y="110"
										width="40"
										height="7"
										rx="3.5"
										fill="#1e293b"
									/>
									<line
										x1="32"
										y1="126"
										x2="248"
										y2="126"
										stroke="#f1f5f9"
										strokeWidth="1.5"
									/>
									{/* Row 4 */}
									<rect
										x="32"
										y="134"
										width="94"
										height="7"
										rx="3.5"
										fill="#cbd5e1"
									/>
									<rect
										x="224"
										y="134"
										width="40"
										height="7"
										rx="3.5"
										fill="#1e293b"
									/>
									{/* Save button */}
									<rect
										x="32"
										y="148"
										width="90"
										height="6"
										rx="3"
										fill="#0f172a"
										opacity="0.08"
									/>
								</svg>
							</div>
							<div className="p-6">
								<h3 className="text-lg font-bold text-slate-900 mb-2">
									{t("feature_1_title")}
								</h3>
								<p className="text-sm text-slate-600 leading-relaxed">
									{t("feature_1_desc")}
								</p>
							</div>
						</div>

						{/* 2 – Order Management (Kanban) */}
						<div className="group rounded-2xl border-2 border-slate-200 bg-white overflow-hidden transition-all hover:border-slate-900 hover:shadow-xl">
							<div className="bg-slate-50 border-b border-slate-100 p-5">
								<svg
									viewBox="0 0 280 168"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-auto"
									aria-hidden="true"
								>
									{/* Col 1 – جديد */}
									<rect
										x="8"
										y="8"
										width="58"
										height="14"
										rx="4"
										fill="#f1f5f9"
									/>
									<rect
										x="14"
										y="13"
										width="34"
										height="5"
										rx="2.5"
										fill="#94a3b8"
									/>
									<rect
										x="8"
										y="26"
										width="58"
										height="40"
										rx="6"
										fill="white"
										stroke="#e2e8f0"
										strokeWidth="1.5"
									/>
									<rect
										x="14"
										y="33"
										width="38"
										height="6"
										rx="3"
										fill="#cbd5e1"
									/>
									<rect
										x="14"
										y="44"
										width="28"
										height="5"
										rx="2.5"
										fill="#e2e8f0"
									/>
									<rect
										x="14"
										y="53"
										width="22"
										height="5"
										rx="2.5"
										fill="#e2e8f0"
									/>
									<rect
										x="8"
										y="70"
										width="58"
										height="40"
										rx="6"
										fill="white"
										stroke="#e2e8f0"
										strokeWidth="1.5"
									/>
									<rect
										x="14"
										y="77"
										width="34"
										height="6"
										rx="3"
										fill="#cbd5e1"
									/>
									<rect
										x="14"
										y="88"
										width="24"
										height="5"
										rx="2.5"
										fill="#e2e8f0"
									/>
									<rect
										x="14"
										y="97"
										width="18"
										height="5"
										rx="2.5"
										fill="#e2e8f0"
									/>

									{/* Col 2 – خياطة */}
									<rect
										x="72"
										y="8"
										width="62"
										height="14"
										rx="4"
										fill="#fef3c7"
									/>
									<rect
										x="78"
										y="13"
										width="40"
										height="5"
										rx="2.5"
										fill="#d97706"
									/>
									<rect
										x="72"
										y="26"
										width="62"
										height="40"
										rx="6"
										fill="white"
										stroke="#fbbf24"
										strokeWidth="1.5"
									/>
									<rect
										x="78"
										y="33"
										width="42"
										height="6"
										rx="3"
										fill="#1e293b"
									/>
									<rect
										x="78"
										y="44"
										width="30"
										height="5"
										rx="2.5"
										fill="#fde68a"
									/>
									<rect
										x="78"
										y="53"
										width="24"
										height="5"
										rx="2.5"
										fill="#fde68a"
									/>
									<rect
										x="72"
										y="70"
										width="62"
										height="40"
										rx="6"
										fill="white"
										stroke="#fbbf24"
										strokeWidth="1.5"
									/>
									<rect
										x="78"
										y="77"
										width="38"
										height="6"
										rx="3"
										fill="#1e293b"
									/>
									<rect
										x="78"
										y="88"
										width="26"
										height="5"
										rx="2.5"
										fill="#fde68a"
									/>
									<rect
										x="78"
										y="97"
										width="32"
										height="5"
										rx="2.5"
										fill="#fde68a"
									/>
									<rect
										x="72"
										y="114"
										width="62"
										height="40"
										rx="6"
										fill="white"
										stroke="#fbbf24"
										strokeWidth="1.5"
									/>
									<rect
										x="78"
										y="121"
										width="40"
										height="6"
										rx="3"
										fill="#1e293b"
									/>
									<rect
										x="78"
										y="132"
										width="28"
										height="5"
										rx="2.5"
										fill="#fde68a"
									/>
									<rect
										x="78"
										y="141"
										width="20"
										height="5"
										rx="2.5"
										fill="#fde68a"
									/>

									{/* Col 3 – جاهز */}
									<rect
										x="140"
										y="8"
										width="62"
										height="14"
										rx="4"
										fill="#d1fae5"
									/>
									<rect
										x="146"
										y="13"
										width="30"
										height="5"
										rx="2.5"
										fill="#059669"
									/>
									<rect
										x="140"
										y="26"
										width="62"
										height="40"
										rx="6"
										fill="white"
										stroke="#34d399"
										strokeWidth="2"
									/>
									<rect
										x="146"
										y="33"
										width="36"
										height="6"
										rx="3"
										fill="#1e293b"
									/>
									<rect
										x="146"
										y="44"
										width="24"
										height="5"
										rx="2.5"
										fill="#a7f3d0"
									/>
									<rect
										x="146"
										y="53"
										width="18"
										height="5"
										rx="2.5"
										fill="#a7f3d0"
									/>
									<circle cx="191" cy="36" r="7" fill="#10b981" />
									<path
										d="M187.5 36 L190 38.5 L195 32.5"
										stroke="white"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>

									{/* Col 4 – تسليم */}
									<rect
										x="210"
										y="8"
										width="62"
										height="14"
										rx="4"
										fill="#f1f5f9"
									/>
									<rect
										x="216"
										y="13"
										width="36"
										height="5"
										rx="2.5"
										fill="#94a3b8"
									/>
									<rect
										x="210"
										y="26"
										width="62"
										height="40"
										rx="6"
										fill="white"
										stroke="#e2e8f0"
										strokeWidth="1.5"
									/>
									<rect
										x="216"
										y="33"
										width="44"
										height="6"
										rx="3"
										fill="#cbd5e1"
									/>
									<rect
										x="216"
										y="44"
										width="30"
										height="5"
										rx="2.5"
										fill="#e2e8f0"
									/>
									<rect
										x="216"
										y="53"
										width="22"
										height="5"
										rx="2.5"
										fill="#e2e8f0"
									/>
									<rect
										x="210"
										y="70"
										width="62"
										height="40"
										rx="6"
										fill="white"
										stroke="#e2e8f0"
										strokeWidth="1.5"
									/>
									<rect
										x="216"
										y="77"
										width="38"
										height="6"
										rx="3"
										fill="#cbd5e1"
									/>
									<rect
										x="216"
										y="88"
										width="28"
										height="5"
										rx="2.5"
										fill="#e2e8f0"
									/>
									<rect
										x="216"
										y="97"
										width="20"
										height="5"
										rx="2.5"
										fill="#e2e8f0"
									/>
								</svg>
							</div>
							<div className="p-6">
								<h3 className="text-lg font-bold text-slate-900 mb-2">
									{t("feature_2_title")}
								</h3>
								<p className="text-sm text-slate-600 leading-relaxed">
									{t("feature_2_desc")}
								</p>
							</div>
						</div>

						{/* 3 – Invoicing */}
						<div className="group rounded-2xl border-2 border-slate-200 bg-white overflow-hidden transition-all hover:border-slate-900 hover:shadow-xl">
							<div className="bg-slate-50 border-b border-slate-100 p-5">
								<svg
									viewBox="0 0 280 168"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-auto"
									aria-hidden="true"
								>
									{/* Invoice document */}
									<rect
										x="40"
										y="8"
										width="200"
										height="152"
										rx="10"
										fill="white"
										stroke="#e2e8f0"
										strokeWidth="1.5"
									/>
									{/* Dark header */}
									<rect
										x="40"
										y="8"
										width="200"
										height="44"
										rx="10"
										fill="#0f172a"
									/>
									<rect x="40" y="44" width="200" height="8" fill="#0f172a" />
									{/* Invoice title */}
									<rect
										x="56"
										y="17"
										width="80"
										height="8"
										rx="4"
										fill="white"
										opacity="0.9"
									/>
									<rect
										x="56"
										y="30"
										width="54"
										height="6"
										rx="3"
										fill="white"
										opacity="0.45"
									/>
									{/* QR code placeholder */}
									<rect
										x="208"
										y="13"
										width="22"
										height="22"
										rx="3"
										fill="white"
										opacity="0.12"
									/>
									<rect
										x="211"
										y="16"
										width="7"
										height="7"
										rx="1"
										fill="white"
										opacity="0.5"
									/>
									<rect
										x="220"
										y="16"
										width="7"
										height="7"
										rx="1"
										fill="white"
										opacity="0.5"
									/>
									<rect
										x="211"
										y="25"
										width="7"
										height="7"
										rx="1"
										fill="white"
										opacity="0.5"
									/>
									<rect
										x="220"
										y="25"
										width="7"
										height="7"
										rx="1"
										fill="white"
										opacity="0.5"
									/>
									{/* Line items */}
									<rect
										x="56"
										y="62"
										width="116"
										height="7"
										rx="3.5"
										fill="#cbd5e1"
									/>
									<rect
										x="210"
										y="62"
										width="22"
										height="7"
										rx="3.5"
										fill="#1e293b"
									/>
									<line
										x1="56"
										y1="78"
										x2="224"
										y2="78"
										stroke="#f1f5f9"
										strokeWidth="1.5"
									/>
									<rect
										x="56"
										y="86"
										width="96"
										height="7"
										rx="3.5"
										fill="#cbd5e1"
									/>
									<rect
										x="210"
										y="86"
										width="22"
										height="7"
										rx="3.5"
										fill="#1e293b"
									/>
									<line
										x1="56"
										y1="102"
										x2="224"
										y2="102"
										stroke="#f1f5f9"
										strokeWidth="1.5"
									/>
									<rect
										x="56"
										y="110"
										width="106"
										height="7"
										rx="3.5"
										fill="#cbd5e1"
									/>
									<rect
										x="210"
										y="110"
										width="22"
										height="7"
										rx="3.5"
										fill="#1e293b"
									/>
									{/* Separator */}
									<line
										x1="56"
										y1="126"
										x2="224"
										y2="126"
										stroke="#e2e8f0"
										strokeWidth="2"
									/>
									{/* VAT row */}
									<rect
										x="56"
										y="133"
										width="56"
										height="6"
										rx="3"
										fill="#94a3b8"
									/>
									<rect
										x="210"
										y="133"
										width="22"
										height="6"
										rx="3"
										fill="#94a3b8"
									/>
									{/* Total row */}
									<rect
										x="56"
										y="148"
										width="76"
										height="8"
										rx="4"
										fill="#0f172a"
									/>
									<rect
										x="206"
										y="148"
										width="26"
										height="8"
										rx="4"
										fill="#0f172a"
									/>
								</svg>
							</div>
							<div className="p-6">
								<h3 className="text-lg font-bold text-slate-900 mb-2">
									{t("feature_3_title")}
								</h3>
								<p className="text-sm text-slate-600 leading-relaxed">
									{t("feature_3_desc")}
								</p>
							</div>
						</div>

						{/* 4 – Branch & Staff Management */}
						<div className="group rounded-2xl border-2 border-slate-200 bg-white overflow-hidden transition-all hover:border-slate-900 hover:shadow-xl">
							<div className="bg-slate-50 border-b border-slate-100 p-5">
								<svg
									viewBox="0 0 280 168"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-auto"
									aria-hidden="true"
								>
									{/* Main HQ card */}
									<rect
										x="90"
										y="8"
										width="100"
										height="44"
										rx="8"
										fill="#0f172a"
									/>
									<circle cx="112" cy="24" r="8" fill="white" opacity="0.18" />
									<circle cx="112" cy="21" r="3" fill="white" opacity="0.5" />
									<path d="M105 29 Q112 24 119 29" fill="white" opacity="0.3" />
									<rect
										x="126"
										y="17"
										width="52"
										height="7"
										rx="3.5"
										fill="white"
										opacity="0.8"
									/>
									<rect
										x="126"
										y="28"
										width="36"
										height="6"
										rx="3"
										fill="white"
										opacity="0.4"
									/>
									<rect
										x="100"
										y="39"
										width="80"
										height="6"
										rx="3"
										fill="white"
										opacity="0.25"
									/>
									{/* Connector lines */}
									<line
										x1="140"
										y1="52"
										x2="49"
										y2="92"
										stroke="#cbd5e1"
										strokeWidth="1.5"
										strokeDasharray="4 3"
									/>
									<line
										x1="140"
										y1="52"
										x2="140"
										y2="92"
										stroke="#cbd5e1"
										strokeWidth="1.5"
										strokeDasharray="4 3"
									/>
									<line
										x1="140"
										y1="52"
										x2="231"
										y2="92"
										stroke="#cbd5e1"
										strokeWidth="1.5"
										strokeDasharray="4 3"
									/>
									{/* Branch 1 */}
									<rect
										x="8"
										y="92"
										width="82"
										height="50"
										rx="8"
										fill="white"
										stroke="#e2e8f0"
										strokeWidth="1.5"
									/>
									<rect
										x="8"
										y="92"
										width="82"
										height="20"
										rx="8"
										fill="#f1f5f9"
									/>
									<rect x="8" y="104" width="82" height="8" fill="#f1f5f9" />
									<circle cx="24" cy="102" r="6" fill="#cbd5e1" />
									<rect
										x="34"
										y="98"
										width="44"
										height="6"
										rx="3"
										fill="#64748b"
									/>
									<circle cx="20" cy="124" r="5" fill="#e2e8f0" />
									<circle cx="32" cy="124" r="5" fill="#e2e8f0" />
									<circle cx="44" cy="124" r="5" fill="#e2e8f0" />
									<rect
										x="54"
										y="121"
										width="28"
										height="6"
										rx="3"
										fill="#f1f5f9"
									/>
									<rect
										x="16"
										y="134"
										width="60"
										height="5"
										rx="2.5"
										fill="#e2e8f0"
									/>
									{/* Branch 2 */}
									<rect
										x="99"
										y="92"
										width="82"
										height="50"
										rx="8"
										fill="white"
										stroke="#e2e8f0"
										strokeWidth="1.5"
									/>
									<rect
										x="99"
										y="92"
										width="82"
										height="20"
										rx="8"
										fill="#f1f5f9"
									/>
									<rect x="99" y="104" width="82" height="8" fill="#f1f5f9" />
									<circle cx="115" cy="102" r="6" fill="#cbd5e1" />
									<rect
										x="125"
										y="98"
										width="44"
										height="6"
										rx="3"
										fill="#64748b"
									/>
									<circle cx="111" cy="124" r="5" fill="#e2e8f0" />
									<circle cx="123" cy="124" r="5" fill="#e2e8f0" />
									<rect
										x="133"
										y="121"
										width="36"
										height="6"
										rx="3"
										fill="#f1f5f9"
									/>
									<rect
										x="107"
										y="134"
										width="60"
										height="5"
										rx="2.5"
										fill="#e2e8f0"
									/>
									{/* Branch 3 */}
									<rect
										x="190"
										y="92"
										width="82"
										height="50"
										rx="8"
										fill="white"
										stroke="#e2e8f0"
										strokeWidth="1.5"
									/>
									<rect
										x="190"
										y="92"
										width="82"
										height="20"
										rx="8"
										fill="#f1f5f9"
									/>
									<rect x="190" y="104" width="82" height="8" fill="#f1f5f9" />
									<circle cx="206" cy="102" r="6" fill="#cbd5e1" />
									<rect
										x="216"
										y="98"
										width="44"
										height="6"
										rx="3"
										fill="#64748b"
									/>
									<circle cx="202" cy="124" r="5" fill="#e2e8f0" />
									<circle cx="214" cy="124" r="5" fill="#e2e8f0" />
									<circle cx="226" cy="124" r="5" fill="#e2e8f0" />
									<circle cx="238" cy="124" r="5" fill="#e2e8f0" />
									<rect
										x="200"
										y="134"
										width="60"
										height="5"
										rx="2.5"
										fill="#e2e8f0"
									/>
								</svg>
							</div>
							<div className="p-6">
								<h3 className="text-lg font-bold text-slate-900 mb-2">
									{t("feature_4_title")}
								</h3>
								<p className="text-sm text-slate-600 leading-relaxed">
									{t("feature_4_desc")}
								</p>
							</div>
						</div>

						{/* 5 – Inventory */}
						<div className="group rounded-2xl border-2 border-slate-200 bg-white overflow-hidden transition-all hover:border-slate-900 hover:shadow-xl">
							<div className="bg-slate-50 border-b border-slate-100 p-5">
								<svg
									viewBox="0 0 280 168"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-auto"
									aria-hidden="true"
								>
									{/* Card */}
									<rect
										x="16"
										y="8"
										width="248"
										height="152"
										rx="10"
										fill="white"
										stroke="#e2e8f0"
										strokeWidth="1.5"
									/>
									{/* Header */}
									<rect
										x="16"
										y="8"
										width="248"
										height="36"
										rx="10"
										fill="#f8fafc"
									/>
									<rect x="16" y="36" width="248" height="8" fill="#f8fafc" />
									<rect
										x="32"
										y="18"
										width="100"
										height="8"
										rx="4"
										fill="#1e293b"
									/>
									<rect
										x="218"
										y="17"
										width="34"
										height="18"
										rx="5"
										fill="#0f172a"
									/>
									<rect
										x="223"
										y="21"
										width="24"
										height="9"
										rx="3"
										fill="white"
										opacity="0.55"
									/>

									{/* Row 1 – dark fabric, 80% */}
									<circle cx="38" cy="65" r="11" fill="#1e293b" />
									<circle cx="38" cy="65" r="7" fill="#334155" />
									<circle cx="38" cy="65" r="3" fill="#1e293b" />
									<rect
										x="58"
										y="58"
										width="72"
										height="7"
										rx="3.5"
										fill="#1e293b"
									/>
									<rect
										x="58"
										y="69"
										width="48"
										height="6"
										rx="3"
										fill="#94a3b8"
									/>
									<rect
										x="142"
										y="61"
										width="100"
										height="9"
										rx="4.5"
										fill="#f1f5f9"
									/>
									<rect
										x="142"
										y="61"
										width="80"
										height="9"
										rx="4.5"
										fill="#1e293b"
									/>
									<rect
										x="248"
										y="59"
										width="8"
										height="13"
										rx="2"
										fill="#1e293b"
										opacity="0.12"
									/>
									<line
										x1="32"
										y1="84"
										x2="248"
										y2="84"
										stroke="#f1f5f9"
										strokeWidth="1.5"
									/>

									{/* Row 2 – mid gray fabric, 42% warning */}
									<circle cx="38" cy="104" r="11" fill="#475569" />
									<circle cx="38" cy="104" r="7" fill="#64748b" />
									<circle cx="38" cy="104" r="3" fill="#475569" />
									<rect
										x="58"
										y="97"
										width="60"
										height="7"
										rx="3.5"
										fill="#1e293b"
									/>
									<rect
										x="58"
										y="108"
										width="40"
										height="6"
										rx="3"
										fill="#94a3b8"
									/>
									<rect
										x="142"
										y="100"
										width="100"
										height="9"
										rx="4.5"
										fill="#f1f5f9"
									/>
									<rect
										x="142"
										y="100"
										width="42"
										height="9"
										rx="4.5"
										fill="#f59e0b"
									/>
									<rect
										x="248"
										y="98"
										width="8"
										height="13"
										rx="2"
										fill="#fef3c7"
									/>
									<line
										x1="32"
										y1="122"
										x2="248"
										y2="122"
										stroke="#f1f5f9"
										strokeWidth="1.5"
									/>

									{/* Row 3 – light gray fabric, 64% */}
									<circle cx="38" cy="142" r="11" fill="#94a3b8" />
									<circle cx="38" cy="142" r="7" fill="#cbd5e1" />
									<circle cx="38" cy="142" r="3" fill="#94a3b8" />
									<rect
										x="58"
										y="135"
										width="82"
										height="7"
										rx="3.5"
										fill="#1e293b"
									/>
									<rect
										x="58"
										y="146"
										width="56"
										height="6"
										rx="3"
										fill="#94a3b8"
									/>
									<rect
										x="142"
										y="138"
										width="100"
										height="9"
										rx="4.5"
										fill="#f1f5f9"
									/>
									<rect
										x="142"
										y="138"
										width="64"
										height="9"
										rx="4.5"
										fill="#1e293b"
									/>
									<rect
										x="248"
										y="136"
										width="8"
										height="13"
										rx="2"
										fill="#1e293b"
										opacity="0.12"
									/>
								</svg>
							</div>
							<div className="p-6">
								<h3 className="text-lg font-bold text-slate-900 mb-2">
									{t("feature_5_title")}
								</h3>
								<p className="text-sm text-slate-600 leading-relaxed">
									{t("feature_5_desc")}
								</p>
							</div>
						</div>

						{/* 6 – Communication */}
						<div className="group rounded-2xl border-2 border-slate-200 bg-white overflow-hidden transition-all hover:border-slate-900 hover:shadow-xl">
							<div className="bg-slate-50 border-b border-slate-100 p-5">
								<svg
									viewBox="0 0 280 168"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="w-full h-auto"
									aria-hidden="true"
								>
									{/* Phone frame */}
									<rect
										x="68"
										y="4"
										width="144"
										height="160"
										rx="14"
										fill="#e2e8f0"
									/>
									<rect
										x="72"
										y="8"
										width="136"
										height="152"
										rx="10"
										fill="#eff6ff"
										opacity="0.6"
									/>
									{/* Chat header */}
									<rect
										x="72"
										y="8"
										width="136"
										height="38"
										rx="10"
										fill="#0f172a"
									/>
									<rect x="72" y="38" width="136" height="8" fill="#0f172a" />
									<circle cx="94" cy="27" r="10" fill="#1e293b" />
									<circle cx="94" cy="23" r="4" fill="#94a3b8" />
									<path d="M85 33 Q94 28 103 33" fill="#94a3b8" />
									<rect
										x="110"
										y="18"
										width="66"
										height="7"
										rx="3.5"
										fill="white"
										opacity="0.85"
									/>
									<rect
										x="110"
										y="29"
										width="44"
										height="5"
										rx="2.5"
										fill="white"
										opacity="0.45"
									/>
									{/* Green online dot */}
									<circle cx="185" cy="16" r="5" fill="#10b981" />
									{/* Received bubble 1 (system) */}
									<rect
										x="78"
										y="56"
										width="112"
										height="26"
										rx="7"
										fill="white"
										stroke="#e2e8f0"
										strokeWidth="1"
									/>
									<polygon points="78,62 78,70 71,70" fill="white" />
									<rect
										x="86"
										y="63"
										width="78"
										height="5"
										rx="2.5"
										fill="#cbd5e1"
									/>
									<rect
										x="86"
										y="72"
										width="56"
										height="4"
										rx="2"
										fill="#e2e8f0"
									/>
									<rect
										x="166"
										y="73"
										width="18"
										height="4"
										rx="2"
										fill="#94a3b8"
										opacity="0.6"
									/>
									{/* Sent bubble (customer reply) */}
									<rect
										x="104"
										y="91"
										width="98"
										height="26"
										rx="7"
										fill="#dcfce7"
									/>
									<polygon points="202,97 202,105 209,105" fill="#dcfce7" />
									<rect
										x="112"
										y="98"
										width="66"
										height="5"
										rx="2.5"
										fill="#6ee7b7"
									/>
									<rect
										x="112"
										y="107"
										width="40"
										height="4"
										rx="2"
										fill="#a7f3d0"
									/>
									<rect
										x="174"
										y="108"
										width="18"
										height="4"
										rx="2"
										fill="#34d399"
										opacity="0.7"
									/>
									{/* System notification bubble */}
									<rect
										x="78"
										y="126"
										width="130"
										height="30"
										rx="7"
										fill="#0f172a"
									/>
									<polygon points="78,130 78,140 70,140" fill="#0f172a" />
									<circle cx="96" cy="137" r="6" fill="#10b981" />
									<path
										d="M93 137 L95.5 139.5 L100 133.5"
										stroke="white"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<rect
										x="108"
										y="130"
										width="90"
										height="6"
										rx="3"
										fill="white"
										opacity="0.7"
									/>
									<rect
										x="108"
										y="140"
										width="68"
										height="5"
										rx="2.5"
										fill="white"
										opacity="0.35"
									/>
								</svg>
							</div>
							<div className="p-6">
								<h3 className="text-lg font-bold text-slate-900 mb-2">
									{t("feature_6_title")}
								</h3>
								<p className="text-sm text-slate-600 leading-relaxed">
									{t("feature_6_desc")}
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* ─── Pricing ─── */}
				<section
					id="pricing"
					className="relative overflow-hidden bg-white px-6 py-[7.5rem] scroll-mt-16"
				>
					<div className="mx-auto w-full max-w-7xl">
						<div className="text-center max-w-3xl mx-auto mb-16">
							<h2 className="text-5xl font-bold md:text-6xl mb-5 text-slate-900">
								{t("pricing_heading")}
							</h2>
							<p className="text-xl text-slate-600">
								{t("pricing_subheading")}
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
												{t("plan_most_popular")}
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
																<SarIcon className="h-5 w-auto" />
															</span>
															<p
																className={`text-sm ${plan.accent ? "text-slate-400" : "text-slate-500"}`}
															>
																{t("plan_per_month")}
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
														{t("plan_or_annual")}
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
															<SarIcon className="h-4 w-auto" />{" "}
															{t("plan_per_year")}
														</span>
													</div>
													<div className="mt-2 inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
														{t("plan_save")}{" "}
														{(
															parseFloat(plan.monthlyPrice) * 12 -
															parseFloat(plan.annualPrice.replace(",", ""))
														).toFixed(0)}{" "}
														<SarIcon className="h-2.5 w-auto" />
													</div>
												</div>
											</div>
										</div>

										{/* Features */}
										<div className="space-y-4 mb-8">
											{plan.features.map((feature) => (
												<div
													key={feature.label}
													className="flex items-center gap-3"
												>
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
									{t("addons_heading")}
								</h3>
								<p className="text-lg text-slate-600">
									{t("addons_subheading")}
								</p>
							</div>

							<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
								<SmsCreditCard />
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
												{t("addon_price_label")}
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
										{t("addon_enterprise_tag")}
									</div>
									<h4 className="text-lg font-bold text-white mb-2">
										{t("addon_enterprise_title")}
									</h4>
									<p className="text-sm text-slate-300 mb-4 leading-relaxed">
										{t("addon_enterprise_desc")}
									</p>
									<div className="pt-4 border-t border-slate-700">
										<p className="text-sm font-semibold text-slate-400 mb-1">
											{t("addon_price_label")}
										</p>
										<p className="text-base font-bold text-white">
											{t("addon_enterprise_price")}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* ─── Customers ─── */}
				<section
					id="customers"
					className="mx-auto w-full max-w-7xl px-6 py-[7.5rem] scroll-mt-16"
				>
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
							{t("customers_heading")}
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

				{/* ─── Contact ─── */}
				<section
					id="contact"
					className="bg-white px-6 py-[7.5rem] scroll-mt-16"
				>
					<div className="mx-auto w-full max-w-7xl">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-slate-900 md:text-5xl mb-4">
								{t("contact_heading")}
							</h2>
							<p className="text-xl text-slate-600">
								{t("contact_subheading")}
							</p>
						</div>

						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto mb-16">
							{contacts.map((contact) => (
								<a
									key={contact.phone}
									href={contact.href}
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
														aria-hidden="true"
													>
														<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
													</svg>
												</div>
											</div>
										</div>
										<p className="text-xs font-semibold text-slate-500 mb-2">
											{contact.name}
										</p>
										<p className="text-lg font-black text-slate-900 direction-ltr mb-3">
											{contact.phone}
										</p>
										<div className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold">
											<span>{t("contact_whatsapp")}</span>
											<svg
												className="h-4 w-4 group-hover:translate-x-1 transition-transform"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												aria-hidden="true"
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
							))}
						</div>
					</div>
				</section>
			</main>

			<PublicFooter />
		</div>
	);
}
