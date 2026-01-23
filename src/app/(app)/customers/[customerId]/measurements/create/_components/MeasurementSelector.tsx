import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetMeasurement } from "@/hooks/measurements/getMeasurement";
import { useListMeasurements } from "@/hooks/measurements/listMeasurements";
import React, { SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { defaultValue, MeasurementRequest } from "./measurements/defaultValue";
import axios from "@/lib/axios";
import { useAtom } from "jotai";
import {
	openCreateMeasurementAtom,
	openEditMeasurementAtom,
	selectedMeasurementProfileId,
} from "@/lib/atoms";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { getDirection } from "@/lib/types";
import { useLocale } from "next-intl";

type measurement = {
	id: number;
	name: string;
};

export const MeasurementSelector = ({
	branchId,
	customerId,
	orderItemIndex,
	orderForm,
}: {
	branchId: number | null;
	customerId: number;
	orderItemIndex: number;
	orderForm: any;
}) => {
	const { measurements, loadingMeasurements, emptyMeasurements } =
		useListMeasurements({
			branchId,
			customerId,
		});

	const form = useFormContext();
	const [openCreateMeasurement, setOpenCreateMeasurement] = useAtom(
		openCreateMeasurementAtom,
	);
	const [openEditMeasurement, setOpenEditMeasurement] = useAtom(
		openEditMeasurementAtom,
	);

	const locale = useLocale();
	if (loadingMeasurements) return <>Loading...</>;

	if (emptyMeasurements)
		return (
			<Alert className="bg-blue-100 border border-blue-200 text-blue-500 ">
				<InfoIcon className="h-4 stroke-blue-500" />
				<AlertTitle>تنبيه</AlertTitle>
				<AlertDescription>لا يوجد أي ملف سابق لهذا العميل</AlertDescription>
			</Alert>
		);

	return (
		<Select
			onValueChange={async (value) => {
				orderForm.setValue(
					`items.${orderItemIndex}.measurementId`,
					Number(value),
				);
				setOpenCreateMeasurement(false);
				setOpenEditMeasurement(true);
			}}
		>
			<SelectTrigger>
				<SelectValue placeholder="اختر قياس" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>اختر احد القياسات</SelectLabel>
					{measurements.map((measurement: measurement) => (
						<SelectItem value={"" + measurement.id} key={measurement.id}>
							{measurement.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
