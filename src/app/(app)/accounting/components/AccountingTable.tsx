"use client";

import { DownloadIcon, ReceiptText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { AccountingReport } from "@/hooks/accounting/listAccounting";

interface AccountingTableProps {
	reports: AccountingReport[];
}

const statusStyles: Record<string, string> = {
	completed: "bg-green-50 text-green-700 ring-green-600/20",
	ready: "bg-green-50 text-green-700 ring-green-600/20",
	pending: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
	failed: "bg-red-50 text-red-700 ring-red-600/20",
};

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export const AccountingTable = ({ reports }: AccountingTableProps) => {
	const t = useTranslations("accounting");

	const statusLabel: Record<string, string> = {
		completed: t("status_completed"),
		ready: t("status_ready"),
		pending: t("status_pending"),
		failed: t("status_failed"),
	};

	if (!reports || reports.length === 0) {
		return (
			<div className="py-16 flex flex-col items-center gap-3">
				<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
					<ReceiptText className="w-5 h-5 text-gray-400" />
				</div>
				<div className="text-center">
					<p className="text-sm font-medium text-gray-900">{t("no_reports")}</p>
					<p className="text-xs text-gray-500 mt-0.5">{t("no_reports_subtitle")}</p>
				</div>
			</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-white hover:bg-white border-b border-gray-100">
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400 w-16">
						#
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("start_date")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("end_date")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("status")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("file")}
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{reports.map((report) => (
					<TableRow
						key={report.id}
						className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
					>
						<TableCell className="text-center text-sm text-gray-400 py-4">
							{report.id}
						</TableCell>
						<TableCell className="text-center text-sm text-gray-600 py-4">
							{formatDate(report.startDate)}
						</TableCell>
						<TableCell className="text-center text-sm text-gray-600 py-4">
							{formatDate(report.endDate)}
						</TableCell>
						<TableCell className="text-center py-4">
							<span
								className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[report.status] ?? statusStyles.pending}`}
							>
								{statusLabel[report.status] ?? report.status}
							</span>
						</TableCell>
						<TableCell className="text-center py-4">
							{report.path ? (
								<a href={report.path} target="_blank" rel="noopener noreferrer">
									<Button variant="outline" size="sm" className="gap-1.5">
										<DownloadIcon className="w-3.5 h-3.5" />
										{t("download")}
									</Button>
								</a>
							) : (
								<span className="text-sm text-gray-400">{t("no_file")}</span>
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
