import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import z from "zod";
import { InputsGrid } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/inputs-grid";
import { CreateMeasurementSectionContainer } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/section-container";
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
import { jabzoorInfoAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { measurementSchema } from "./EditMeasurementSchema";

export const EditJabzoorMeasurementInfo = ({
	orderItemIndexNumber,
}: {
	orderItemIndexNumber: number;
}) => {
	const { watch, register, control } = useFormContext();
	const t = useTranslations("measurements");

	const jabzoorValues = watch(
		`items.${orderItemIndexNumber}.measurement.jabzoor`,
	);

	const [_, setJabzoorInfo] = useAtom(jabzoorInfoAtom);

	return (
		<CreateMeasurementSectionContainer>
			<h1 className="text-xl font-bold">تفاصيل الجبزور</h1>

			<InputsGrid>
				<Controller
					control={control}
					name={`items.${orderItemIndexNumber}.measurement.jabzoorImg`}
					render={({ field, fieldState }) => {
						const jabzoorImgOptions =
							measurementSchema.shape.jabzoorImg.unwrap().options;

						return (
							<Field>
								<FieldLabel>صورة جيب الصدر</FieldLabel>
								<Select {...field} onValueChange={field.onChange}>
									<SelectTrigger
										className={
											field.value &&
											"border-blue-700 bg-blue-100 text-blue-700 focus:ring-blue-700"
										}
									>
										<SelectValue placeholder="choose">
											{field.value ? (
												<div className="flex items-center gap-2">
													<img
														src={`/images/measurements/ZIPPER_${field.value}.png`}
														className="w-20 h-20 rotate-90"
													/>
													<span>
														{field.value > 4 ? "أزرار" : "جبزور"} {field.value}
													</span>
												</div>
											) : (
												"choose"
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
														{val > 4 ? "أزرار" : "جبزور"} {val}
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
				{Object.keys(jabzoorValues).map((key) => {
					const fieldZod =
						measurementSchema.shape.jabzoor.shape[
							key as keyof typeof measurementSchema.shape.jabzoor.shape
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
								name={`items.${orderItemIndexNumber}.measurement.jabzoor.${key}`}
								render={({ field }) => {
									return (
										<Field>
											<FieldLabel>{t(`jabzoor_${key}`)}</FieldLabel>
											<Select
												{...field}
												value={field.value || undefined}
												onValueChange={(value) => {
													field.onChange(value);
													setJabzoorInfo((prev) => ({ ...prev, [key]: value }));
												}}
											>
												<SelectTrigger
													className={
														field.value &&
														"border-blue-700 bg-blue-100 focus:ring-blue-700"
													}
												>
													<SelectValue
														className="truncate"
														placeholder={t(`jabzoor_select_${key}`)}
													/>
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{unwrappedZod.options.map(
															(option: string | number) => (
																<SelectItem
																	key={option}
																	value={option as string}
																>
																	{t(`jabzoor_${key}_${option}`)}
																</SelectItem>
															),
														)}
													</SelectGroup>
												</SelectContent>
											</Select>
										</Field>
									);
								}}
							/>
						);
					}

					// Otherwise, render a regular Input for numbers

					const value = watch(
						`items.${orderItemIndexNumber}.measurement.jabzoor.${key}`,
					);
					return (
						<InputWrapper className="w-full" key={key}>
							<Label>{t(`jabzoor_${key}`)}</Label>
							<Input
								placeholder={`${t(`jabzoor_${key}`)}...`}
								{...register(
									`items.${orderItemIndexNumber}.measurement.jabzoor.${key}`,
								)}
								className={
									value &&
									"border-blue-700 bg-blue-100 focus:outline-0 focus-visible:ring-0"
								}
							/>
						</InputWrapper>
					);
				})}
			</InputsGrid>
		</CreateMeasurementSectionContainer>
	);
};
