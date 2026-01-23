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
import { BoxIcon } from "lucide-react";
import React from "react";
import { OrderStatusDropdown } from "./OrderStatusDropdown";
import { OrderOperationsDropdown } from "./OrderOperationsDropdown";

export const OrdersTable = ({
	orders,
}: {
	orders: listOrderResponse | undefined;
}) => {
	return (
		<div>
			<Table className="bg-slate-50">
				<TableHeader>
					<TableRow>
						<TableHead className="text-black">معرف الطلب</TableHead>
						<TableHead className="text-black">العميل</TableHead>
						<TableHead className="text-black">حالة الطلب</TableHead>
						<TableHead className="text-black">تاريخ الطلب</TableHead>
						<TableHead className="text-black">الإجراءات</TableHead>
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
								<OrderOperationsDropdown />
							</TableCell>
						</TableRow>
					))}
					{orders?.length === 0 && (
						<TableRow>
							<TableCell colSpan={5}>
								<div className="p-2 text-muted-foreground">
									لا يوجد أي طلبات
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};
