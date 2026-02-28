"use client";

import { Factory, LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
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
import { AssignBranchDialog } from "./AssignBranchDialog";
import { ListAssociatedBranchesDialog } from "./ListAssociatedBranchesDialog";

interface FactoriesTableProps {
	factories: GetBranch[];
	onMutate?: () => void;
}

export const FactoriesTable = ({ factories, onMutate }: FactoriesTableProps) => {
	const t = useTranslations("factory");
	const [viewFactory, setViewFactory] = useState<GetBranch | null>(null);
	const [assignFactory, setAssignFactory] = useState<GetBranch | null>(null);

	if (!factories || factories.length === 0) {
		return (
			<div className="py-16 flex flex-col items-center gap-3">
				<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
					<Factory className="w-5 h-5 text-gray-400" />
				</div>
				<div className="text-center">
					<p className="text-sm font-medium text-gray-900">{t("no_factories")}</p>
					<p className="text-xs text-gray-500 mt-0.5">{t("no_factories_subtitle")}</p>
				</div>
			</div>
		);
	}

	return (
		<>
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
							{t("associated_branches")}
						</TableHead>
						<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
							{t("actions")}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{factories.map((factory) => (
						<TableRow
							key={factory.id}
							className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
						>
							<TableCell className="text-center text-sm text-gray-400 py-4">
								{factory.id}
							</TableCell>
							<TableCell className="text-center text-sm font-medium text-gray-900 py-4">
								{factory.name}
							</TableCell>
							<TableCell className="text-center text-sm text-gray-500 py-4">
								{factory.phone}
							</TableCell>
							<TableCell className="text-center py-4">
								<button
									type="button"
									onClick={() => setViewFactory(factory)}
									className="text-sm text-gray-700 underline underline-offset-4 hover:text-gray-900 transition-colors"
								>
									{t("view_branches")}
								</button>
							</TableCell>
							<TableCell className="text-center py-4">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setAssignFactory(factory)}
								>
									<LinkIcon className="w-3.5 h-3.5" />
									{t("assign_branch")}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{viewFactory && (
				<ListAssociatedBranchesDialog
					factoryId={viewFactory.id}
					factoryName={viewFactory.name}
					open={!!viewFactory}
					onOpenChange={(open) => {
						if (!open) setViewFactory(null);
					}}
				/>
			)}

			{assignFactory && (
				<AssignBranchDialog
					factoryId={assignFactory.id}
					factoryName={assignFactory.name}
					open={!!assignFactory}
					onOpenChange={(open) => {
						if (!open) setAssignFactory(null);
					}}
					onAssigned={() => {
						setAssignFactory(null);
						onMutate?.();
					}}
				/>
			)}
		</>
	);
};
