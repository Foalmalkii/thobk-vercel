import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { PencilIcon, SaveIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";
import { type SetStateAction, useEffect } from "react";
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
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth";
import { useCustomer } from "@/hooks/customer";
import { useMeasurements } from "@/hooks/measurements";
import { useGetMeasurement } from "@/hooks/measurements/getMeasurement";
import { openEditMeasurementAtom } from "@/lib/atoms";
import axios from "@/lib/axios";
import { ChestPocketMeasurementInfo } from "./measurements/chest-pocket";
import { defaultValue, MeasurementRequest } from "./measurements/defaultValue";
import { GeneralMeasurementInfo } from "./measurements/general-info";
import { JabzoorMeasurementInfo } from "./measurements/jabzoor";
import { NeckMeasurementInfo } from "./measurements/neck-info";
import { measurementSchema } from "./measurements/schema";
import { SidePocketsMeasurementsInfo } from "./measurements/side-pockets";
import { ThobeImage } from "./measurements/thobe-image";
import { WristInfro } from "./measurements/wrist-info";

export const EditMeasurementDialog = ({
	customerId,

	measurementId,
}: {
	customerId: number;
	measurementId: number;
	open: boolean;
	setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
	const { isInBranch } = useAuth({ middleware: "auth" });
	const { customer, isLoadingCustomer } = useCustomer({ id: customerId });
	const t = useTranslations("messages");
	type measurementData = z.infer<typeof measurementSchema>;
	//TODO : FETCH MEASUREMENT

	const { measurement, loadingMeasurement, mutateMeasurement } =
		useGetMeasurement({
			branchId: isInBranch,
			customerId: customerId,
			measurementId: measurementId,
		});

	const [openEditMeasurement, setOpenEditMeasurement] = useAtom(
		openEditMeasurementAtom,
	);
	//TODO SET FETCHED MEASUREMENT DATA AS THE DEFAULT VALUES OF THE FORM
	const form = useForm<measurementData>({
		resolver: zodResolver(measurementSchema),
	});

	useEffect(() => {
		form.reset(defaultValue(measurement));
	}, [measurement]);

	if (isLoadingCustomer || loadingMeasurement) return <Loading />;

	//TODO RE IMPLEMENT HANDLE SUBMIT TO EDIT THE MEASUREMENT NOT POST IT
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
			.put(
				`/api/v1/branch/${isInBranch}/customer/${customerId}/measurement/${measurementId}`,
				reqBody,
			)
			.then((res) => {
				mutateMeasurement();
			})
			.catch((e) => console.error(e));

		setOpenEditMeasurement(false);
	};

	return (
		<Dialog open={openEditMeasurement} onOpenChange={setOpenEditMeasurement}>
			<DialogTrigger asChild>
				<Button
					onClick={() => {
						form.reset(defaultValue(measurement));
					}}
					variant={"outline"}
					className="border-blue-600 text-blue-600 w-full"
				>
					<span>تعديل القياس</span>
					<PencilIcon />
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
									<Button
										onClick={() =>
											console.log("thobeType", form.watch("thobeType"))
										}
										type="submit"
									>
										{t("save_measurement")} <SaveIcon />
									</Button>
									<Separator orientation="horizontal" />
								</div>

								{/* Scrollable section */}
								<div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4 p-2">
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
								</div>
							</div>
						</div>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};
