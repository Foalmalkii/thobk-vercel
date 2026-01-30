import { AlertCircleIcon, DownloadIcon, Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type MeasurementDetails,
	useCustomerMeasurements,
	useMeasurementDetails,
} from "@/hooks/UseMeasurementSelector";

interface MeasurementSelectorProps {
	customerId: number;
	orderItemIndex: number;
}

export const MeasurementSelector = ({
	customerId,
	orderItemIndex,
}: MeasurementSelectorProps) => {
	const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
	const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
	const { setValue } = useFormContext();
	const t = useTranslations("measurements");

	const { measurements, isLoadingMeasurements } =
		useCustomerMeasurements(customerId);

	const { measurementDetails, isLoadingDetails } = useMeasurementDetails(
		selectedOrderId,
		selectedItemId,
	);

	const transformMeasurementToForm = (details: MeasurementDetails) => {
		// Set all the form values
		setValue(`items.${orderItemIndex}.name`, details.name);
		setValue(`items.${orderItemIndex}.thobeType`, details.thobeType);
		setValue(`items.${orderItemIndex}.neckImg`, details.neckImg);
		setValue(`items.${orderItemIndex}.chestPocketImg`, details.chestPocketImg);
		setValue(`items.${orderItemIndex}.jabzoorImg`, details.jabzoorImg);
		setValue(`items.${orderItemIndex}.wristImg`, details.wristImg);

		// General measurements
		setValue(
			`items.${orderItemIndex}.general.generalThobeLength`,
			details.generalThobeLength,
		);
		setValue(
			`items.${orderItemIndex}.general.generalThobeBackLength`,
			details.generalThobeBackLength,
		);
		setValue(
			`items.${orderItemIndex}.general.generalShoulderWidth`,
			details.generalShoulderWidth,
		);
		setValue(
			`items.${orderItemIndex}.general.generalShoulderRight`,
			details.generalShoulderRight,
		);
		setValue(
			`items.${orderItemIndex}.general.generalShoulderLeft`,
			details.generalShoulderLeft,
		);
		setValue(
			`items.${orderItemIndex}.general.generalShoulderRotation`,
			details.generalShoulderRotation,
		);
		setValue(
			`items.${orderItemIndex}.general.generalSleeveLength`,
			details.generalSleeveLength,
		);
		setValue(
			`items.${orderItemIndex}.general.generalUpperSleeveWidth`,
			details.generalUpperSleeveWidth,
		);
		setValue(
			`items.${orderItemIndex}.general.generalMiddleSleeveWidth`,
			details.generalMiddleSleeveWidth,
		);
		setValue(
			`items.${orderItemIndex}.general.generalWristWidth`,
			details.generalWristWidth,
		);
		setValue(
			`items.${orderItemIndex}.general.generalChestFront`,
			details.generalChestFront,
		);
		setValue(
			`items.${orderItemIndex}.general.generalChestBack`,
			details.generalChestBack,
		);
		setValue(
			`items.${orderItemIndex}.general.generalChestFull`,
			details.generalChestFull,
		);
		setValue(
			`items.${orderItemIndex}.general.generalTakaleesLength`,
			details.generalTakaleesLength,
		);
		setValue(
			`items.${orderItemIndex}.general.generalTakaleesWidth`,
			details.generalTakaleesWidth,
		);
		setValue(
			`items.${orderItemIndex}.general.generalBottomWidth`,
			details.generalBottomWidth,
		);
		setValue(
			`items.${orderItemIndex}.general.generalCuffBottomWidth`,
			details.generalCuffBottomWidth,
		);
		setValue(
			`items.${orderItemIndex}.general.generalWaistWidth`,
			details.generalWaistWidth,
		);
		setValue(
			`items.${orderItemIndex}.general.generalHipWidth`,
			details.generalHipWidth,
		);

		// Neck measurements
		setValue(`items.${orderItemIndex}.neck.neckLength`, details.neckLength);
		setValue(
			`items.${orderItemIndex}.neck.neckBackLength`,
			details.neckBackLength,
		);
		setValue(`items.${orderItemIndex}.neck.neckWidth`, details.neckWidth);
		setValue(`items.${orderItemIndex}.neck.neckFill`, details.neckFill);
		setValue(`items.${orderItemIndex}.neck.neckNotes`, details.neckNotes);

		// Wrist measurements
		setValue(
			`items.${orderItemIndex}.wrist.wristCuffType`,
			details.wristCuffType,
		);
		setValue(
			`items.${orderItemIndex}.wrist.wristCuffLength`,
			details.wristCuffLength,
		);
		setValue(
			`items.${orderItemIndex}.wrist.wristCuffWidth`,
			details.wristCuffWidth,
		);
		setValue(`items.${orderItemIndex}.wrist.wristNotes`, details.wristNotes);

		// Chest pocket measurements
		setValue(
			`items.${orderItemIndex}.chestPocket.chestPocketLength`,
			details.chestPocketLength,
		);
		setValue(
			`items.${orderItemIndex}.chestPocket.chestPocketWidth`,
			details.chestPocketWidth,
		);
		setValue(
			`items.${orderItemIndex}.chestPocket.betweenChestPocketShoulder`,
			details.betweenChestPocketShoulder,
		);
		setValue(
			`items.${orderItemIndex}.chestPocket.chestPocketPenType`,
			details.chestPocketPenType,
		);
		setValue(
			`items.${orderItemIndex}.chestPocket.chestPocketNotes`,
			details.chestPocketNotes,
		);

		// Side pockets measurements
		setValue(
			`items.${orderItemIndex}.sidePockets.sidePhonePocketLength`,
			details.sidePhonePocketLength,
		);
		setValue(
			`items.${orderItemIndex}.sidePockets.sidePhonePocketWidth`,
			details.sidePhonePocketWidth,
		);
		setValue(
			`items.${orderItemIndex}.sidePockets.sideWalletPocketLength`,
			details.sideWalletPocketLength,
		);
		setValue(
			`items.${orderItemIndex}.sidePockets.sideWalletPocketWidth`,
			details.sideWalletPocketWidth,
		);

		// Jabzoor measurements
		setValue(
			`items.${orderItemIndex}.jabzoor.jabzoorLength`,
			details.jabzoorLength,
		);
		setValue(
			`items.${orderItemIndex}.jabzoor.jabzoorWidth`,
			details.jabzoorWidth,
		);
		setValue(
			`items.${orderItemIndex}.jabzoor.jabzoorNotes`,
			details.jabzoorNotes,
		);
	};

	const handleLoadMeasurement = () => {
		if (measurementDetails) {
			transformMeasurementToForm(measurementDetails);
		}
	};

	if (isLoadingMeasurements) {
		return (
			<div className="flex items-center justify-center p-4">
				<Loader2Icon className="w-5 h-5 animate-spin" />
			</div>
		);
	}

	// No previous measurements
	if (!measurements || measurements.length === 0) {
		return (
			<Alert className="border-orange-200 bg-orange-50">
				<AlertCircleIcon className="h-4 w-4 text-orange-600" />
				<AlertTitle className="text-orange-900">
					{t("new_customer_profile")}
				</AlertTitle>
				<AlertDescription className="text-orange-700">
					{t("no_previous_measurements")}
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			<Alert className="border-blue-200 bg-blue-50">
				<AlertCircleIcon className="h-4 w-4 text-blue-600" />
				<AlertTitle className="text-blue-900">
					{t("load_previous_measurement")}
				</AlertTitle>
				<AlertDescription className="text-blue-700">
					{t("select_measurement_description")}
				</AlertDescription>
			</Alert>

			<div className="flex gap-2">
				<Select
					value={
						selectedItemId && selectedOrderId
							? `${selectedOrderId}-${selectedItemId}`
							: undefined
					}
					onValueChange={(value) => {
						const measurement = measurements.find(
							(m) => `${m.orderId}-${m.id}` === value,
						);
						if (measurement) {
							setSelectedOrderId(measurement.orderId);
							setSelectedItemId(measurement.id);
						}
					}}
				>
					<SelectTrigger className="flex-1">
						<SelectValue placeholder={t("select_measurement")} />
					</SelectTrigger>
					<SelectContent>
						{measurements.map((measurement) => (
							<SelectItem
								key={`${measurement.orderId}-${measurement.id}`}
								value={`${measurement.orderId}-${measurement.id}`}
							>
								<div className="flex flex-col">
									<span className="font-medium">{measurement.displayName}</span>
									<span className="text-xs text-muted-foreground">
										{measurement.name}
									</span>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Button
					type="button"
					onClick={handleLoadMeasurement}
					disabled={!measurementDetails || isLoadingDetails}
					className="shrink-0"
				>
					{isLoadingDetails ? (
						<Loader2Icon className="w-4 h-4 animate-spin" />
					) : (
						<>
							<DownloadIcon className="w-4 h-4" />
							{t("load")}
						</>
					)}
				</Button>
			</div>
		</div>
	);
};
