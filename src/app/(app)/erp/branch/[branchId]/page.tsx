"use client";

import { ArrowLeftIcon, Loader2, Users } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useListEmployees } from "@/hooks/employees/listEmployees";
import { AddEmployeeDialog } from "./components/AddEmployeeDialog";
import { EmployeesTable } from "./components/EmployeesTable";

interface BranchEmployeesPageProps {
	params: { branchId: string };
}

export default function BranchEmployeesPage({ params }: BranchEmployeesPageProps) {
	const t = useTranslations("erp");
	const branchId = Number(params.branchId);

	const { employees, loadingEmployees, mutateEmployees } = useListEmployees({ branchId });

	if (loadingEmployees) {
		return (
			<div className="flex items-center justify-center h-64 bg-gray-50">
				<Loader2 className="w-5 h-5 animate-spin text-gray-400" />
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6 bg-white min-h-full shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
						<Users className="w-5 h-5 text-white" />
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight text-gray-900">
							{t("employees_list")}
						</h1>
						<p className="mt-0.5 text-sm text-gray-500">
							{t("employees_list_subtitle")}
						</p>
					</div>
				</div>
				<Button variant="outline" size="sm" asChild>
					<Link href="/erp">
						<ArrowLeftIcon className="w-4 h-4" />
						{t("back_to_branches")}
					</Link>
				</Button>
			</div>

			<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
				<div className="flex items-center justify-between px-6 py-3.5 bg-gray-50 border-b border-gray-200">
					<p className="text-sm font-semibold text-gray-900">
						{t("employees_list")}
					</p>
					<AddEmployeeDialog
						branchId={branchId}
						onCreated={() => mutateEmployees()}
					/>
				</div>
				<EmployeesTable employees={employees ?? []} />
			</div>
		</div>
	);
}
