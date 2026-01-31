// app/(app)/orders/create/components/CustomersTable.tsx
"use client";

import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { customer } from "@/lib/types";

interface CustomersTableProps {
	customers: customer[];
}

export const CustomersTable = ({ customers }: CustomersTableProps) => {
	const t = useTranslations("orders");

	if (!customers || customers.length === 0) {
		return (
			<div className="py-16 text-center">
				<div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
					<Users className="w-8 h-8 text-slate-400" />
				</div>
				<p className="text-slate-600 font-medium">{t("no_customers")}</p>
				<p className="text-sm text-slate-500 mt-1">{t("add_first_customer")}</p>
			</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-slate-50 hover:bg-slate-50">
					<TableHead className="text-slate-700 font-semibold">#</TableHead>
					<TableHead className="text-slate-700 font-semibold">
						{t("customer_name")}
					</TableHead>
					<TableHead className="text-slate-700 font-semibold">
						{t("phone_number")}
					</TableHead>
					<TableHead className="text-slate-700 font-semibold text-center">
						{t("select")}
					</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{customers.map((customer, index: number) => (
					<TableRow
						key={customer.id}
						className="hover:bg-slate-50 transition-colors"
					>
						<TableCell className="font-medium text-slate-600 text-center">
							{customer.id}
						</TableCell>
						<TableCell className="font-medium text-slate-900 text-center">
							{customer.name}
						</TableCell>
						<TableCell className="text-slate-700 font-mono text-center">
							{customer.phone}
						</TableCell>
						<TableCell className="text-center">
							<Link href={`/orders/create/customer/${customer.id}`}>
								<Button
									size="sm"
									variant="outline"
									className="gap-2 hover:bg-slate-900 hover:text-white border-slate-300"
								>
									{t("select")}
									<ArrowRight className="w-4 h-4" />
								</Button>
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
