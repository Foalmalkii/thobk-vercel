import { AddFabricDialog } from "@/app/(app)/orders/[orderId]/edit/components/AddFabricDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { activeOrderCustomerIdAtom } from "@/lib/atoms";
import { Provider, useAtom } from "jotai";
import { TrashIcon, CheckCircle2Icon } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { NewMeasurementDialog } from "../NewMeasurementDialog";

export const OrderItemCard = ({
	index,
	onRemove,
}: {
	index: number;
	onRemove: () => void;
}) => {
	const { register, watch } = useFormContext();
	const [customerId] = useAtom(activeOrderCustomerIdAtom);
	const qty = watch(`items.${index}.quantity`);
	const price = watch(`items.${index}.unitPrice`);

	const [openMeasurement, setOpenMeasurement] = useState<boolean>(false);

	// Check if ANY measurement data exists for this item
	const name = watch(`items.${index}.name`);
	const thobeType = watch(`items.${index}.thobeType`);
	const neckImg = watch(`items.${index}.neckImg`);
	const chestPocketImg = watch(`items.${index}.chestPocketImg`);
	const jabzoorImg = watch(`items.${index}.jabzoorImg`);
	const wristImg = watch(`items.${index}.wristImg`);
	const general = watch(`items.${index}.general`);
	const neck = watch(`items.${index}.neck`);
	const wrist = watch(`items.${index}.wrist`);
	const chestPocket = watch(`items.${index}.chestPocket`);
	const sidePockets = watch(`items.${index}.sidePockets`);
	const jabzoor = watch(`items.${index}.jabzoor`);

	// Helper to check if a value is filled
	const hasValue = (val: any) => {
		if (val === null || val === undefined || val === "") return false;
		return true;
	};

	// Check if any object has values
	const hasObjectValue = (obj: any) => {
		if (!obj || typeof obj !== "object") return false;
		return Object.values(obj).some(hasValue);
	};

	const hasMeasurement =
		hasValue(name) ||
		hasValue(thobeType) ||
		hasValue(neckImg) ||
		hasValue(chestPocketImg) ||
		hasValue(jabzoorImg) ||
		hasValue(wristImg) ||
		hasObjectValue(general) ||
		hasObjectValue(neck) ||
		hasObjectValue(wrist) ||
		hasObjectValue(chestPocket) ||
		hasObjectValue(sidePockets) ||
		hasObjectValue(jabzoor);

	console.log("Measurement check:", {
		name,
		thobeType,
		general,
		hasMeasurement,
	});

	return (
		<TableRow>
			<TableCell>
				<div className="flex gap-1">
					<Input {...register(`items.${index}.fabricType`)} />
					<AddFabricDialog />
				</div>
			</TableCell>

			<TableCell>
				<Input {...register(`items.${index}.color`)} />
			</TableCell>

			<TableCell className="text-center">
				<Provider>
					<NewMeasurementDialog
						open={openMeasurement}
						setOpen={setOpenMeasurement}
						customerId={customerId ?? -1}
						orderItemIndexNumber={index}
						hasMeasurement={hasMeasurement}
					/>
				</Provider>
				{/*hasMeasurement && (
					<div className="flex items-center justify-center gap-1 text-green-600 text-xs mt-1">
						<CheckCircle2Icon className="w-3 h-3" />
						<span>Saved</span>
					</div>
				)
				*/}
			</TableCell>

			<TableCell>
				<Input
					type="number"
					{...register(`items.${index}.quantity`, {
						valueAsNumber: true,
					})}
				/>
			</TableCell>

			<TableCell>
				<Input
					type="number"
					{...register(`items.${index}.unitPrice`, {
						valueAsNumber: true,
					})}
				/>
			</TableCell>

			<TableCell className="text-center">
				{qty && price ? qty * price : 0}
			</TableCell>

			<TableCell>
				<Button
					type="button"
					onClick={onRemove}
					className="aspect-square h-auto w-auto p-2 bg-transparent border border-red-400 hover:bg-transparent bg-red-100"
				>
					<TrashIcon className="text-red-400" />
				</Button>
			</TableCell>
		</TableRow>
	);
};
