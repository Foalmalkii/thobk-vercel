import { Provider, useAtom } from "jotai";
import { PencilRulerIcon, TrashIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CreateMeasurementDialog } from "@/app/(app)/customers/[customerId]/measurements/create/_components/create-measurement";
import { EditMeasurementDialog } from "@/app/(app)/customers/[customerId]/measurements/create/_components/EditMeasurement";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { activeOrderCustomerIdAtom } from "@/lib/atoms";
import { EditOrderMeasurementDialog } from "./EditOrderMeasurement";

export const EditOrderItemCard = ({
	index,
	onRemove,
}: {
	index: number;
	onRemove: () => void;
}) => {
	const { register, watch, setValue, getValues } = useFormContext();
	const [customerId] = useAtom(activeOrderCustomerIdAtom);
	const qty = watch(`items.${index}.quantity`);
	const price = watch(`items.${index}.unitPrice`);

	const [openMeasurement, setOpenMeasurement] = useState<boolean>(false);
	const [openEdit, setOpenEdit] = useState<boolean>(false);

	const measurementId = watch(`items.${index}.measurementId`);

	return (
		<TableRow>
			<TableCell>
				<Input {...register(`items.${index}.fabricType`)} />
			</TableCell>

			<TableCell>
				<Input {...register(`items.${index}.color`)} />
			</TableCell>

			<TableCell className="text-center">
				<EditOrderMeasurementDialog orderItemIndexNumber={index} />
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
					step="0.01"
					value={price ? price / 100 : ""}
					onChange={(e) => {
						const value = e.target.value;
						// Convert from decimal to cents (multiply by 100)
						setValue(
							`items.${index}.unitPrice`,
							value ? parseFloat(value) * 100 : 0,
						);
					}}
				/>
			</TableCell>

			<TableCell className="text-center">
				{qty && price ? qty * (price / 100) : 0}
			</TableCell>

			<TableCell>
				<Button
					type="button"
					onClick={onRemove}
					className=" aspect-square h-auto w-auto p-2 bg-transparent border border-red-400 hover:bg-transparent bg-red-100"
				>
					<TrashIcon className="text-red-400" />
				</Button>
			</TableCell>
		</TableRow>
	);
};
