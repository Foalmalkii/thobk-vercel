import { useCustomer } from "@/hooks/customer";
import { useMeasurements } from "@/hooks/measurements";
import { useTranslations } from "next-intl";
import React, { SetStateAction } from "react";
import { Loading } from "@/components/layout/loading";
import { Separator } from "@/components/ui/separator";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import z from "zod";
import {
	Controller,
	FormProvider,
	useForm,
	useFormContext,
	UseFormSetValue,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { CircleAlertIcon, SaveIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import axios from "@/lib/axios";
import { useAuth } from "@/hooks/auth";
import { orderRequest } from "@/app/(app)/orders/create/customer/[customerId]/page";
import { useListMeasurements } from "@/hooks/measurements/listMeasurements";

import { useAtom } from "jotai";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { MeasurementSelector } from "@/app/(app)/customers/[customerId]/measurements/create/_components/MeasurementSelector";
import { EditGeneralMeasurementInfo } from "./EditGeneralInfo";
import { EditNeckMeasurementInfo } from "./EditNeckInfo";
import { EditChestPocketMeasurementInfo } from "./EditChestPocket";
import { EditJabzoorMeasurementInfo } from "./EditJabzoor";
import { EditSidePocketsMeasurementsInfo } from "./EditSidePockets";
import { EditThobeImage } from "./EditThobeImage";
import { EditWristInfo } from "./EditWristInfo";
import { editMeasurementSchema, editOrderSchema } from "../page";

export const EditOrderMeasurementDialog = ({
	orderItemIndexNumber,
}: {
	orderItemIndexNumber: number;
}) => {
	const { isInBranch } = useAuth({ middleware: "auth" });

	const form = useFormContext();

	const customer = form.getValues("customer");
	const t = useTranslations("messages");

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={"outline"}
					className=" border-orange-600 text-orange-600 w-full"
				>
					<span>القياسات</span> <CircleAlertIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-full h-screen flex flex-col">
				<div className="flex flex-1 gap-4 h-full">
					{/* LEFT: Thobe  Image */}
					<div className="w-1/2 h-full bg-zinc-100">
						<EditThobeImage orderItemIndexNumber={orderItemIndexNumber} />
					</div>

					<div className="w-px bg-zinc-200 self-stretch" />

					{/* RIGHT: Form */}
					<div className="w-1/2 h-full flex flex-col">
						{/* Header */}
						<div className="p-2 flex flex-col gap-4 shrink-0">
							<h1 className="font-semibold text-2xl">
								{t("create_measurement_for")} {customer?.name}
							</h1>
							<p className="text-slate-500">
								{t("create_measurement_description")}
							</p>

							<Button type="submit">
								{t("save_measurement")} <SaveIcon />
							</Button>
							<Separator orientation="horizontal" />
						</div>

						{/* Scrollable section */}
						<div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4 p-2">
							<div className="grid grid-cols-2 gap-4">
								<Controller
									name={`items.${orderItemIndexNumber}.measurement.name`}
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel>{t("measurement_name")}</FieldLabel>
											<Input placeholder="faisal-shtwy-01" {...field} />
										</Field>
									)}
								/>
								<Controller
									name={`items.${orderItemIndexNumber}.measurement.thobeType`}
									control={form.control}
									render={({ field, fieldState }) => {
										const thobeTypes =
											editMeasurementSchema.thobeType.unwrap().options;
										return (
											<Field>
												<FieldLabel>{t("measurement_name")}</FieldLabel>
												<Select>
													<SelectTrigger>
														<SelectValue placeholder="thobe type" />
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
										);
									}}
								/>
							</div>

							<Separator orientation="horizontal" />

							<EditGeneralMeasurementInfo
								orderItemIndexNumber={orderItemIndexNumber}
							/>
							<Separator orientation="horizontal" />
							<EditNeckMeasurementInfo
								orderItemIndexNumber={orderItemIndexNumber}
							/>
							<Separator orientation="horizontal" />
							<EditWristInfo orderItemIndexNumber={orderItemIndexNumber} />
							<Separator orientation="horizontal" />
							<EditChestPocketMeasurementInfo
								orderItemIndexNumber={orderItemIndexNumber}
							/>
							<Separator orientation="horizontal" />
							<EditJabzoorMeasurementInfo
								orderItemIndexNumber={orderItemIndexNumber}
							/>
							<Separator orientation="horizontal" />
							<EditSidePocketsMeasurementsInfo
								orderItemIndexNumber={orderItemIndexNumber}
							/>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
