"use client";

import {
	Calendar,
	DollarSign,
	Package,
	ShoppingBag,
	Sparkles,
	Star,
	TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
	const t = useTranslations("storage");

	// Sample sneak peek data
	const fabrics = [
		{
			name: t("fabric_1.name"),
			sku: "ST-AX92",
			orders: 124,
			revenue: 18600,
			season: t("winter"),
			mostOrdered: true,
		},
		{
			name: t("fabric_2.name"),
			sku: "KT-LX11",
			orders: 98,
			revenue: 14200,
			season: t("summer"),
			mostOrdered: false,
		},
		{
			name: t("fabric_3.name"),
			sku: "RM-QX77",
			orders: 76,
			revenue: 11450,
			season: t("summer"),
			mostOrdered: false,
		},
	];

	return (
		<div className="space-y-8 p-6" dir="rtl">
			{/* Hero Header */}
			<Card className="border-none bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
				{/* Decorative elements */}
				<div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

				<CardContent className="relative flex flex-col items-center text-center gap-6 py-16 px-6">
					<div className="bg-gradient-to-br from-blue-500 to-purple-600 p-5 rounded-2xl shadow-lg shadow-blue-500/20">
						<Package className="w-10 h-10 text-white" strokeWidth={2.5} />
					</div>

					<div className="space-y-3 max-w-2xl">
						<h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
							{t("title")}
						</h1>

						<p className="text-slate-300 text-lg leading-relaxed">
							{t("description")}
						</p>
					</div>

					<div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
						<Calendar className="w-4 h-4" />
						<span className="text-sm font-medium">{t("launch_date")}</span>
					</div>

					{/* Feature Pills */}
					<div className="flex flex-wrap gap-3 justify-center mt-4">
						<div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs font-medium flex items-center gap-2">
							<Sparkles className="w-3.5 h-3.5" />
							{t("feature_1")}
						</div>
						<div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs font-medium flex items-center gap-2">
							<TrendingUp className="w-3.5 h-3.5" />
							{t("feature_2")}
						</div>
						<div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs font-medium flex items-center gap-2">
							<ShoppingBag className="w-3.5 h-3.5" />
							{t("feature_3")}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Sneak Peek Section */}
			<div className="space-y-5">
				<div className="flex items-center gap-3">
					<div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg shadow-sm">
						<TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
					</div>
					<div>
						<h2 className="text-2xl font-bold text-slate-900">
							{t("sneak_peek")}
						</h2>
						<p className="text-sm text-slate-600">{t("sneak_peek_subtitle")}</p>
					</div>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{fabrics.map((fabric, index) => (
						<Card
							key={index}
							className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group border-slate-200"
						>
							{/* Gradient overlay on hover */}
							<div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-300" />

							{/* Badges */}
							<div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
								{fabric.mostOrdered && (
									<Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 border-0 shadow-lg shadow-yellow-500/30 flex items-center gap-1.5 px-3 py-1">
										<Star className="w-3.5 h-3.5 fill-slate-900" />
										<span className="font-semibold">{t("most_ordered")}</span>
									</Badge>
								)}
								<Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg shadow-blue-500/30 px-3 py-1 font-medium mr-auto">
									{fabric.season}
								</Badge>
							</div>

							<CardHeader className="pt-16 pb-4">
								<CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
									{fabric.name}
								</CardTitle>
								<p className="text-sm text-slate-500 font-mono mt-1">
									{t("sku")}:{" "}
									<span className="font-semibold text-slate-700">
										{fabric.sku}
									</span>
								</p>
							</CardHeader>

							<CardContent className="space-y-3 relative">
								<div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
									<div className="flex items-center gap-2 text-slate-600">
										<ShoppingBag className="w-4 h-4" />
										<span className="text-sm font-medium">{t("orders")}</span>
									</div>
									<span className="text-lg font-bold text-slate-900">
										{fabric.orders}
									</span>
								</div>

								<div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50">
									<div className="flex items-center gap-2 text-green-700">
										<DollarSign className="w-4 h-4" />
										<span className="text-sm font-medium">{t("revenue")}</span>
									</div>
									<span className="text-lg font-bold text-green-700 tabular-nums">
										{fabric.revenue.toLocaleString()} ر.س
									</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Coming Soon Footer */}
			<Card className="border-dashed border-2 border-slate-300 bg-slate-50/50">
				<CardContent className="py-8 text-center">
					<p className="text-slate-600 font-medium">{t("footer_message")}</p>
				</CardContent>
			</Card>
		</div>
	);
}
