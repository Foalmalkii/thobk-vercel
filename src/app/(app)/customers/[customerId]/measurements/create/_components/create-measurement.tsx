import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { CircleAlertIcon, SaveIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { SetStateAction } from "react";
import {
	Controller,
	FormProvider,
	UseFormSetValue,
	useForm,
	useFormContext,
} from "react-hook-form";
import type z from "zod";
import { orderRequest } from "@/app/(app)/orders/create/customer/[customerId]/page";
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
import { useMeasurements } from "@/hooks/measurements";
import { useListMeasurements } from "@/hooks/measurements/listMeasurements";
import {
	openCreateMeasurement,
	openCreateMeasurementAtom,
	selectedMeasurementProfileId,
} from "@/lib/atoms";
import axios from "@/lib/axios";
import { MeasurementSelector } from "./MeasurementSelector";
import { ChestPocketMeasurementInfo } from "./measurements/chest-pocket";
import { GeneralMeasurementInfo } from "./measurements/general-info";
import { JabzoorMeasurementInfo } from "./measurements/jabzoor";
import { NeckMeasurementInfo } from "./measurements/neck-info";
import { measurementSchema } from "./measurements/schema";
import { SidePocketsMeasurementsInfo } from "./measurements/side-pockets";
import { ThobeImage } from "./measurements/thobe-image";
import { WristInfro } from "./measurements/wrist-info";

export const CreateMeasurementDialog = ({
	customerId,

	orderItemIndexNumber,
}: {
	customerId: number;

	orderItemIndexNumber: number;
}) => {
	const { isInBranch } = useAuth({ middleware: "auth" });
	const { customer, isLoadingCustomer } = useCustomer({ id: customerId });
	const { measurements, loadingMeasurements } = useListMeasurements({
		branchId: isInBranch,
		customerId: customerId,
	});
	const orderForm = useFormContext();
	const t = useTranslations("messages");

	const measuermentId = orderForm.watch(
		`items.${orderItemIndexNumber}.measuermentId`,
	);
	const [openCreateMeasurement, setOpenCreateMeasurement] = useAtom(
		openCreateMeasurementAtom,
	);

	const defaultValues = {
		name: null,
		thobeType: null,
		neckImg: null,
		chestPocketImg: null,
		jabzoorImg: null,
		wristImg: null,
		general: {
			generalThobeLength: null,
			generalThobeBackLength: null,
			generalShoulderWidth: null,
			generalShoulderRotation: null,
			generalSleeveLength: null,
			generalUpperSleeveWidth: null,
			generalMiddleSleeveWidth: null,
			generalWristWidth: null,
			generalChestFront: null,
			generalChestBack: null,
			generalChestFull: null,
			generalBottomWidth: null,
			generalCuffBottomWidth: null,
			generalAddedInfo: null,
			generalSidePocket: null,
			generalWaistWidth: null,
			generalHipWidth: null,
		},

		neck: {
			neckLength: null,
			neckBackLength: null,
			neckWidth: null,
			neckButtonCount: null,
			neckDesign: null,
			neckShape: null,
			neckFill: null,
			neckButtonType: null,
			neckButtonholeType: null,
			neckButtonMaterial: null,
			neckButtonVisibility: null,
		},

		wrist: {
			wristCuffType: null,
			wristCuffLength: null,
			wristCuffWidth: null,
			wristDesign: null,
			wristButtonNumber: null,
			wristMaterialLayers: null,
			wristSleeveCrumbNumber: null,
		},

		chestPocket: {
			chestPocketLength: null,
			chestPocketWidth: null,
			betweenChestPocketShoulder: null,
			chestPocketPenType: null,
			chestPocketDesign: null,
			chestPocketShape: null,
			chestPocketVisibility: null,
		},

		sidePockets: {
			sidePhonePocketLength: null,
			sidePhonePocketWidth: null,
			sideWalletPocketLength: null,
			sideWalletPocketWidth: null,
		},

		jabzoor: {
			jabzoorHoleType: null,
			jabzoorLength: null,
			jabzoorWidth: null,
			jabzoorDesign: null,
			jabzoorVisibility: null,
			jabzoorShape: null,
			jabzoorPushMaterial: null,
		},
	};

	type measurementData = z.infer<typeof measurementSchema>;

	const form = useForm<measurementData>({
		resolver: zodResolver(measurementSchema),
		defaultValues,
	});

	if (isLoadingCustomer || loadingMeasurements) return <Loading />;

	const handleSubmit = async (data: measurementData) => {
		const reqBody = {
			name: data.name,
			thobeType: data.thobeType,
			neckImg: data.neckImg,
			chestPocketImg: data.neckImg,
			jabzoorImg: data.jabzoorImg,
			wristImg: data.wristImg,
			...data.general,
			...data.neck,
			...data.wrist,
			...data.chestPocket,
			...data.jabzoor,
			...data.sidePockets,
		};
		console.log("request body", reqBody);

		await axios
			.post(
				`/api/v1/branch/${isInBranch}/customer/${customerId}/measurement`,
				reqBody,
			)
			.then((res) => {
				orderForm.setValue(
					`items.${orderItemIndexNumber}.measurementId`,
					Number(res.data.data.id),
				);
			})
			.catch((e) => console.log(e));

		setOpenCreateMeasurement(false);
	};

	return (
		<Dialog
			open={openCreateMeasurement}
			onOpenChange={setOpenCreateMeasurement}
		>
			<DialogTrigger asChild>
				<Button
					variant={"outline"}
					className=" border-orange-600 text-orange-600 w-full"
				>
					<span>القياسات</span> <CircleAlertIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-full h-screen flex flex-col">
				<FormProvider {...form}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit(handleSubmit)(e);
						}}
						className="h-full flex flex-col"
					>
						<div className="flex flex-1 gap-4 h-full">
							{/* LEFT: Thobe  Image */}
							<div className="w-1/2 h-full bg-zinc-100">
								<ThobeImage />
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
									<MeasurementSelector
										branchId={isInBranch}
										customerId={customerId}
										orderItemIndex={orderItemIndexNumber}
										orderForm={orderForm}
										setOpen={setOpenCreateMeasurement}
									/>

									<Button
										onClick={() => {
											console.log(form.formState.errors);
										}}
										type="submit"
									>
										{t("save_measurement")} <SaveIcon />
									</Button>
									<Separator orientation="horizontal" />
								</div>

								{/* Scrollable section */}
								<div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4 p-2">
									<div className="grid grid-cols-2 gap-4">
										<Controller
											name="name"
											control={form.control}
											render={({ field, fieldState }) => (
												<Field>
													<FieldLabel>{t("measurement_name")}</FieldLabel>
													<Input placeholder="faisal-shtwy-01" {...field} />
												</Field>
											)}
										/>
										<Controller
											name="thobeType"
											control={form.control}
											render={({ field, fieldState }) => {
												const thobeTypes =
													measurementSchema.shape.thobeType.unwrap().options;
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

									<GeneralMeasurementInfo />
									<Separator orientation="horizontal" />
									<NeckMeasurementInfo />
									<Separator orientation="horizontal" />
									<WristInfro />
									<Separator orientation="horizontal" />
									<ChestPocketMeasurementInfo />
									<Separator orientation="horizontal" />
									<JabzoorMeasurementInfo />
									<Separator orientation="horizontal" />
									<SidePocketsMeasurementsInfo />
									{measuermentId && "NOOOO"}
								</div>
							</div>
						</div>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};
