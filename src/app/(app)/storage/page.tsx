"use client";

import { Loader2, Package, PlusCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { useListStock } from "@/hooks/stock/listStock";
import { AddFabricDialog } from "../orders/[orderId]/edit/components/AddFabricDialog";
import { StockTable } from "./components/StocksTable";

export default function StoragePage() {
	const t = useTranslations("storage");
	const { isInBranch } = useAuth({ middleware: "auth" });
	const { stock, currentPage, totalItems, loadingStock, mutateStock } =
		useListStock();

	if (loadingStock) {
		return (
			<div className="flex items-center justify-center h-64 bg-gray-50">
				<Loader2 className="w-5 h-5 animate-spin text-gray-400" />
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6 bg-white min-h-full shadow-sm">
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
					<Package className="w-5 h-5 text-white" />
				</div>
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-gray-900">
						{t("stock_management")}
					</h1>
					<p className="mt-0.5 text-sm text-gray-500">
						{t("stock_management_subtitle")}
					</p>
				</div>
			</div>

			<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
				<div className="flex items-center justify-between px-6 py-3.5 bg-gray-50 border-b border-gray-200">
					<p className="text-sm font-semibold text-gray-900">
						{t("stock_list")}
					</p>
					<AddFabricDialog
						onFabricCreated={() => mutateStock()}
						action={
							<Button size="sm">
								<PlusCircleIcon className="w-4 h-4" />
								{t("add_item")}
							</Button>
						}
					/>
				</div>
				<StockTable branchId={isInBranch} stock={stock} />
			</div>

			<Pagination
				currentPage={currentPage}
				totalItems={totalItems}
				itemsPerPage={20}
			/>
		</div>
	);
}
