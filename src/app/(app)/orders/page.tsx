"use client";
import { SearchInput } from "@/components/forms/search-input";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useListOrders } from "@/hooks/orders/listOrders";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { OrdersTable } from "./components/OrdersTable";
import { useAuth } from "@/hooks/auth";

export default function OrdersPage() {
	const t = useTranslations("orders");
	const { orders, loadingOrders } = useListOrders();
	const { isInBranch } = useAuth({ middleware: "auth" });

	if (loadingOrders) return <>Loading...</>;

	console.log(orders);
	return (
		<div>
			<h1 className="font-size-2xl font-semibold">{t("orders")}</h1>
			<p className="mt-4 font-size-md text-slate-600">
				{t("page_description")}
			</p>

			<div className="mt-8 flex justify-between">
				<SearchInput />{" "}
				<Link href={"/orders/create"}>
					<Button>{t("new_order")}</Button>
				</Link>
			</div>

			<div className=" mt-8">
				<OrdersTable orders={orders} />
			</div>
		</div>
	);
}
