"use client";

import {
	Award,
	BarChart3,
	Calendar,
	Crown,
	Gift,
	Heart,
	Mail,
	MessageSquare,
	Phone,
	ShoppingBag,
	Sparkles,
	Star,
	Target,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomersPage() {
	const t = useTranslations("customers");

	// Sample top customers data
	const topCustomers = [
		{
			name: t("customer_1.name"),
			orders: 45,
			revenue: 67500,
			joinDate: "2023",
			tier: "vip",
			growth: "+12%",
		},
		{
			name: t("customer_2.name"),
			orders: 38,
			revenue: 52400,
			joinDate: "2024",
			tier: "gold",
			growth: "+25%",
		},
		{
			name: t("customer_3.name"),
			orders: 31,
			revenue: 44200,
			joinDate: "2023",
			tier: "gold",
			growth: "+8%",
		},
	];

	const features = [
		{
			title: t("feature_1.title"),
			description: t("feature_1.description"),
			icon: Users,
			color: "from-blue-500 to-cyan-500",
			bgColor: "from-blue-50 to-cyan-50",
		},
		{
			title: t("feature_2.title"),
			description: t("feature_2.description"),
			icon: MessageSquare,
			color: "from-green-500 to-emerald-500",
			bgColor: "from-green-50 to-emerald-50",
		},
		{
			title: t("feature_3.title"),
			description: t("feature_3.description"),
			icon: BarChart3,
			color: "from-purple-500 to-pink-500",
			bgColor: "from-purple-50 to-pink-50",
		},
	];

	const capabilities = [
		{ icon: Target, text: t("capability_1") },
		{ icon: Mail, text: t("capability_2") },
		{ icon: Phone, text: t("capability_3") },
		{ icon: Award, text: t("capability_4") },
		{ icon: Zap, text: t("capability_5") },
		{ icon: Gift, text: t("capability_6") },
	];

	return (
		<div className="space-y-8 p-6" dir="rtl">
			{/* Hero Header */}
			<Card className="border-none bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white overflow-hidden relative">
				{/* Decorative elements */}
				<div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
				<div className="absolute top-1/3 right-1/3 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />

				<CardContent className="relative flex flex-col items-center text-center gap-6 py-16 px-6">
					<div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/20 shadow-2xl">
						<Users className="w-12 h-12 text-white" strokeWidth={2.5} />
					</div>

					<div className="space-y-4 max-w-3xl">
						<div className="flex items-center justify-center gap-2 mb-2">
							<Sparkles className="w-5 h-5 text-emerald-400" />
							<Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30 font-medium">
								{t("coming_soon")}
							</Badge>
						</div>

						<h1 className="text-5xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
							{t("title")}
						</h1>

						<p className="text-emerald-100 text-lg leading-relaxed max-w-2xl mx-auto">
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
							{ icon: ShoppingBag, label: t("benefit_1") },
							{ icon: MessageSquare, label: t("benefit_2") },
							{ icon: BarChart3, label: t("benefit_3") },
							{ icon: Heart, label: t("benefit_4") },
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

			{/* Top Customers Preview */}
			<div className="space-y-5">
				<div className="flex items-center gap-3">
					<div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg shadow-sm">
						<Crown className="w-5 h-5 text-white" strokeWidth={2.5} />
					</div>
					<div>
						<h2 className="text-2xl font-bold text-slate-900">
							{t("top_customers_title")}
						</h2>
						<p className="text-sm text-slate-600">
							{t("top_customers_subtitle")}
						</p>
					</div>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{topCustomers.map((customer, index) => (
						<Card
							key={index}
							className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group border-slate-200"
						>
							{/* Gradient overlay */}
							<div
								className={`absolute inset-0 bg-gradient-to-br ${
									customer.tier === "vip"
										? "from-purple-50 to-pink-50"
										: "from-amber-50 to-yellow-50"
								} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
							/>

							{/* Rank Badge */}
							<div className="absolute top-4 left-4">
								<div
									className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
										index === 0
											? "bg-gradient-to-br from-yellow-400 to-amber-500"
											: index === 1
												? "bg-gradient-to-br from-slate-300 to-slate-400"
												: "bg-gradient-to-br from-orange-400 to-orange-500"
									}`}
								>
									{index + 1}
								</div>
							</div>

							{/* Tier Badge */}
							<div className="absolute top-4 right-4">
								<Badge
									className={`${
										customer.tier === "vip"
											? "bg-gradient-to-r from-purple-500 to-pink-500"
											: "bg-gradient-to-r from-amber-500 to-yellow-500"
									} text-white border-0 shadow-lg flex items-center gap-1.5 px-3 py-1`}
								>
									{customer.tier === "vip" ? (
										<Crown className="w-3.5 h-3.5" />
									) : (
										<Star className="w-3.5 h-3.5" />
									)}
									<span className="font-semibold">
										{customer.tier === "vip" ? t("vip") : t("gold")}
									</span>
								</Badge>
							</div>

							<CardHeader className="pt-16 pb-4 relative">
								<CardTitle className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
									{customer.name}
								</CardTitle>
								<p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
									<Calendar className="w-3.5 h-3.5" />
									{t("member_since")} {customer.joinDate}
								</p>
							</CardHeader>

							<CardContent className="space-y-3 relative">
								<div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
									<div className="flex items-center gap-2 text-slate-600">
										<ShoppingBag className="w-4 h-4" />
										<span className="text-sm font-medium">{t("orders")}</span>
									</div>
									<span className="text-lg font-bold text-slate-900">
										{customer.orders}
									</span>
								</div>

								<div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50">
									<div className="flex items-center gap-2 text-green-700">
										<TrendingUp className="w-4 h-4" />
										<span className="text-sm font-medium">{t("revenue")}</span>
									</div>
									<span className="text-lg font-bold text-green-700 tabular-nums">
										{customer.revenue.toLocaleString()} ر.س
									</span>
								</div>

								<div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-50 border border-blue-200/50">
									<TrendingUp className="w-4 h-4 text-blue-600" />
									<span className="text-sm font-bold text-blue-600">
										{t("growth")}: {customer.growth}
									</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Features Preview */}
			<div className="space-y-5">
				<div className="flex items-center gap-3">
					<div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg shadow-sm">
						<Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
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
						</Card>
					))}
				</div>
			</div>

			{/* Capabilities Grid */}
			<div className="space-y-5">
				<div className="flex items-center gap-3">
					<div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg shadow-sm">
						<Target className="w-5 h-5 text-white" strokeWidth={2.5} />
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
								<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-emerald-100 group-hover:to-teal-100 transition-colors">
									<capability.icon
										className="w-6 h-6 text-slate-600 group-hover:text-emerald-600 transition-colors"
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
			<Card className="border-2 border-dashed border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50">
				<CardContent className="py-10 text-center space-y-4">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm">
						<Heart className="w-4 h-4" />
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
