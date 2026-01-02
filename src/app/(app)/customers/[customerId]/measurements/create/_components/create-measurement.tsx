import { useCustomer } from "@/hooks/customer";
import { useMeasurements } from "@/hooks/measurements";
import { useTranslations } from "next-intl";
import React, { SetStateAction } from "react";
import { Loading } from "@/components/layout/loading";
import { Separator } from "@/components/ui/separator";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThobeImage } from "./measurements/thobe-image";
import { GeneralMeasurementInfo } from "./measurements/general-info";
import { NeckMeasurementInfo } from "./measurements/neck-info";
import { WristInfro } from "./measurements/wrist-info";
import { measurementSchema } from "./measurements/schema";
import { ChestPocketMeasurementInfo } from "./measurements/chest-pocket";
import { SidePocketsMeasurementsInfo } from "./measurements/side-pockets";
import { JabzoorMeasurementInfo } from "./measurements/jabzoor";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

export const CreateMeasurementDialog = ({
	customerId,
	open,
	setOpen,
	orderIdNumber,
}: {
	customerId: number;
	open: boolean;
	setOpen: React.Dispatch<SetStateAction<boolean>>;
	orderIdNumber?: number;
}) => {
	const { customer, isLoadingCustomer } = useCustomer({ id: customerId });
	const { isLoadingMeasurements } = useMeasurements({ customerId });

	const t = useTranslations("messages");

	const defaultValues = {
		general: {
			thobeLength: "",
			thobeBackLength: "",
			shoulderWidth: "",
			shoulderRotation: "",
			sleeveLength: "",
			upperSleeveWidth: "",
			middleSleeveWidth: "",
			wristWidth: "",
			chestFront: "",
			chestBack: "",
			chestFull: "",
			bottomWidth: "",
			cuffBottomWidth: "",
			addedInfo: "",
			sidePocket: "",
			waistWidth: "",
			hipWidth: "",
		},

		neck: {
			neckLength: "",
			neckBackLength: "",
			neckWidth: "",
			neckButtonCount: "",
			neckDesign: "plain",
			neckShape: "square",
			neckFill: "1",
			neckButtonType: "normal",
			neckButtonholeType: "normal",
			neckButtonMaterial: "plastic",
			neckButtonVisibility: "visible",
		},

		wrist: {
			cuffType: "normal",
			cuffLength: "",
			cuffWidth: "",
			wristDesign: "plain",
			wristButtonNumber: "",
			wristMaterialLayers: "1",
			sleeveCrumbNumber: "0",
		},

		chestPocket: {
			chestPocketLength: "",
			chestPocketWidth: "",
			betweenChestPocketShoulder: "",
			chestPocketPenType: "no",
			chestPocketDesign: "official",
			chestPocketShape: "rounded",
			chestPocketVisibility: "visible",
		},

		sidePockets: {
			phonePocketLength: "",
			phonePocketWidth: "",
			walletPocketLength: "",
			walletPocketWidth: "",
		},

		jabzoor: {
			jabzoorHoleType: "push",
			jabzoorLength: "",
			jabzoorWidth: "",
			jabzoorDesign: "normal",
			jabzoorVisibility: "visible",
			jabzoorShape: "square",
			jabzoorPushMaterial: "plastic",
		},
	};

	type measurementData = z.infer<typeof measurementSchema>;

	const form = useForm<measurementData>({
		resolver: zodResolver(measurementSchema),
		defaultValues,
	});

	if (isLoadingCustomer || isLoadingMeasurements) return <Loading />;

	console.log("ok here it is", customer);
	console.log("btw the id is", customerId);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-full h-screen flex flex-col">
				<FormProvider {...form}>
					<form
						onSubmit={form.handleSubmit((e) => {
							console.log("sup");
						})}
						className="h-full flex flex-col"
					>
						<div className="flex flex-1 gap-4 h-full">
							{/* LEFT: Thobe Image */}
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
										onClick={() => {
											console.log(form.formState.errors);
										}}
									>
										{t("save_measurement")} <SaveIcon />
									</Button>
									<Separator orientation="horizontal" />
								</div>

								{/* Scrollable section */}
								<div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4 p-2">
									<GeneralMeasurementInfo />
									<Separator orientation="horizontal" />
									<NeckMeasurementInfo />
									<Separator orientation="horizontal" />
									<WristInfro />
									<Separator orientation="horizontal" />
									<ChestPocketMeasurementInfo />
									<Separator orientation="horizontal" />
									<SidePocketsMeasurementsInfo />
									<Separator orientation="horizontal" />
									<JabzoorMeasurementInfo />
								</div>
							</div>
						</div>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};
