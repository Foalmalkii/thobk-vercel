"use client";
import { ArrowRight, Plus, Search, Users } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { SearchInput } from "@/components/forms/search-input";
import { CreateCustomer } from "@/components/shared/create-customer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useCustomers } from "@/hooks/customers";

export default function OrdersCreate() {
	const t = useTranslations("orders");
	const [openCreateCustomer, setOpenCreateCustomer] = useState<boolean>(false);

	const { customers, mutateCustomers } = useCustomers();

	useEffect(() => {
		if (openCreateCustomer === false) mutateCustomers();
	}, [openCreateCustomer]);

	return (
		<div className="space-y-6 p-6">
			<CreateCustomer
				open={openCreateCustomer}
				setOpen={setOpenCreateCustomer}
			/>

			{/* Header */}
			<div className="space-y-2">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
						<Users className="w-6 h-6 text-white" strokeWidth={2} />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-slate-900">
							{t("choose_customer")}
						</h1>
						<p className="text-sm text-slate-600">
							{t("choose_customer_subtitle")}
						</p>
					</div>
				</div>
			</div>

			{/* Search and Add Section */}
			<Card className="border-slate-200">
				<CardContent className="p-6">
					<div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
						<div className="flex-1 relative">
							<SearchInput placeholder={t("search_by_phone")} />
						</div>
						<Button
							onClick={() => setOpenCreateCustomer(!openCreateCustomer)}
							className="bg-slate-900 hover:bg-slate-800 text-white gap-2 whitespace-nowrap"
						>
							<Plus className="w-5 h-5" />
							{t("new_customer")}
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Customers Table */}
			<Card className="border-slate-200">
				<CardHeader className="border-b border-slate-200 bg-slate-50">
					<CardTitle className="text-lg font-semibold text-slate-900">
						{t("customers_list")}
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					{customers && customers.length > 0 ? (
						<Table>
							<TableHeader>
								<TableRow className="bg-slate-50 hover:bg-slate-50">
									<TableHead className="text-slate-700 font-semibold">
										#
									</TableHead>
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
										key={index}
										className="hover:bg-slate-50 transition-colors"
									>
										<TableCell className="font-medium text-slate-600">
											{customer.id}
										</TableCell>
										<TableCell className="font-medium text-slate-900">
											{customer.name}
										</TableCell>
										<TableCell className="text-slate-700 font-mono">
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
					) : (
						<div className="py-16 text-center">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
								<Users className="w-8 h-8 text-slate-400" />
							</div>
							<p className="text-slate-600 font-medium">{t("no_customers")}</p>
							<p className="text-sm text-slate-500 mt-1">
								{t("add_first_customer")}
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
