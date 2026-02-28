"use client";

import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import axios from "@/lib/axios";
import { useListBranches } from "@/hooks/branches/listBranches";

interface AssignBranchDialogProps {
	factoryId: number;
	factoryName: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAssigned?: () => void;
}

export const AssignBranchDialog = ({
	factoryId,
	factoryName,
	open,
	onOpenChange,
	onAssigned,
}: AssignBranchDialogProps) => {
	const t = useTranslations("factory");
	const [assigningId, setAssigningId] = useState<number | null>(null);

	const { branches: storeBranches, loadingBranches } = useListBranches({
		type: "store",
		notFactory: factoryId,
	});

	const handleAssign = async (branchId: number) => {
		setAssigningId(branchId);
		try {
			await axios.patch(`/api/v1/branch/factory/${branchId}`, {
				factoryId,
			});
			toast.success(t("assign_success"));
			onAssigned?.();
			onOpenChange(false);
		} catch {
			toast.error(t("assign_error"));
		} finally {
			setAssigningId(null);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{t("assign_branch_to")} — {factoryName}
					</DialogTitle>
				</DialogHeader>

				{loadingBranches ? (
					<div className="flex items-center justify-center py-8">
						<Loader2Icon className="w-5 h-5 animate-spin text-slate-400" />
					</div>
				) : !storeBranches || storeBranches.length === 0 ? (
					<p className="text-sm text-slate-500 text-center py-6">
						{t("no_store_branches")}
					</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow className="bg-slate-50 hover:bg-slate-50">
								<TableHead className="text-slate-700 font-semibold text-center">
									#
								</TableHead>
								<TableHead className="text-slate-700 font-semibold text-center">
									{t("branch_name")}
								</TableHead>
								<TableHead className="text-slate-700 font-semibold text-center">
									{t("phone")}
								</TableHead>
								<TableHead className="text-slate-700 font-semibold text-center">
									{t("actions")}
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{storeBranches.map((branch) => (
								<TableRow key={branch.id} className="hover:bg-slate-50">
									<TableCell className="text-center text-slate-600">
										{branch.id}
									</TableCell>
									<TableCell className="text-center font-medium text-slate-900">
										{branch.name}
									</TableCell>
									<TableCell className="text-center text-slate-700">
										{branch.phone}
									</TableCell>
									<TableCell className="text-center">
										<Button
											size="sm"
											disabled={assigningId === branch.id}
											onClick={() => handleAssign(branch.id)}
										>
											{assigningId === branch.id ? (
												<Loader2Icon className="w-4 h-4 animate-spin" />
											) : null}
											{t("assign")}
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</DialogContent>
		</Dialog>
	);
};
