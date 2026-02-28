"use client";

import { Building2, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
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
import type { GetBranch } from "@/lib/types";

export interface BranchWithType extends GetBranch {
	branchType: "store" | "factory";
}

interface BranchesTableProps {
	branches: BranchWithType[];
}

export const BranchesTable = ({ branches }: BranchesTableProps) => {
	const t = useTranslations("erp");

	if (!branches || branches.length === 0) {
		return (
			<div className="py-16 flex flex-col items-center gap-3">
				<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
					<Building2 className="w-5 h-5 text-gray-400" />
				</div>
				<p className="text-sm font-medium text-gray-900">{t("no_branches")}</p>
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
						{t("branch_name")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("phone")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("type")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("actions")}
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{branches.map((branch) => (
					<TableRow
						key={`${branch.branchType}-${branch.id}`}
						className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
					>
						<TableCell className="text-center text-sm text-gray-400 py-4">
							{branch.id}
						</TableCell>
						<TableCell className="text-center text-sm font-medium text-gray-900 py-4">
							{branch.name}
						</TableCell>
						<TableCell className="text-center text-sm text-gray-500 py-4">
							{branch.phone}
						</TableCell>
						<TableCell className="text-center py-4">
							<Badge
								variant={branch.branchType === "factory" ? "secondary" : "outline"}
								className="text-xs"
							>
								{branch.branchType === "factory" ? t("type_factory") : t("type_store")}
							</Badge>
						</TableCell>
						<TableCell className="text-center py-4">
							<Button variant="outline" size="sm" asChild>
								<Link href={`/erp/branch/${branch.id}`}>
									<UsersIcon className="w-3.5 h-3.5" />
									{t("manage_employees")}
								</Link>
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
