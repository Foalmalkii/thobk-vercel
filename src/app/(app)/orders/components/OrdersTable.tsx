import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { listOrderResponse } from "@/hooks/orders/listOrders";
import React from "react";
import { OrderStatusDropdown } from "./OrderStatusDropdown";
import { OrderOperationsDropdown } from "./OrderOperationsDropdown";
import { useGetBranch } from "@/hooks/branches/getBranch";
import { useTranslations } from "next-intl";

export const OrdersTable = ({
	orders,
	branchId,
}: {
	orders: listOrderResponse | undefined;
	branchId: number;
}) => {
	const t = useTranslations("orders");
	const { branch } = useGetBranch({ branchId });

	return (
		<div>
			<Table className="bg-slate-50">
				<TableHeader>
					<TableRow>
						<TableHead className="text-black">{t("order_id")}</TableHead>
						<TableHead className="text-black">{t("customer")}</TableHead>
						<TableHead className="text-black">{t("order_status")}</TableHead>
						<TableHead className="text-black">{t("order_date")}</TableHead>
						<TableHead className="text-black">{t("actions")}</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody className="text-center">
					{orders?.map((order) => (
						<TableRow key={order.id}>
							<TableCell>#{order.id}</TableCell>

							<TableCell>
								<div className="flex flex-col gap-1">
									<span>{order.customer.name}</span>
									<span className="text-muted-foreground">
										{order.customer.phone}
									</span>
								</div>
							</TableCell>

							<TableCell>
								<div className="max-w-[200px] mx-auto">
									<OrderStatusDropdown defaultValue={order.status} />
								</div>
							</TableCell>

							<TableCell>
								<span className="text-muted-foreground">{order.dueDate}</span>
							</TableCell>

							<TableCell>
								<OrderOperationsDropdown orderId={order.id} branch={branch} />
							</TableCell>
						</TableRow>
					))}

					{orders?.length === 0 && (
						<TableRow>
							<TableCell colSpan={5}>
								<div className="p-2 text-muted-foreground">
									{t("no_orders")}
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};
