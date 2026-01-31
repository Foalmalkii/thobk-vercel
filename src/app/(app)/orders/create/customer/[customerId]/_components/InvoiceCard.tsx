import { CoinsIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { RiyalIcon } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { useCustomer } from "@/hooks/customer";
import type { orderRequest } from "../page";

export const InvoiceCard = ({ customerId }: { customerId: number }) => {
	const orderForm = useFormContext();
	const items: orderRequest["items"] = orderForm.watch("items");

	const totalPrice = items?.reduce(
		(sum, item) => sum + item.quantity * item.unitPrice,
		0,
	);

	const t = useTranslations("order");
	const { customer } = useCustomer({ id: customerId });
	const dueDate = orderForm.watch("dueDate");

	return (
		<div className="w-full p-6 border rounded-lg h-full flex flex-col justify-between bg-white">
			<div>
				<div className="flex flex-col gap-1.5">
					<h1 className="text-lg font-bold">{t("order_details")}</h1>
					<p className="text-sm text-muted-foreground">
						{t("order_date")}: {new Date().toLocaleDateString()}
					</p>
					<p className="text-sm text-muted-foreground">
						{t("delivery_date")}: {dueDate}
					</p>
				</div>

				<div className="flex flex-col gap-4">
					<div className="mt-4 flex flex-col gap-2">
						<h2 className="font-semibold">{t("order_items")}</h2>

						{items?.map((item, index) => (
							<div className="flex justify-between w-full" key={index}>
								<p className="text-muted-foreground">
									x{item.quantity} {t("thobe")} {item.fabricType}
									{item.color && ` - ${item.color}`}
								</p>

								<p className="flex gap-2 items-center">
									{item.unitPrice * item.quantity}
									<RiyalIcon className="w-3.5 h-3.5" />
								</p>
							</div>
						))}
					</div>

					<Separator />

					<div className="flex flex-col gap-1">
						<div className="flex w-full justify-between">
							<p className="text-muted-foreground">{t("subtotal")}</p>
							<p className="flex gap-2 items-center">
								<span>{totalPrice}</span>
								<RiyalIcon className="w-3.5 h-3.5" />
							</p>
						</div>

						<div className="flex w-full justify-between">
							<p className="text-muted-foreground">{t("discount")}</p>
							<p className="flex gap-2 items-center">
								<span>0</span>
								<RiyalIcon className="w-3.5 h-3.5" />
							</p>
						</div>

						<div className="flex w-full justify-between">
							<p className="text-muted-foreground">
								{t("total_after_discount")}
							</p>
							<p className="flex gap-2 items-center">
								<span>{totalPrice}</span>
								<RiyalIcon className="w-3.5 h-3.5" />
							</p>
						</div>
					</div>

					<Separator />

					<div className="flex flex-col gap-2">
						<h2 className="font-semibold">{t("customer_info")}</h2>

						<div className="flex w-full justify-between">
							<p className="text-muted-foreground">{t("customer")}</p>
							<span>{customer?.name}</span>
						</div>

						<div className="flex w-full justify-between">
							<p className="text-muted-foreground">{t("phone")}</p>
							<span>{customer?.phone}</span>
						</div>
					</div>

					<Separator />

					<div className="flex flex-col gap-2">
						<h2 className="font-semibold">{t("payment_info")}</h2>

						<div className="flex w-full justify-between">
							<p className="text-muted-foreground flex gap-2 items-center">
								<CoinsIcon className="w-4 h-4" />
								<span>{t("cash")}</span>
							</p>

							<p className="flex gap-2 items-center">
								<span>{totalPrice}</span>
								<RiyalIcon className="w-3.5 h-3.5" />
							</p>
						</div>

						<Separator />
					</div>
				</div>
			</div>

			<div className="mt-4">
				<FieldGroup>
					<Field>
						<FieldLabel>{t("notify_customer")}</FieldLabel>
					</Field>

					<Button
						onClick={() => console.log(orderForm.formState.errors)}
						type="submit"
					>
						{t("send_order")}
					</Button>
				</FieldGroup>
			</div>
		</div>
	);
};
