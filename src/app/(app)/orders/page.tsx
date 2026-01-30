"use client";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import { SearchInput } from "@/components/forms/search-input";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { useListOrders } from "@/hooks/orders/listOrders";
import { OrdersTable } from "./components/OrdersTable";
import { OrdersFilter } from "./create/components/OrdersFilter";

export default function OrdersPage() {
	const t = useTranslations("orders");
	const { orders, loadingOrders, currentPage, totalItems } = useListOrders();
	const { isInBranch } = useAuth({ middleware: "auth" });

	if (loadingOrders) return <div className="p-8">Loading...</div>;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="font-size-2xl font-semibold">{t("orders")}</h1>
				<p className="mt-4 font-size-md text-slate-600">
					{t("page_description")}
				</p>
			</div>

			<div className="flex justify-between items-center gap-4"></div>

			{/* Filters */}

			{/* Orders Table */}
			<div className="flex flex-col gap-2">
				<div className="flex w-full justify-end gap-2">
					{" "}
					<OrdersFilter />
					<Link href={"/orders/create"}>
						<Button>
							{t("new_order")}
							<PlusCircleIcon />{" "}
						</Button>
					</Link>
				</div>
				<OrdersTable orders={orders} branchId={isInBranch} />
			</div>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalItems={totalItems}
				itemsPerPage={20}
			/>
		</div>
	);
}
