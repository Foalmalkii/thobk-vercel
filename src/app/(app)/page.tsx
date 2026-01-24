"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	BarChart3,
	TrendingUp,
	DollarSign,
	Users,
	Calendar,
	Sparkles,
	Cloud,
	Zap,
	Eye,
	Clock,
	Package,
	ShoppingBag,
	ArrowUpRight,
	Activity,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { RiyalIcon } from "@/components/ui/icons";

export default function Home() {
	const t = useTranslations("insights");

	// Sample preview data
	const metrics = [
		{
			title: t("metric_1.title"),
			value: "45",
			change: "+12%",
			trend: "up",
			icon: ShoppingBag,
			color: "from-blue-500 to-cyan-500",
		},
		{
			title: t("metric_2.title"),
			value: "128,450",
			change: "+8%",
			trend: "up",
			icon: RiyalIcon,
			color: "from-green-500 to-emerald-500",
		},
		{
			title: t("metric_3.title"),
			value: "1,247",
			change: "+25%",
			trend: "up",
			icon: Users,
			color: "from-purple-500 to-pink-500",
		},
		{
			title: t("metric_4.title"),
			value: "18",
			change: "0%",
			trend: "neutral",
			icon: Package,
			color: "from-orange-500 to-red-500",
		},
	];

	const features = [
		{ icon: Cloud, text: t("feature_1") },
		{ icon: Zap, text: t("feature_2") },
		{ icon: Eye, text: t("feature_3") },
		{ icon: Clock, text: t("feature_4") },
	];

	return (
		<div className="space-y-8 p-6" dir="rtl">
			{/* Hero Header */}
			<Card className="border-none bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
				{/* Decorative elements */}
				<div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

				<CardContent className="relative flex flex-col items-center text-center gap-6 py-16 px-6">
					<div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl shadow-lg shadow-blue-500/20">
						<BarChart3 className="w-12 h-12 text-white" strokeWidth={2.5} />
					</div>

					<div className="space-y-4 max-w-3xl">
						<div className="flex items-center justify-center gap-2 mb-2">
							<Sparkles className="w-5 h-5 text-blue-400" />
							<Badge className="bg-blue-400/20 text-blue-300 border-blue-400/30 font-medium">
								{t("coming_soon")}
							</Badge>
						</div>

						<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
							{t("title")}
						</h1>

						<p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
							{t("description")}
						</p>
					</div>

					<div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
						<Calendar className="w-5 h-5" />
						<span className="font-medium">{t("launch_date")}</span>
					</div>

					{/* Feature Pills */}
					<div className="flex flex-wrap gap-3 justify-center mt-4">
						{features.map((feature, index) => (
							<div
								key={index}
								className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium"
							>
								<feature.icon className="w-4 h-4" />
								{feature.text}
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Metrics Preview */}
			<div className="space-y-5">
				<div className="flex items-center gap-3">
					<div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg shadow-sm">
						<Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
					</div>
					<div>
						<h2 className="text-2xl font-bold text-slate-900">
							{t("preview_title")}
						</h2>
						<p className="text-sm text-slate-600">{t("preview_subtitle")}</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{metrics.map((metric, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group border-slate-200"
						>
							{/* Gradient overlay */}
							<div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity from-current to-transparent" />

							<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
								<CardTitle className="text-sm font-medium text-slate-600">
									{metric.title}
								</CardTitle>
								<div
									className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} p-2 shadow-sm`}
								>
									<metric.icon
										className="w-full h-full text-white"
										strokeWidth={2}
									/>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="text-3xl font-bold text-slate-900 tabular-nums">
										{metric.value}
									</div>
									<div className="flex items-center gap-2">
										{metric.trend === "up" && (
											<div className="flex items-center gap-1 text-green-600 text-sm font-medium">
												<ArrowUpRight className="w-4 h-4" />
												{metric.change}
											</div>
										)}
										{metric.trend === "neutral" && (
											<div className="text-slate-500 text-sm font-medium">
												{metric.change}
											</div>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Capabilities Grid */}
			<div className="space-y-5">
				<div className="flex items-center gap-3">
					<div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg shadow-sm">
						<Eye className="w-5 h-5 text-white" strokeWidth={2.5} />
					</div>
					<div>
						<h2 className="text-2xl font-bold text-slate-900">
							{t("capabilities_title")}
						</h2>
						<p className="text-sm text-slate-600">
							{t("capabilities_subtitle")}
						</p>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-4">
					{[
						{
							icon: TrendingUp,
							title: t("capability_1.title"),
							desc: t("capability_1.desc"),
						},
						{
							icon: Users,
							title: t("capability_2.title"),
							desc: t("capability_2.desc"),
						},
						{
							icon: Package,
							title: t("capability_3.title"),
							desc: t("capability_3.desc"),
						},
						{
							icon: Clock,
							title: t("capability_4.title"),
							desc: t("capability_4.desc"),
						},
					].map((capability, index) => (
						<Card
							key={index}
							className="border-slate-200 hover:shadow-md transition-all group"
						>
							<CardContent className="p-6 flex items-start gap-4">
								<div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 transition-colors">
									<capability.icon
										className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors"
										strokeWidth={2}
									/>
								</div>
								<div className="flex-1">
									<h3 className="font-semibold text-slate-900 mb-1">
										{capability.title}
									</h3>
									<p className="text-sm text-slate-600 leading-relaxed">
										{capability.desc}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Footer CTA */}
			<Card className="border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50">
				<CardContent className="py-10 text-center space-y-4">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
						<Sparkles className="w-4 h-4" />
						{t("footer_badge")}
					</div>
					<p className="text-slate-700 font-medium text-lg max-w-2xl mx-auto">
						{t("footer_message")}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
