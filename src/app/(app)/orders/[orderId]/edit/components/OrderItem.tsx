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

export const OrderItem = () => {
	const t = useTranslations("messages");

	const { control, watch } = useFormContext();
	const { fields, append, remove } = useFieldArray({ control, name: "items" });
	const items = watch("items") ?? [];
	const isEmpty = fields.length === 0;

	const handleAddItem = () => {
		const currentDate = new Date().toISOString().slice(0, 10);
		const newIndex = fields.length + 1;
		const name = `${currentDate}-${newIndex}`;

		append({
			unitPrice: 0,
			quantity: 1,
			// Default measurement values
			fabricId: undefined,
			thobeType: null,
			neckImg: null,
			chestPocketImg: null,
			jabzoorImg: null,
			wristImg: null,
			name: name,
			general: {
				generalThobeLength: null,
				generalThobeBackLength: null,
				generalShoulderWidth: null,
				generalShoulderRight: null,
				generalShoulderLeft: null,
				generalSleeveLength: null,
				generalUpperSleeveWidth: null,
				generalMiddleSleeveWidth: null,
				generalWristWidth: null,
				generalChestFront: null,
				generalChestFull: null,
				generalTakaleesLength: null,
				generalTakaleesWidth: null,
				generalBottomWidth: null,
				generalCuffBottomWidth: null,
				generalWaistWidth: null,
				generalHipWidth: null,
			},
			neck: {
				neckLength: null,
				neckBackLength: null,
				neckWidth: null,
				neckFill: null,
				neckNotes: null,
			},
			wrist: {
				wristCuffType: null,
				wristCuffLength: null,
				wristCuffWidth: null,
				wristNotes: null,
			},
			chestPocket: {
				chestPocketLength: null,
				chestPocketWidth: null,
				betweenChestPocketShoulder: null,
				chestPocketPenType: null,
				chestPocketNotes: null,
			},
			sidePockets: {
				sidePhonePocketLength: null,
				sidePhonePocketWidth: null,
				sideWalletPocketLength: null,
				sideWalletPocketWidth: null,
			},
			jabzoor: {
				jabzoorLength: null,
				jabzoorWidth: null,
				jabzoorNotes: null,
			},
		});
	};

	const handleCopyItem = (index: number) => {
		const itemToCopy = items[index];
		// Create a deep copy of the item
		const copiedItem = JSON.parse(JSON.stringify(itemToCopy));

		// Update the name with new date and index
		const currentDate = new Date().toISOString().slice(0, 10);
		const newIndex = fields.length + 1;
		copiedItem.name = `${currentDate}-${newIndex}`;

		append(copiedItem);
	};

	return (
		<div className="rounded-xl border p-6 bg-white">
			<div className="flex justify-between">
				<h1 className="text-xl font-medium">{t("order_items")}</h1>
				<Button type="button" onClick={handleAddItem}>
					{t("new_order_item")}
				</Button>
			</div>
			<div className="mt-4">
				<Table className="">
					<TableHeader>
						<TableRow className="text-center">
							<TableHead>{t("fabric")}</TableHead>
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
							<OrderItemCard
								key={field.id}
								index={index}
								onRemove={() => remove(index)}
								onCopy={() => handleCopyItem(index)}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
