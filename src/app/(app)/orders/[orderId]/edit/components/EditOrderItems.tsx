import { Provider } from "jotai";
import { useTranslations } from "next-intl";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { OrderItemCard } from "../../../create/customer/[customerId]/_components/ui/order-item-card";
import { defaultValues } from "./EditMeasurementSchema";
import { EditOrderItemCard } from "./EditOrderItemCard";

export const EditOrderItems = () => {
	const t = useTranslations("messages");

	const { control, watch } = useFormContext();
	const { fields, append, remove } = useFieldArray({ control, name: "items" });
	const items = watch("items") ?? [];
	const isEmpty = fields.length === 0;

	return (
		<div className="rounded-xl border p-6">
			<div className="flex justify-between">
				<h1 className="text-xl font-medium">{t("order_items")}</h1>
				<Button
					type="button"
					onClick={() =>
						append({
							fabricType: "",
							color: "",
							unitPrice: 0,
							measurement: defaultValues,
							quantity: 1,
						})
					}
				>
					{t("new_order_item")}
				</Button>
			</div>
			<div className=" mt-4">
				<Table className="">
					<TableHeader>
						<TableRow className="text-center">
							<TableHead>{t("fabric")}</TableHead>
							<TableHead>{t("color")}</TableHead>
							<TableHead>{t("measurement")}</TableHead>
							<TableHead>{t("quantity")}</TableHead>
							<TableHead>{t("price")}</TableHead>
							<TableHead>{t("subtotal")}</TableHead>
							<TableHead>{t("decisions")}</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody className="w-full h-40 overflow-y-scroll">
						{isEmpty && (
							<TableRow>
								<TableCell className="text-center italic" colSpan={7}>
									{t("no_order_items")}
								</TableCell>
							</TableRow>
						)}

						{fields.map((field, index) => (
							<Provider key={field.id}>
								<EditOrderItemCard
									key={field.id}
									index={index}
									onRemove={() => remove(index)}
								/>
							</Provider>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
