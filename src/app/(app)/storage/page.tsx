// app/(app)/storage/page.tsx
"use client";

import { Package, PlusCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useListStock } from "@/hooks/stock/listStock";
import { Pagination } from "@/components/Pagination";
import { StockTable } from "./components/StocksTable";
import { AddFabricDialog } from "../orders/[orderId]/edit/components/AddFabricDialog";
import { useAuth } from "@/hooks/auth";

export default function StoragePage() {
	const t = useTranslations("storage");
	const { isInBranch } = useAuth({ middleware: "auth" });
	const { stock, currentPage, totalItems, loadingStock, mutateStock } =
		useListStock();

	if (loadingStock) {
		return <div className="p-8">Loading...</div>;
	}

	return (
		<div className="space-y-6 p-6">
			{/* Header */}
			<div className="space-y-2">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
						<Package className="w-6 h-6 text-white" strokeWidth={2} />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-slate-900">
							{t("stock_management")}
						</h1>
						<p className="text-sm text-slate-600">
							{t("stock_management_subtitle")}
						</p>
					</div>
				</div>
			</div>

			{/* Add Stock Button */}
			<Card className="border-slate-200">
				<CardContent className="p-6">
					<div className="flex justify-end">
						<AddFabricDialog
							onFabricCreated={() => {
								mutateStock();
							}}
							action={
								<Button>
									Add Item <PlusCircleIcon />
								</Button>
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Stock Table */}
			<Card className="border-slate-200">
				<CardHeader className="border-b border-slate-200 bg-slate-50">
					<CardTitle className="text-lg font-semibold text-slate-900">
						{t("stock_list")}
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<StockTable branchId={isInBranch} stock={stock} />
				</CardContent>
			</Card>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalItems={totalItems}
				itemsPerPage={20}
			/>
		</div>
	);
}
