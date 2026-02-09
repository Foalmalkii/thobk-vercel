import { useAtom } from "jotai";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
	chestPocketInfoAtom,
	jabzoorInfoAtom,
	neckInfoAtom,
	wristInfoAtom,
} from "@/lib/atoms";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getDirection } from "@/lib/types";
import { measurementSchema } from "@/app/(app)/customers/[customerId]/measurements/create/_components/measurements/schema";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export const ThobeImage = ({ orderItemIndex }: { orderItemIndex: number }) => {
	const { watch, control } = useFormContext();
	const [neckInfo] = useAtom(neckInfoAtom);
	const [wristInfo] = useAtom(wristInfoAtom);
	const [chestPocketInfo] = useAtom(chestPocketInfoAtom);
	const [jabzoorInfo] = useAtom(jabzoorInfoAtom);
	const t = useTranslations("measurements");
	const locale = useLocale();
	const dir = getDirection(locale);

	// Helper to watch values from the specific order item
	const watchItem = (path: string) => watch(`items.${orderItemIndex}.${path}`);

	/**
	 * Hide fields when default or empty.
	 * Returns null if value is 0, undefined, null, or empty string.
	 */
	const renderValue = (value: any) => {
		if (
			value === 0 ||
			value === undefined ||
			value === null ||
			value === "" ||
			Number.isNaN(value)
		) {
			return null;
		}
		return value;
	};

	return (
		<div
			dir={"ltr"}
			className="inline-block relative top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 w-full"
		>
			{/* NECK IMAGE */}

			<div className="absolute top-[11.5%] -translate-y-1/2 right-[91.7%] font-bold translate-x-1/2 w-[10%] h-[10%]">
				<Controller
					control={control}
					name={`items.${orderItemIndex}.neckImg`}
					render={({ field, fieldState }) => {
						const neckImgOptions =
							measurementSchema.shape.neckImg.unwrap().options;

						return (
							<Field>
								<Select
									{...field}
									value={field.value || undefined}
									onValueChange={field.onChange}
								>
									<SelectTrigger className="border-0 shadow-none h-full focus:ring-0 focus-visible:ring-0">
										<SelectValue
											className="h-full"
											placeholder={t("neck_select_neckImg")}
										>
											{field.value ? (
												<div className="flex items-center gap-2">
													<img
														src={`/images/measurements/NECK_${field.value}.png`}
														className="w"
													/>
												</div>
											) : (
												t("neck_select_neckImg")
											)}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										{neckImgOptions.map((val) => (
											<SelectItem value={val} key={val}>
												<div className="flex items-center gap-2">
													<img
														loading="lazy"
														src={`/images/measurements/NECK_${val}.png`}
														className="w-12 h-12"
													/>
													<span>
														{t("neck")} {val}
													</span>
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>
						);
					}}
				/>
			</div>

			{/* CHEST POCKET IMAGE */}

			<div className="absolute top-[33%] -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 w-[10%] opacity-80">
				<Controller
					control={control}
					name={`items.${orderItemIndex}.chestPocketImg`}
					render={({ field, fieldState }) => {
						const chestPocketImgOptions =
							measurementSchema.shape.chestPocketImg.unwrap().options;

						return (
							<Field>
								<Select
									{...field}
									value={field.value || undefined}
									onValueChange={field.onChange}
								>
									<SelectTrigger className="h-full border-0 shadow-none focus-visible:ring-0 focus:ring-0">
										<SelectValue
											placeholder={t("chestPocket_select_chestPocketImg")}
										>
											{field.value ? (
												<div className="flex items-center gap-2">
													<img
														src={`/images/measurements/CHEST_POCKET_${field.value}.png`}
														className="w"
													/>
												</div>
											) : (
												t("chestPocket_select_chestPocketImg")
											)}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										{chestPocketImgOptions.map((val) => (
											<SelectItem value={val} key={val}>
												<div className="flex items-center gap-2">
													<img
														loading="lazy"
														src={`/images/measurements/CHEST_POCKET_${val}.png`}
														className="w-12 h-12"
													/>
													<span>
														{t("chestPocket")} {val}
													</span>
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>
						);
					}}
				/>
			</div>

			{/* JABZOOR IMAGE */}

			<div className="absolute top-[52.3%] -translate-y-1/2 right-[91.8%] font-bold translate-x-1/2 w-[10%] h-[10%] opacity-80">
				<Controller
					control={control}
					name={`items.${orderItemIndex}.jabzoorImg`}
					render={({ field, fieldState }) => {
						const jabzoorImgOptions =
							measurementSchema.shape.jabzoorImg.unwrap().options;

						return (
							<Field>
								<Select
									{...field}
									value={field.value || undefined}
									onValueChange={field.onChange}
								>
									<SelectTrigger className="h-full border-0 shadow-none focus-visible:ring-0 focus:ring-0">
										<SelectValue placeholder={t("jabzoor_select_jabzoorImg")}>
											{field.value ? (
												<div className="flex items-center gap-2">
													<img
														src={`/images/measurements/ZIPPER_${field.value}.png`}
														className="w-"
													/>
													<span>
														{t("jabzoor")} {field.value}
													</span>
												</div>
											) : (
												t("jabzoor_select_jabzoorImg")
											)}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										{jabzoorImgOptions.map((val) => (
											<SelectItem value={val} key={val}>
												<div className="flex items-center gap-2">
													<img
														loading="lazy"
														src={`/images/measurements/ZIPPER_${val}.png`}
														className="w-14 h-14"
													/>
													<span>
														{t("jabzoor")} {val}
													</span>
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>
						);
					}}
				/>
			</div>
			{watchItem("jabzoor.jabzoorHoleType") === "zip" && (
				<div className="absolute top-[52.3%] -translate-y-1/2 right-[94.8%] font-bold translate-x-1/2 w-auto opacity-80">
					<img
						loading="lazy"
						src={`/images/measurements/ZIPPER.png`}
						className="w-14 h-14"
					/>
				</div>
			)}
			{watchItem("jabzoor.jabzoorHoleType") === "buttons" && (
				<div className="absolute top-[52.3%] -translate-y-1/2 right-[94.8%] font-bold translate-x-1/2 w-auto opacity-80">
					<img
						loading="lazy"
						src={`/images/measurements/BUTTON.png`}
						className="w-10 h-10"
					/>
				</div>
			)}
			<div className="absolute top-[47%] -translate-y-1/2 right-[78%] translate-x-1/2 flex flex-col items-start gap-2">
				<Controller
					control={control}
					name={`items.${orderItemIndex}.jabzoor.jabzoorHoleType`}
					render={({ field }) => (
						<>
							<div className="flex items-center gap-2">
								<Checkbox
									id={`jabzoor-zip-${orderItemIndex}`}
									checked={field.value === "zip"}
									onCheckedChange={(checked) => {
										field.onChange(checked ? "zip" : null);
									}}
								/>
								<label
									htmlFor={`jabzoor-zip-${orderItemIndex}`}
									className="text-sm font-medium cursor-pointer"
								>
									{t("zip")}
								</label>
							</div>
							<div className="flex items-center gap-2">
								<Checkbox
									id={`jabzoor-buttons-${orderItemIndex}`}
									checked={field.value === "buttons"}
									onCheckedChange={(checked) => {
										field.onChange(checked ? "buttons" : null);
									}}
								/>
								<label
									htmlFor={`jabzoor-buttons-${orderItemIndex}`}
									className="text-sm font-medium cursor-pointer"
								>
									{t("buttons")}
								</label>
							</div>
						</>
					)}
				/>
			</div>

			{/* WRIST IMAGE */}

			<div className="absolute top-[73.5%] -translate-y-1/2 right-[92%] font-bold translate-x-1/2 w-[10.5%] h-[10.5%]">
				<Controller
					control={control}
					name={`items.${orderItemIndex}.wristImg`}
					render={({ field, fieldState }) => {
						const wristImgOptions =
							measurementSchema.shape.wristImg.unwrap().options;

						return (
							<Field>
								<Select
									{...field}
									value={field.value || undefined}
									onValueChange={field.onChange}
								>
									<SelectTrigger className="h-full border-0 shadow-none focus-visible:ring-0 focus:ring-0">
										<SelectValue placeholder={t("wrist_select_wristImg")}>
											{field.value ? (
												<div className="flex items-center gap-2">
													<img
														src={`/images/measurements/CUFF_${field.value}.png`}
														className="w-"
													/>
													<span>
														{t("wrist")} {field.value}
													</span>
												</div>
											) : (
												t("wrist_select_wristImg")
											)}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										{wristImgOptions.map((val) => (
											<SelectItem value={val} key={val}>
												<div className="flex items-center gap-2">
													<img
														loading="lazy"
														src={`/images/measurements/CUFF_${val}.png`}
														className="w-12 h-12"
													/>
													<span>
														{t("wrist")} {val}
													</span>
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>
						);
					}}
				/>
			</div>

			<div className="absolute top-[88.5%] -translate-y-1/2 right-[18%] translate-x-1/2 flex items-center gap-2">
				<Controller
					control={control}
					name={`items.${orderItemIndex}.notes`}
					render={({ field, fieldState }) => {
						const value = watch(`items.${orderItemIndex}.notes`);
						return (
							<Field>
								<FieldLabel>{t("item_notes")}</FieldLabel>
								<Textarea
									placeholder={`${t("item_notes")}...`}
									{...field}
									value={field.value || ""}
									className={` resize-none 
										  `}
									rows={3}
								/>
							</Field>
						);
					}}
				/>
			</div>

			{/* FRONT LENGTH - Input */}
			<div className="absolute top-[52.5%] -translate-y-1/2 right-[23.25%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center flex justify-center items-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalThobeLength`}
					control={control}
					name={`items.${orderItemIndex}.general.generalThobeLength`}
					render={({ field, fieldState }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* SLEEVE LENGTH - Input */}
			<div className="absolute top-[25.6%] -translate-y-1/2 right-[68.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalSleeveLength`}
					control={control}
					name={`items.${orderItemIndex}.general.generalSleeveLength`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* UPPER SLEEVE WIDTH - Input */}
			<div className="absolute top-[24.4%] -translate-y-1/2 right-[33.6%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalUpperSleeveWidth`}
					control={control}
					name={`items.${orderItemIndex}.general.generalUpperSleeveWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* BACK LENGTH - Input */}
			<div className="absolute top-[62.1%] -translate-y-1/2 right-[23.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center min-w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalThobeBackLength`}
					control={control}
					name={`items.${orderItemIndex}.general.generalThobeBackLength`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* SHOULDER WIDTH - Input */}
			<div className="absolute top-[4.2%] -translate-y-1/2 right-[37.9%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[9%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalShoulderWidth`}
					control={control}
					name={`items.${orderItemIndex}.general.generalShoulderWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* SHOULDER LEFT - Input */}
			<div className="absolute top-[9.3%] -translate-y-1/2 right-[30.7%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalShoulderLeft`}
					control={control}
					name={`items.${orderItemIndex}.general.generalShoulderLeft`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* SHOULDER RIGHT - Input */}
			<div className="absolute top-[8%] -translate-y-1/2 right-[58.6%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalShoulderRight`}
					control={control}
					name={`items.${orderItemIndex}.general.generalShoulderRight`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* TAKALEES LENGTH - Input */}
			<div className="absolute top-[38.2%] -translate-y-1/2 right-[62.9%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[17%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalTakaleesLength`}
					control={control}
					name={`items.${orderItemIndex}.general.generalTakaleesLength`}
					render={({ field }) => (
						<div className="w-full flex gap-1 items-center">
							<span>Takalees Length</span>
							<Input
								{...field}
								value={field.value || ""}
								className="p-0 text-center w-14"
							/>
						</div>
					)}
				/>
			</div>

			{/* TAKALEES WIDTH - Input */}
			<div className="absolute top-[43.2%] -translate-y-1/2 right-[62.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[17%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalTakaleesWidth`}
					control={control}
					name={`items.${orderItemIndex}.general.generalTakaleesWidth`}
					render={({ field }) => (
						<div className="w-full flex gap-1 items-center">
							<span>Takalees Width</span>

							<Input
								{...field}
								value={field.value || ""}
								className="p-0 text-center w-14"
							/>
						</div>
					)}
				/>
			</div>

			{/* MIDDLE SLEEVE WIDTH - Input */}
			<div className="absolute top-[30.1%] -translate-y-1/2 right-[28.5%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalMiddleSleeveWidth`}
					control={control}
					name={`items.${orderItemIndex}.general.generalMiddleSleeveWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* WRIST WIDTH - Input */}
			<div className="absolute top-[41.2%] -translate-y-1/2 right-[32.8%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalWristWidth`}
					control={control}
					name={`items.${orderItemIndex}.general.generalWristWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* CHEST FRONT - Input */}
			<div className="absolute top-[21.8%] -translate-y-1/2 right-[48.7%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalChestFront`}
					control={control}
					name={`items.${orderItemIndex}.general.generalChestFront`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* CHEST FULL - Input */}
			<div className="absolute top-[15%] -translate-y-1/2 right-[49.8%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalChestFull`}
					control={control}
					name={`items.${orderItemIndex}.general.generalChestFull`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* BOTTOM WIDTH - Input */}
			<div className="absolute top-[96.4%] -translate-y-1/2 right-[45.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalBottomWidth`}
					control={control}
					name={`items.${orderItemIndex}.general.generalBottomWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* CUFF BOTTOM WIDTH - Input */}
			<div className="absolute top-[90.5%] -translate-y-1/2 right-[59.3%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalCuffBottomWidth`}
					control={control}
					name={`items.${orderItemIndex}.general.generalCuffBottomWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* WAIST WIDTH - Input */}
			<div className="absolute top-[36.2%] -translate-y-1/2 right-[44.8%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalWaistWidth`}
					control={control}
					name={`items.${orderItemIndex}.general.generalWaistWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* HIP WIDTH - Input */}
			<div className="absolute top-[55.6%] -translate-y-1/2 right-[44.8%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.general.generalHipWidth`}
					control={control}
					name={`items.${orderItemIndex}.general.generalHipWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* NECK LENGTH - Input */}
			<div className="absolute top-[12%] -translate-y-1/2 right-[83.5%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.neck.neckLength`}
					control={control}
					name={`items.${orderItemIndex}.neck.neckLength`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* NECK BACK LENGTH - Input */}
			<div className="absolute top-[6.2%] -translate-y-1/2 right-[75%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[17%]">
				<Controller
					key={`items.${orderItemIndex}.neck.neckBackLength`}
					control={control}
					name={`items.${orderItemIndex}.neck.neckBackLength`}
					render={({ field }) => (
						<div className="w-full flex items-center gap-2">
							<span>Neck Back</span>{" "}
							<Input
								{...field}
								value={field.value || ""}
								className="text-center w-14 p-0"
							/>
						</div>
					)}
				/>
			</div>

			<div className="absolute top-[15.1%] -translate-y-1/2 right-[75%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[17%]">
				<Controller
					key={`items.${orderItemIndex}.neck.neckOpen`}
					control={control}
					name={`items.${orderItemIndex}.neck.neckOpen`}
					render={({ field }) => (
						<div className="w-full flex items-center gap-2">
							<span>Neck Open</span>{" "}
							<Input
								{...field}
								value={field.value || ""}
								className="text-center w-14 p-0"
							/>
						</div>
					)}
				/>
			</div>

			{/* NECK WIDTH - Input */}
			<div className="absolute top-[4.1%] -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.neck.neckWidth`}
					control={control}
					name={`items.${orderItemIndex}.neck.neckWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* NECK FILL - Input */}
			<div className="absolute top-[1.2%] -translate-y-1/2 right-[78.3%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[14%]">
				<Controller
					key={`items.${orderItemIndex}.neck.neckFill`}
					control={control}
					name={`items.${orderItemIndex}.neck.neckFill`}
					render={({ field }) => (
						<div className="w-full flex gap-1 items-center">
							<span>Collar Hashwa</span>
							<Input
								{...field}
								value={field.value || ""}
								className="text-center p-0 w-14"
							/>
						</div>
					)}
				/>
			</div>

			{/* NECK NOTES - Display */}
			<div className="absolute top-[20.1%] w-[22%] -translate-y-1/2 right-[87.3%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center whitespace-pre-line">
				<Controller
					control={control}
					name={`items.${orderItemIndex}.neck.neckNotes`}
					render={({ field, fieldState }) => {
						const value = watch(`items.${orderItemIndex}.neck.neckNotes`);
						return (
							<Field>
								<Textarea
									placeholder={`${t("neck_neckNotes")}...`}
									{...field}
									value={field.value || ""}
									className={` resize-none focus-visible:ring-0 border-0 shadow-none
										  `}
									rows={2}
								/>
							</Field>
						);
					}}
				/>
			</div>

			{/* CHEST POCKET NOTES - Display */}

			<div className="absolute top-[40.5%] w-[23%] -translate-y-1/2 right-[87%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center whitespace-pre-line">
				<Controller
					control={control}
					name={`items.${orderItemIndex}.chestPocket.chestPocketNotes`}
					render={({ field, fieldState }) => {
						const value = watch(
							`items.${orderItemIndex}.chestPocket.chestPocketNotes`,
						);
						return (
							<Field>
								<Textarea
									placeholder={`${t("chestPocket_chestPocketNotes")}...`}
									{...field}
									value={field.value || ""}
									className={`resize-none border-0 shadow-none focus-visible:ring-0`}
									rows={2}
								/>
							</Field>
						);
					}}
				/>
			</div>

			{/* JABZOOR NOTES - Display */}

			<div className="absolute top-[63.1%] w-[23%] -translate-y-1/2 right-[87.3%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center whitespace-pre-line">
				<Controller
					control={control}
					name={`items.${orderItemIndex}.jabzoor.jabzoorNotes`}
					render={({ field, fieldState }) => {
						const value = watch(`items.${orderItemIndex}.jabzoor.jabzoorNotes`);
						return (
							<Field>
								<Textarea
									placeholder={`${t("jabzoor_jabzoorNotes")}...`}
									{...field}
									value={field.value || ""}
									className={` resize-none border-0 shadow-none focus-visible:ring-0`}
									rows={2}
								/>
							</Field>
						);
					}}
				/>
			</div>

			{/* WRIST NOTES - Display */}

			<div className="absolute top-[82.4%] w-[23%] -translate-y-1/2 right-[87%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center whitespace-pre-line ">
				<Controller
					control={control}
					name={`items.${orderItemIndex}.wrist.wristNotes`}
					render={({ field, fieldState }) => {
						const value = watch(`items.${orderItemIndex}.wrist.wristNotes`);
						return (
							<Field>
								<Textarea
									placeholder={`${t("wrist_wristNotes")}...`}
									{...field}
									value={field.value || ""}
									className={`resize-none border-0 shadow-none focus-visible:ring-0 focus:ring-0`}
									rows={2}
								/>
							</Field>
						);
					}}
				/>
			</div>

			{/* CUFF LENGTH - Input */}
			<div className="absolute top-[67.9%] -translate-y-1/2 right-[86.1%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.wrist.wristCuffLength`}
					control={control}
					name={`items.${orderItemIndex}.wrist.wristCuffLength`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* CUFF WIDTH - Input */}
			<div className="absolute top-[77%] -translate-y-1/2 right-[85.2%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.wrist.wristCuffWidth`}
					control={control}
					name={`items.${orderItemIndex}.wrist.wristCuffWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* CHEST POCKET LENGTH - Input */}
			<div className="absolute top-[33%] -translate-y-1/2 right-[84.2%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.chestPocket.chestPocketLength`}
					control={control}
					name={`items.${orderItemIndex}.chestPocket.chestPocketLength`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* CHEST POCKET WIDTH - Input */}
			<div className="absolute top-[25%] -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.chestPocket.chestPocketWidth`}
					control={control}
					name={`items.${orderItemIndex}.chestPocket.chestPocketWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* BETWEEN CHEST POCKET SHOULDER - Input */}
			<div className="absolute top-[27.5%] -translate-y-1/2 right-[78.5%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[14%]">
				<Controller
					key={`items.${orderItemIndex}.chestPocket.betweenChestPocketShoulder`}
					control={control}
					name={`items.${orderItemIndex}.chestPocket.betweenChestPocketShoulder`}
					render={({ field }) => (
						<Field className="w-full flex flex-row items-center gap-0 justify-start">
							<span>Pocket Down</span>
							<Input
								{...field}
								value={field.value || ""}
								className="border  text-center shadow-none max-w-14 p-0"
							/>
						</Field>
					)}
				/>
			</div>

			{/* JABZOOR LENGTH - Input */}
			<div className="absolute top-[53.5%] -translate-y-1/2 right-[86.1%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.jabzoor.jabzoorLength`}
					control={control}
					name={`items.${orderItemIndex}.jabzoor.jabzoorLength`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* JABZOOR WIDTH - Input */}
			<div className="absolute top-[45.4%] -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.jabzoor.jabzoorWidth`}
					control={control}
					name={`items.${orderItemIndex}.jabzoor.jabzoorWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* PHONE POCKET LENGTH - Input */}
			<div className="absolute top-[92.4%] -translate-y-1/2 right-[76.3%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.sidePockets.sidePhonePocketLength`}
					control={control}
					name={`items.${orderItemIndex}.sidePockets.sidePhonePocketLength`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* PHONE POCKET WIDTH - Input */}
			<div className="absolute top-[87.4%] -translate-y-1/2 right-[81.6%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.sidePockets.sidePhonePocketWidth`}
					control={control}
					name={`items.${orderItemIndex}.sidePockets.sidePhonePocketWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* WALLET POCKET LENGTH - Input */}
			<div className="absolute top-[92.5%] -translate-y-1/2 right-[88.6%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.sidePockets.sideWalletPocketLength`}
					control={control}
					name={`items.${orderItemIndex}.sidePockets.sideWalletPocketLength`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* WALLET POCKET WIDTH - Input */}
			<div className="absolute top-[87.4%] -translate-y-1/2 right-[94%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center w-[8%]">
				<Controller
					key={`items.${orderItemIndex}.sidePockets.sideWalletPocketWidth`}
					control={control}
					name={`items.${orderItemIndex}.sidePockets.sideWalletPocketWidth`}
					render={({ field }) => (
						<Field className="w-full">
							<Input
								{...field}
								value={field.value || ""}
								className="border-0 focus:outline-none focus:border-0 focus:ring-0 focus-visible:ring-0 text-center shadow-none"
							/>
						</Field>
					)}
				/>
			</div>

			{/* THOBE IMAGE */}
			<img alt="thobe" src="/images/thobe.png" className="w-full h-auto" />
		</div>
	);
};
