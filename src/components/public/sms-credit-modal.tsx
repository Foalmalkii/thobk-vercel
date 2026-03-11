"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { SarIcon } from "@/components/ui/sar-icon";

const smsPricingTiers = [
	{ messages: "1,000", price: "200", perMessage: "0.200" },
	{ messages: "2,000", price: "350", perMessage: "0.175" },
	{ messages: "5,000", price: "550", perMessage: "0.110" },
	{ messages: "10,000", price: "950", perMessage: "0.095" },
	{ messages: "20,000", price: "1,650", perMessage: "0.083" },
	{ messages: "50,000", price: "3,500", perMessage: "0.070" },
	{ messages: "أكثر من 50,000", price: "تواصل معنا", perMessage: "-" },
];

export function SmsCreditCard() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div
				role="button"
				tabIndex={0}
				onClick={() => setOpen(true)}
				onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
				className="group relative rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-slate-900 hover:shadow-xl transition-all cursor-pointer"
			>
				<h4 className="text-lg font-bold text-slate-900 mb-2">
					رصيد رسائل SMS
				</h4>
				<p className="text-sm text-slate-600 mb-4 leading-relaxed">
					اشحن الرصيد حسب احتياجك لإشعارات العملاء.
				</p>
				<div className="pt-4 border-t border-slate-200">
					<p className="text-sm font-semibold text-slate-500 mb-1">السعر</p>
					<div className="flex items-center justify-between">
						<p className="text-base font-bold text-slate-900">حسب الاستخدام</p>
						<p className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors">
							عرض التفاصيل ←
						</p>
					</div>
				</div>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-lg" dir="rtl">
					<DialogHeader>
						<DialogTitle className="text-xl font-bold text-slate-900">
							أسعار رصيد رسائل SMS
						</DialogTitle>
					</DialogHeader>

					<p className="text-sm text-slate-500 -mt-2">
						اختر الحزمة التي تناسب حجم إشعاراتك — كلما زادت الكمية، انخفض سعر
						الرسالة.
					</p>

					<div className="overflow-hidden rounded-xl border border-slate-200 mt-2">
						<table className="w-full text-sm">
							<thead>
								<tr className="bg-slate-50 border-b border-slate-200">
									<th className="px-4 py-3 text-right font-semibold text-slate-600">
										عدد الرسائل
									</th>
									<th className="px-4 py-3 text-center font-semibold text-slate-600">
										السعر الإجمالي
									</th>
									<th className="px-4 py-3 text-center font-semibold text-slate-600">
										سعر الرسالة
									</th>
								</tr>
							</thead>
							<tbody>
								{smsPricingTiers.map((tier, index) => (
									<tr
										key={tier.messages}
										className={`border-b border-slate-100 last:border-0 ${
											index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
										}`}
									>
										<td className="px-4 py-3 font-semibold text-slate-900">
											{tier.messages} رسالة
										</td>
										<td className="px-4 py-3 text-slate-700 text-center">
											{tier.price}{" "}
											{tier.price !== "تواصل معنا" && <SarIcon className="h-3 w-auto text-slate-400" />}
										</td>
										<td className="px-4 py-3 text-slate-500 text-center">
											{tier.perMessage}{" "}
											{tier.perMessage !== "-" && <SarIcon className="h-3 w-auto text-slate-400" />}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<p className="text-xs text-red-800 font-bold text-center">
						صلاحية الرصيد هي سنة كاملة من تاريخ الشراء
					</p>
				</DialogContent>
			</Dialog>
		</>
	);
}
