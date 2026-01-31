import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import z from "zod";
import { InputsGrid } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/inputs-grid";
import { CreateMeasurementSectionContainer } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/section-container";
import { measurementSchema } from "@/app/(app)/customers/[customerId]/measurements/create/_components/measurements/schema";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { chestPocketInfoAtom } from "@/lib/atoms";

export const ChestPocketMeasurementInfo = ({
	orderItemIndex,
}: {
	orderItemIndex: number;
}) => {
	const { watch, register, control } = useFormContext();
	const chestValues = watch(`items.${orderItemIndex}.chestPocket`);
	const [_, setChestPocketInfo] = useAtom(chestPocketInfoAtom);
	const t = useTranslations("measurements");

	return (
		<CreateMeasurementSectionContainer>
			<h1 className="text-xl font-bold">{t("chestPocket")}</h1>
			<InputsGrid>
				<Controller
					control={control}
					name={`items.${orderItemIndex}.chestPocketImg`}
					render={({ field, fieldState }) => {
						const chestPocketImgOptions =
							measurementSchema.shape.chestPocketImg.unwrap().options;

						return (
							<Field>
								<FieldLabel>
									{t("chestPocket_select_chestPocketImg")}
								</FieldLabel>
								<Select
									{...field}
									value={field.value || undefined}
									onValueChange={field.onChange}
								>
									<SelectTrigger>
										<SelectValue
											placeholder={t("chestPocket_select_chestPocketImg")}
										>
											{field.value ? (
												<div className="flex items-center gap-2">
													<img
														src={`/images/measurements/CHEST_POCKET_${field.value}.png`}
														className="w-7 h-7"
													/>
													<span>
														{t("chestPocket")} {field.value}
													</span>
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
				{Object.keys(chestValues ?? {}).map((key) => {
					// Skip chestPocketNotes here as it will be rendered separately
					if (key === "chestPocketNotes") return null;

					const fieldZod =
						measurementSchema.shape.chestPocket.shape[
							key as keyof typeof measurementSchema.shape.chestPocket.shape
						];

					let unwrappedZod: any = fieldZod;
					while (
						unwrappedZod instanceof z.ZodNullable ||
						unwrappedZod instanceof z.ZodOptional
					) {
						unwrappedZod = unwrappedZod.unwrap();
					}

					if (unwrappedZod instanceof z.ZodEnum) {
						return (
							<Controller
								control={control}
								name={`items.${orderItemIndex}.chestPocket.${key}`}
								key={`items.${orderItemIndex}.chestPocket.${key}`}
								render={({ field: { onChange, ...field }, fieldState }) => (
									<Field>
										<FieldLabel>{t(`chestPocket_${key}`)}</FieldLabel>
										<Select
											value={field.value || undefined}
											onValueChange={(value) => {
												setChestPocketInfo((previous) => ({
													...previous,
													[key]: value,
												}));
												onChange(value);
											}}
										>
											<SelectTrigger
												aria-invalid={fieldState.invalid}
												className={
													field.value &&
													"border-blue-700 bg-blue-100 focus:outline-0 focus-visible:ring-0"
												}
											>
												<SelectValue
													placeholder={t(`chestPocket_select_${key}`)}
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{unwrappedZod.options.map(
														(option: string | number) => (
															<SelectItem key={option} value={option as string}>
																{t(`chestPocket_${key}_${option}`)}
															</SelectItem>
														),
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
									</Field>
								)}
							/>
						);
					}

					const value = watch(`items.${orderItemIndex}.chestPocket.${key}`);
					return (
						<Controller
							key={`items.${orderItemIndex}.chestPocket.${key}`}
							control={control}
							name={`items.${orderItemIndex}.chestPocket.${key}`}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>{t(`chestPocket_${key}`)}</FieldLabel>
									<Input
										placeholder={`${t(`chestPocket_${key}`)}...`}
										{...field}
										value={field.value || ""}
										className={
											value &&
											"border-blue-700 bg-blue-100 focus:outline-0 focus-visible:ring-0"
										}
									/>
								</Field>
							)}
						/>
					);
				})}
			</InputsGrid>

			{/* Render chestPocketNotes as textarea outside the grid */}
			{chestValues?.hasOwnProperty("chestPocketNotes") && (
				<Controller
					control={control}
					name={`items.${orderItemIndex}.chestPocket.chestPocketNotes`}
					render={({ field, fieldState }) => {
						const value = watch(
							`items.${orderItemIndex}.chestPocket.chestPocketNotes`,
						);
						return (
							<Field>
								<FieldLabel>{t("chestPocket_chestPocketNotes")}</FieldLabel>
								<Textarea
									placeholder={`${t("chestPocket_chestPocketNotes")}...`}
									{...field}
									value={field.value || ""}
									className={
										value &&
										"border-blue-700 bg-blue-100 focus:outline-0 focus-visible:ring-0"
									}
									rows={4}
								/>
							</Field>
						);
					}}
				/>
			)}
		</CreateMeasurementSectionContainer>
	);
};
