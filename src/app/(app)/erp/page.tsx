"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Building2,
	Users,
	Activity,
	Shield,
	Calendar,
	BarChart3,
	Settings,
	Eye,
	Clock,
	TrendingUp,
	Sparkles,
	GitBranch,
	UserCog,
	FileText,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

export default function ERPPage() {
	const t = useTranslations("erp");

	// Sample sneak peek data
	const features = [
		{
			title: t("feature_1.title"),
			description: t("feature_1.description"),
			icon: GitBranch,
			stats: "5 " + t("branches"),
			color: "from-blue-500 to-cyan-500",
			bgColor: "from-blue-50 to-cyan-50",
		},
		{
			title: t("feature_2.title"),
			description: t("feature_2.description"),
			icon: UserCog,
			stats: "12 " + t("tailors"),
			color: "from-purple-500 to-pink-500",
			bgColor: "from-purple-50 to-pink-50",
		},
		{
			title: t("feature_3.title"),
			description: t("feature_3.description"),
			icon: Activity,
			stats: t("real_time"),
			color: "from-orange-500 to-red-500",
			bgColor: "from-orange-50 to-red-50",
		},
	];

	const capabilities = [
		{ icon: Shield, text: t("capability_1") },
		{ icon: BarChart3, text: t("capability_2") },
		{ icon: Eye, text: t("capability_3") },
		{ icon: Settings, text: t("capability_4") },
		{ icon: Clock, text: t("capability_5") },
		{ icon: FileText, text: t("capability_6") },
	];

	return (
		<div className="space-y-8 p-6" dir="rtl">
			{/* Hero Header */}
			<Card className="border-none bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden relative">
				{/* Decorative elements */}
				<div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
				<div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
				<div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

				<CardContent className="relative flex flex-col items-center text-center gap-6 py-16 px-6">
					<div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/20 shadow-2xl">
						<Building2 className="w-12 h-12 text-white" strokeWidth={2.5} />
					</div>

					<div className="space-y-4 max-w-3xl">
						<div className="flex items-center justify-center gap-2 mb-2">
							<Sparkles className="w-5 h-5 text-yellow-400" />
							<Badge className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30 font-medium">
								{t("coming_soon")}
							</Badge>
						</div>

						<h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
							{t("title")}
						</h1>

						<p className="text-purple-100 text-lg leading-relaxed max-w-2xl mx-auto">
							{t("description")}
						</p>
					</div>

					<div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
						<Calendar className="w-5 h-5" />
						<span className="font-medium">{t("launch_date")}</span>
					</div>

					{/* Key Benefits */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
						{[
							{ icon: Users, label: t("benefit_1") },
							{ icon: GitBranch, label: t("benefit_2") },
							{ icon: BarChart3, label: t("benefit_3") },
							{ icon: Shield, label: t("benefit_4") },
						].map((benefit, index) => (
							<div
								key={index}
								className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
							>
								<benefit.icon className="w-6 h-6" />
								<span className="text-sm font-medium text-center">
									{benefit.label}
								</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Features Preview */}
			<div className="space-y-5">
				<div className="flex items-center gap-3">
					<div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-sm">
						<TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
					</div>
					<div>
						<h2 className="text-2xl font-bold text-slate-900">
							{t("features_title")}
						</h2>
						<p className="text-sm text-slate-600">{t("features_subtitle")}</p>
					</div>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{features.map((feature, index) => (
						<Card
							key={index}
							className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group border-slate-200"
						>
							{/* Gradient overlay */}
							<div
								className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
							/>

							<CardHeader className="relative">
								<div
									className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-4 shadow-lg`}
								>
									<feature.icon
										className="w-full h-full text-white"
										strokeWidth={2.5}
									/>
								</div>
								<CardTitle className="text-xl font-bold text-slate-900">
									{feature.title}
								</CardTitle>
								<p className="text-sm text-slate-600 mt-2">
									{feature.description}
								</p>
							</CardHeader>

							<CardContent className="relative">
								<div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
									<span className="text-sm font-medium text-slate-600">
										{t("current_usage")}
									</span>
									<Badge
										className={`bg-gradient-to-r ${feature.color} text-white border-0 font-semibold`}
									>
										{feature.stats}
									</Badge>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Capabilities Grid */}
			<div className="space-y-5">
				<div className="flex items-center gap-3">
					<div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2 rounded-lg shadow-sm">
						<Settings className="w-5 h-5 text-white" strokeWidth={2.5} />
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

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{capabilities.map((capability, index) => (
						<Card
							key={index}
							className="hover:shadow-md transition-all duration-200 border-slate-200 group"
						>
							<CardContent className="flex items-center gap-4 p-5">
								<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors">
									<capability.icon
										className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 transition-colors"
										strokeWidth={2}
									/>
								</div>
								<span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
									{capability.text}
								</span>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Footer CTA */}
			<Card className="border-2 border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50">
				<CardContent className="py-10 text-center space-y-4">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm">
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
