"use client";

import { Package, PlusCircle, ArrowRight, Boxes } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
	const t = useTranslations("home");

	const navigationCards = [
		{
			title: t("new_order"),
			description: t("new_order_description"),
			icon: PlusCircle,
			href: "/orders/create",
			gradient: "from-slate-900 to-slate-700",
		},
		{
			title: t("previous_orders"),
			description: t("previous_orders_description"),
			icon: Package,
			href: "/orders",
			gradient: "from-slate-800 to-slate-600",
		},
		{
			title: t("stock_management"),
			description: t("stock_management_description"),
			icon: Boxes,
			href: "/storage",
			gradient: "from-slate-800 to-slate-600",
		},
	];

	return (
		<div className="min-h-screen bg-zinc-100 p-6">
			<div className="max-w-6xl mx-auto space-y-8">
				{/* Header */}
				<div className="text-center space-y-2 py-8">
					<h1 className="text-4xl font-bold text-slate-900">{t("welcome")}</h1>
					<p className="text-lg text-slate-600">{t("select_action")}</p>
				</div>

				{/* Navigation Cards */}
				<div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
					{navigationCards.map((card, index) => {
						const Icon = card.icon;
						return (
							<Link key={index} href={card.href}>
								<Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-slate-900 h-full">
									<CardContent className="p-0">
										<div
											className={`bg-gradient-to-br ${card.gradient} p-8 rounded-t-lg`}
										>
											<div className="flex items-center justify-center">
												<div className="w-24 h-24 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
													<Icon
														className="w-12 h-12 text-slate-900"
														strokeWidth={2}
													/>
												</div>
											</div>
										</div>

										<div className="bg-white p-8 rounded-b-lg">
											<div className="text-center space-y-3">
												<h2 className="text-2xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
													{card.title}
												</h2>
												<p className="text-slate-600 text-base">
													{card.description}
												</p>

												<div className="pt-4">
													<div className="inline-flex items-center gap-2 text-slate-900 font-semibold group-hover:gap-4 transition-all">
														<span>{t("get_started")}</span>
														<ArrowRight className="w-5 h-5" />
													</div>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
