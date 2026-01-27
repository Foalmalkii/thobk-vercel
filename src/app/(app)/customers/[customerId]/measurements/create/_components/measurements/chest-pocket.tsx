import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import z from "zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { chestPocketInfoAtom } from "@/lib/atoms";
import { InputsGrid } from "../layout/inputs-grid";
import { CreateMeasurementSectionContainer } from "../layout/section-container";
import { measurementSchema } from "./schema";

export const ChestPocketMeasurementInfo = () => {
	const { watch, register, control } = useFormContext();
	const chestValues = watch("chestPocket");
	const [_, setChestPocketInfo] = useAtom(chestPocketInfoAtom);
	const t = useTranslations("measurements");
	return (
		<CreateMeasurementSectionContainer>
			<h1 className="text-xl font-bold">تفاصيل جيب الصدر</h1>
			<InputsGrid>
				<Controller
					control={control}
					name="chestPocketImg"
					render={({ field, fieldState }) => {
						const chestPocketImgOptions =
							measurementSchema.shape.chestPocketImg.unwrap().options;

						return (
							<Field>
								<FieldLabel>
									{t("chestPocket_select_chestPocketImg")}
								</FieldLabel>
								<Select {...field} onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder="choose">
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
					const fieldZod =
						measurementSchema.shape.chestPocket.shape[
							key as keyof typeof measurementSchema.shape.chestPocket.shape
						];

					// If it's a ZodEnum, render a Select
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
								name={`chestPocket.${key}`}
								key={`chestPocket.${key}`}
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

					// Otherwise, render a regular Input for numbers

					const value = watch(`chestPocket.${key}`);
					return (
						<Controller
							key={`chestPocket.${key}`}
							control={control}
							name={`chestPocket.${key}`}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>{t(`chestPocket_${key}`)}</FieldLabel>
									<Input
										placeholder={`${t(`chestPocket_${key}`)}...`}
										{...field}
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
		</CreateMeasurementSectionContainer>
	);
};
