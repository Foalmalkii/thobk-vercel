// app/(app)/storage/components/StockTable.tsx
"use client";

import { Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { StockItem } from "@/hooks/stock/listStock";
import { AddBatchesDialog } from "./AddBatchesDialog";

interface StockTableProps {
	stock: StockItem[];
	branchId: number;
}

export const StockTable = ({ stock, branchId }: StockTableProps) => {
	const t = useTranslations("storage");

	if (!stock || stock.length === 0) {
		return (
			<div className="py-16 flex flex-col items-center gap-3">
				<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
					<Package className="w-5 h-5 text-gray-400" />
				</div>
				<div className="text-center">
					<p className="text-sm font-medium text-gray-900">{t("no_stock")}</p>
					<p className="text-xs text-gray-500 mt-0.5">{t("add_first_stock")}</p>
				</div>
			</div>
		);
	}

	const getTypeBadge = (type: string) => {
		const variants: Record<string, "default" | "secondary" | "outline"> = {
			fabric: "default",
			accessory: "secondary",
			button: "outline",
		};

		return (
			<Badge variant={variants[type] || "outline"} className="text-xs">
				{t(`type_${type}`)}
			</Badge>
		);
	};

	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-white hover:bg-white border-b border-gray-100">
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400 w-16">
						#
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("name")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("type")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("color")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("supplier")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("remaining_meters")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("actions")}
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{stock.map((item) => (
					<TableRow
						key={item.id}
						className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
					>
						<TableCell className="text-center text-sm text-gray-400 py-4">
							{item.id}
						</TableCell>
						<TableCell className="text-center text-sm font-medium text-gray-900 py-4">
							{item.name}
						</TableCell>
						<TableCell className="text-center py-4">
							{getTypeBadge(item.type)}
						</TableCell>
						<TableCell className="text-center py-4">
							<div className="flex items-center justify-center gap-2">
								{item.colorCode && (
									<div
										className="w-3 h-3 rounded-full border border-gray-200 shrink-0"
										style={{ backgroundColor: item.colorCode }}
									/>
								)}
								<span className="text-sm text-gray-500">{item.color}</span>
							</div>
						</TableCell>
						<TableCell className="text-center text-sm text-gray-500 py-4">
							{item.supplier}
						</TableCell>
						<TableCell className="text-center font-mono text-sm text-gray-700 py-4">
							{item.remainingMeters !== null
								? `${item.remainingMeters.toFixed(2)} m`
								: "—"}
						</TableCell>
						<TableCell className="text-center py-4">
							<AddBatchesDialog stockId={item.id} branchId={branchId} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
