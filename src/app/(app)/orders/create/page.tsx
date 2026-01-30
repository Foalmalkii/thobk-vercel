"use client";
import { Plus, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { CreateCustomer } from "@/components/shared/create-customer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCustomers } from "@/hooks/customers";
import { CustomersFilter } from "./customer/[customerId]/_components/CustomerFilters";
import { CustomersTable } from "./customer/[customerId]/_components/CustomersTable";

export default function OrdersCreate() {
	const t = useTranslations("orders");
	const [openCreateCustomer, setOpenCreateCustomer] = useState<boolean>(false);

	const {
		customers,
		currentPage,
		totalItems,
		mutateCustomers,
		isLoadingCustomers,
	} = useCustomers();

	useEffect(() => {
		if (openCreateCustomer === false) mutateCustomers();
	}, [openCreateCustomer, mutateCustomers]);

	if (isLoadingCustomers) {
		return <div className="p-8">Loading...</div>;
	}

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
						<CustomersFilter />
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
					<CustomersTable customers={customers} />
				</CardContent>
			</Card>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalItems={totalItems}
				itemsPerPage={20}
			/>
		</div>
	);
}
