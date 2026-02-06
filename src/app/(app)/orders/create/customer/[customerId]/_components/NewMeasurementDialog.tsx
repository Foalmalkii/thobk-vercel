import { CircleAlertIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { measurementSchema } from "@/app/(app)/customers/[customerId]/measurements/create/_components/measurements/schema";
import { Loading } from "@/components/layout/loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth";
import { useCustomer } from "@/hooks/customer";
import { ChestPocketMeasurementInfo } from "./chest-pocket";
import { GeneralMeasurementInfo } from "./general-info";
import { JabzoorMeasurementInfo } from "./jabzoor";
import { MeasurementSelector } from "./MeasurementSelector";
import { NeckMeasurementInfo } from "./neck-info";
import { SidePocketsMeasurementsInfo } from "./side-pockets";
import { ThobeImage } from "./thobe-image";
import { WristInfro } from "./wrist-info";

export const NewMeasurementDialog = ({
	customerId,
	orderItemIndexNumber,
	open,
	setOpen,
	hasMeasurement,
}: {
	customerId: number;
	orderItemIndexNumber: number;
	open: boolean;
	setOpen: (open: boolean) => void;
	hasMeasurement: boolean;
}) => {
	const { isInBranch } = useAuth({ middleware: "auth" });
	const { customer, isLoadingCustomer } = useCustomer({ id: customerId });
	const t = useTranslations("messages");

	if (isLoadingCustomer) return <Loading />;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant={"outline"}
					className={
						hasMeasurement
							? "border-blue-600 text-blue-600 bg-blue-50 w-full"
							: "border-orange-600 text-orange-600 w-full"
					}
				>
					<span>{t("measurement")}</span> <CircleAlertIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-full h-screen flex flex-col">
				<div className="h-full flex flex-col">
					<div className="flex flex-1 gap-4 h-full">
						<div className="absolute">
							<MeasurementSelector
								customerId={customerId}
								orderItemIndex={orderItemIndexNumber}
							/>
						</div>
						{/* LEFT: Thobe Image */}
						<div className="max-w-screen-xl mx-auto bg-zinc-100">
							<ThobeImage orderItemIndex={orderItemIndexNumber} />
						</div>

						{/*<div className="w-px bg-zinc-200 self-stretch" />*/}

						{/* RIGHT: Form */}
						{/*
						<div className="w-1/2 h-full flex flex-col">
							<div className="p-2 flex flex-col gap-4 shrink-0">
								<h1 className="font-semibold text-2xl">
									{t("create_measurement_for")} {customer?.name}
								</h1>
								<p className="text-slate-500">
									{t("create_measurement_description")}
								</p>
								<MeasurementSelector
									customerId={customerId}
									orderItemIndex={orderItemIndexNumber}
								/>
								<Button type="button" onClick={() => setOpen(false)}>
									{t("close")} <XIcon />
								</Button>
								<Separator orientation="horizontal" />
							</div>

							<div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4 p-2">
								<div className="grid grid-cols-2 gap-4">
									<MeasurementNameField orderItemIndex={orderItemIndexNumber} />
									<MeasurementTypeField orderItemIndex={orderItemIndexNumber} />
								</div>

								<Separator orientation="horizontal" />

								<GeneralMeasurementInfo orderItemIndex={orderItemIndexNumber} />
								<Separator orientation="horizontal" />
								<NeckMeasurementInfo orderItemIndex={orderItemIndexNumber} />
								<Separator orientation="horizontal" />
								<WristInfro orderItemIndex={orderItemIndexNumber} />
								<Separator orientation="horizontal" />
								<ChestPocketMeasurementInfo
									orderItemIndex={orderItemIndexNumber}
								/>
								<Separator orientation="horizontal" />
								<JabzoorMeasurementInfo orderItemIndex={orderItemIndexNumber} />
								<Separator orientation="horizontal" />
								<SidePocketsMeasurementsInfo
									orderItemIndex={orderItemIndexNumber}
								/>
							</div>
						</div>
*/}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

const MeasurementNameField = ({
	orderItemIndex,
}: {
	orderItemIndex: number;
}) => {
	const { control } = useFormContext();
	const t = useTranslations("messages");

	return (
		<Controller
			name={`items.${orderItemIndex}.name`}
			control={control}
			render={({ field, fieldState }) => (
				<Field>
					<FieldLabel>{t("measurement_name")}</FieldLabel>
					<Input
						placeholder="faisal-shtwy-01"
						{...field}
						value={field.value || ""}
					/>
				</Field>
			)}
		/>
	);
};

const MeasurementTypeField = ({
	orderItemIndex,
}: {
	orderItemIndex: number;
}) => {
	const { control } = useFormContext();
	const t = useTranslations("messages");
	const thobeTypes = measurementSchema.shape.thobeType.unwrap().options;

	return (
		<Controller
			name={`items.${orderItemIndex}.thobeType`}
			control={control}
			render={({ field, fieldState }) => (
				<Field>
					<FieldLabel>{t("measurement_type")}</FieldLabel>
					<Select
						value={field.value || undefined}
						onValueChange={field.onChange}
					>
						<SelectTrigger>
							<SelectValue placeholder={t("thobe_type")} />
						</SelectTrigger>
						<SelectContent>
							{thobeTypes.map((type) => (
								<SelectItem key={type} value={type}>
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>
			)}
		/>
	);
};
