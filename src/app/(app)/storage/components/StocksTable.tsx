// app/(app)/storage/components/StockTable.tsx
"use client";

import { Package, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
			<div className="py-16 text-center">
				<div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
					<Package className="w-8 h-8 text-slate-400" />
				</div>
				<p className="text-slate-600 font-medium">{t("no_stock")}</p>
				<p className="text-sm text-slate-500 mt-1">{t("add_first_stock")}</p>
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
			<Badge variant={variants[type] || "outline"}>{t(`type_${type}`)}</Badge>
		);
	};

	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-slate-50 hover:bg-slate-50">
					<TableHead className="text-slate-700 font-semibold">#</TableHead>
					<TableHead className="text-slate-700 font-semibold">
						{t("name")}
					</TableHead>
					<TableHead className="text-slate-700 font-semibold">
						{t("type")}
					</TableHead>
					<TableHead className="text-slate-700 font-semibold">
						{t("color")}
					</TableHead>
					<TableHead className="text-slate-700 font-semibold">
						{t("supplier")}
					</TableHead>
					<TableHead className="text-slate-700 font-semibold  text-center">
						{t("remaining_meters")}
					</TableHead>
					<TableHead className="text-slate-700 font-semibold text-center">
						{t("actions")}
					</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{stock.map((item) => (
					<TableRow
						key={item.id}
						className="hover:bg-slate-50 transition-colors"
					>
						<TableCell className="font-medium text-slate-600 text-center">
							{item.id}
						</TableCell>
						<TableCell className="font-medium text-slate-900 text-center">
							{item.name}
						</TableCell>
						<TableCell className="text-center">
							{getTypeBadge(item.type)}
						</TableCell>
						<TableCell>
							<div className="flex items-center text-center gap-2 justify-center">
								{item.colorCode && (
									<div
										className="w-4 h-4 rounded-full border border-slate-300  text-center"
										style={{ backgroundColor: item.colorCode }}
									/>
								)}
								<span className="text-slate-700 ">{item.color}</span>
							</div>
						</TableCell>
						<TableCell className="text-slate-700  text-center">
							{item.supplier}
						</TableCell>
						<TableCell className="text-right font-mono text-slate-900  text-center">
							{item.remainingMeters !== null
								? `${item.remainingMeters.toFixed(2)} m`
								: "N/A"}
						</TableCell>
						<TableCell className="text-center">
							<AddBatchesDialog stockId={item.id} branchId={branchId} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
