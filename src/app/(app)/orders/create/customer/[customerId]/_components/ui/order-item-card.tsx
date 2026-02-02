import { Provider, useAtom } from "jotai";
import { CopyIcon, TrashIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddFabricDialog } from "@/app/(app)/orders/[orderId]/edit/components/AddFabricDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { activeOrderCustomerIdAtom } from "@/lib/atoms";
import { FabricSelect } from "../FabricSelect";
import { NewMeasurementDialog } from "../NewMeasurementDialog";

export const OrderItemCard = ({
	index,
	onRemove,
	onCopy,
}: {
	index: number;
	onRemove: () => void;
	onCopy: () => void;
}) => {
	const {
		register,
		watch,
		control,
		setValue,
		formState: { errors },
	} = useFormContext();
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

	const handleFabricCreated = (fabricId: number) => {
		setValue(`items.${index}.fabricId`, fabricId);
	};

	// Check for validation errors
	const quantityError = errors?.items?.[index]?.quantity;
	const priceError = errors?.items?.[index]?.unitPrice;
	const fabricError = errors?.items?.[index]?.fabricId;

	return (
		<TableRow>
			<TableCell>
				<div className="flex gap-1">
					<Controller
						name={`items.${index}.fabricId`}
						control={control}
						render={({ field }) => (
							<FabricSelect
								value={field.value}
								onValueChange={field.onChange}
								hasError={!!fabricError}
							/>
						)}
					/>
					<AddFabricDialog onFabricCreated={handleFabricCreated} />
				</div>
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
			</TableCell>

			<TableCell>
				<Input
					type="number"
					{...register(`items.${index}.quantity`, {
						valueAsNumber: true,
					})}
					className={
						quantityError
							? "border-orange-600 focus-visible:ring-orange-600"
							: ""
					}
				/>
			</TableCell>

			<TableCell>
				<Input
					type="number"
					{...register(`items.${index}.unitPrice`, {
						valueAsNumber: true,
					})}
					className={
						priceError ? "border-orange-600 focus-visible:ring-orange-600" : ""
					}
				/>
			</TableCell>

			<TableCell className="text-center">
				{qty && price ? qty * price : 0}
			</TableCell>

			<TableCell>
				<div className="flex gap-2">
					<Button
						type="button"
						onClick={onCopy}
						className="aspect-square h-auto w-auto p-2 bg-transparent border border-blue-400 hover:bg-transparent bg-blue-100"
					>
						<CopyIcon className="text-blue-400 w-4 h-4" />
					</Button>
					<Button
						type="button"
						onClick={onRemove}
						className="aspect-square h-auto w-auto p-2 bg-transparent border border-red-400 hover:bg-transparent bg-red-100"
					>
						<TrashIcon className="text-red-400 w-4 h-4" />
					</Button>
				</div>
			</TableCell>
		</TableRow>
	);
};
