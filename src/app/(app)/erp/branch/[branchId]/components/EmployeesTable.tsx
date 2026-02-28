"use client";

import { Users } from "lucide-react";
import { useTranslations } from "next-intl";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Employee } from "@/hooks/employees/listEmployees";

interface EmployeesTableProps {
	employees: Employee[];
}

export const EmployeesTable = ({ employees }: EmployeesTableProps) => {
	const t = useTranslations("erp");

	if (!employees || employees.length === 0) {
		return (
			<div className="py-16 flex flex-col items-center gap-3">
				<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
					<Users className="w-5 h-5 text-gray-400" />
				</div>
				<div className="text-center">
					<p className="text-sm font-medium text-gray-900">{t("no_employees")}</p>
					<p className="text-xs text-gray-500 mt-0.5">{t("no_employees_subtitle")}</p>
				</div>
			</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-white hover:bg-white border-b border-gray-100">
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("employee_name")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("employee_phone")}
					</TableHead>
					<TableHead className="h-10 text-center text-xs font-medium text-gray-400">
						{t("employee_email")}
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{employees.map((employee) => (
					<TableRow
						key={employee.email}
						className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
					>
						<TableCell className="text-center text-sm font-medium text-gray-900 py-4">
							{employee.name}
						</TableCell>
						<TableCell className="text-center text-sm text-gray-500 py-4">
							{employee.phone}
						</TableCell>
						<TableCell className="text-center text-sm text-gray-500 py-4">
							{employee.email}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
