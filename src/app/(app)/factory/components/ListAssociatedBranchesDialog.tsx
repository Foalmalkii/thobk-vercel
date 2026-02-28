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
import { useListBranches } from "@/hooks/branches/listBranches";
import axios from "@/lib/axios";

interface ListAssociatedBranchesDialogProps {
	factoryId: number;
	factoryName: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const ListAssociatedBranchesDialog = ({
	factoryId,
	factoryName,
	open,
	onOpenChange,
}: ListAssociatedBranchesDialogProps) => {
	const t = useTranslations("factory");
	const [confirmId, setConfirmId] = useState<number | null>(null);
	const [unassigningId, setUnassigningId] = useState<number | null>(null);

	const { branches, loadingBranches, mutateBranches } = useListBranches({
		type: "store",
		factory: factoryId,
	});

	const handleUnassign = async (branchId: number) => {
		setUnassigningId(branchId);
		try {
			await axios.patch(`/api/v1/branch/factory/${branchId}`, {
				factoryId: null,
			});
			toast.success(t("unassign_success"));
			setConfirmId(null);
			mutateBranches();
		} catch {
			toast.error(t("unassign_error"));
		} finally {
			setUnassigningId(null);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{t("associated_branches")} — {factoryName}
					</DialogTitle>
				</DialogHeader>
				{loadingBranches ? (
					<div className="flex items-center justify-center py-8">
						<Loader2Icon className="w-5 h-5 animate-spin text-slate-400" />
					</div>
				) : !branches || branches.length === 0 ? (
					<p className="text-sm text-slate-500 text-center py-6">
						{t("no_branches_assigned")}
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
							{branches.map((branch) => (
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
										{confirmId === branch.id ? (
											<div className="flex items-center justify-center gap-2">
												<span className="text-sm text-slate-600">
													{t("unassign_confirm")}
												</span>
												<Button
													size="sm"
													variant="destructive"
													disabled={unassigningId === branch.id}
													onClick={() => handleUnassign(branch.id)}
												>
													{unassigningId === branch.id && (
														<Loader2Icon className="w-3 h-3 animate-spin" />
													)}
													{t("unassign_yes")}
												</Button>
												<Button
													size="sm"
													variant="outline"
													disabled={unassigningId === branch.id}
													onClick={() => setConfirmId(null)}
												>
													{t("unassign_no")}
												</Button>
											</div>
										) : (
											<Button
												size="sm"
												variant="outline"
												onClick={() => setConfirmId(branch.id)}
											>
												{t("unassign")}
											</Button>
										)}
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
