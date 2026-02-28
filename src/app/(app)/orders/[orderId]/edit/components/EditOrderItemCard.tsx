import { Provider, useAtom } from "jotai";
import { CopyIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { AddFabricDialog } from "@/app/(app)/orders/[orderId]/edit/components/AddFabricDialog";
import { FabricSelect } from "@/app/(app)/orders/create/customer/[customerId]/_components/FabricSelect";
import { NewMeasurementDialog } from "@/app/(app)/orders/create/customer/[customerId]/_components/NewMeasurementDialog";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { activeOrderCustomerIdAtom } from "@/lib/atoms";
import axios from "@/lib/axios";

export const EditOrderItemCard = ({
	index,
	onRemove,
	onCopy,
	branchId,
	orderId,
}: {
	index: number;
	onRemove: () => void;
	onCopy: () => void;
	branchId: number | null;
	orderId: number;
}) => {
	const t = useTranslations("messages");
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
	const itemId: number | undefined = watch(`items.${index}.id`);

	const [openMeasurement, setOpenMeasurement] = useState<boolean>(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

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

	const hasValue = (val: unknown) => {
		if (val === null || val === undefined || val === "") return false;
		return true;
	};

	const hasObjectValue = (obj: unknown) => {
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

	const itemErrors = (errors?.items as unknown as Record<number, Record<string, unknown>>)?.[index];
	const quantityError = itemErrors?.quantity;
	const priceError = itemErrors?.unitPrice;
	const fabricError = itemErrors?.fabricId;

	const isInDatabase = typeof itemId === "number";

	const handleDeleteConfirm = async () => {
		if (isInDatabase) {
			setIsDeleting(true);
			try {
				await axios.delete(
					`/api/v1/branch/${branchId}/order/${orderId}/items/${itemId}`,
				);
				onRemove();
				setOpenDeleteDialog(false);
			} catch (e) {
				console.error(e);
				toast.error(t("delete_order_item_failed"), { position: "top-center" });
			} finally {
				setIsDeleting(false);
			}
		} else {
			onRemove();
			setOpenDeleteDialog(false);
		}
	};

	return (
		<>
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
							onClick={() => setOpenDeleteDialog(true)}
							className="aspect-square h-auto w-auto p-2 bg-transparent border border-red-400 hover:bg-transparent bg-red-100"
						>
							<TrashIcon className="text-red-400 w-4 h-4" />
						</Button>
					</div>
				</TableCell>
			</TableRow>

			<Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t("delete_order_item_title")}</DialogTitle>
						<DialogDescription>
							{isInDatabase
								? t("delete_order_item_db_description")
								: t("delete_order_item_local_description")}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpenDeleteDialog(false)}
							disabled={isDeleting}
						>
							{t("cancel")}
						</Button>
						<Button
							type="button"
							onClick={handleDeleteConfirm}
							disabled={isDeleting}
							className="bg-red-600 hover:bg-red-700 text-white"
						>
							{isDeleting ? t("deleting") : t("delete")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
