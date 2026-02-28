"use client";

import { Building2, Loader2, Store } from "lucide-react";
import { useTranslations } from "next-intl";
import { useListBranches } from "@/hooks/branches/listBranches";
import { BranchesTable } from "./components/BranchesTable";

export default function ERPPage() {
	const t = useTranslations("erp");

	const { branches: storeBranches, loadingBranches: loadingStore } =
		useListBranches({ type: "store" });
	const { branches: factoryBranches, loadingBranches: loadingFactory } =
		useListBranches({ type: "factory" });

	const loading = loadingStore || loadingFactory;

	const allBranches = [
		...(storeBranches ?? []).map((b) => ({ ...b, branchType: "store" as const })),
		...(factoryBranches ?? []).map((b) => ({ ...b, branchType: "factory" as const })),
	];

	if (loading) {
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
					<Building2 className="w-5 h-5 text-white" />
				</div>
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-gray-900">
						{t("all_branches")}
					</h1>
					<p className="mt-0.5 text-sm text-gray-500">
						{t("all_branches_subtitle")}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 flex items-center gap-4">
					<div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
						<Building2 className="w-4 h-4 text-white" />
					</div>
					<div>
						<p className="text-2xl font-bold text-gray-900">{allBranches.length}</p>
						<p className="text-xs text-gray-500 mt-0.5">{t("total_branches")}</p>
					</div>
				</div>
				<div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 flex items-center gap-4">
					<div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
						<Store className="w-4 h-4 text-white" />
					</div>
					<div>
						<p className="text-2xl font-bold text-gray-900">{storeBranches?.length ?? 0}</p>
						<p className="text-xs text-gray-500 mt-0.5">{t("total_stores")}</p>
					</div>
				</div>
				<div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 flex items-center gap-4">
					<div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
						<Building2 className="w-4 h-4 text-white" />
					</div>
					<div>
						<p className="text-2xl font-bold text-gray-900">{factoryBranches?.length ?? 0}</p>
						<p className="text-xs text-gray-500 mt-0.5">{t("total_factories")}</p>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
				<div className="flex items-center justify-between px-6 py-3.5 bg-gray-50 border-b border-gray-200">
					<p className="text-sm font-semibold text-gray-900">
						{t("all_branches")}
					</p>
				</div>
				<BranchesTable branches={allBranches} />
			</div>
		</div>
	);
}
