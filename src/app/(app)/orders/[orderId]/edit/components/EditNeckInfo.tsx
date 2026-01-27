import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import z from "zod";
import { InputsGrid } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/inputs-grid";
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
import { neckInfoAtom } from "@/lib/atoms";
import { editMeasurementSchema, editOrderSchema } from "../page";
import { measurementSchema } from "./EditMeasurementSchema";

export const EditNeckMeasurementInfo = ({
	orderItemIndexNumber,
}: {
	orderItemIndexNumber: number;
}) => {
	const { register, watch, control } = useFormContext();
	const neckValues =
		watch(`items.${orderItemIndexNumber}.measurement.neck`) || {};
	const t = useTranslations("measurements");
	const [_, setNeckInfo] = useAtom(neckInfoAtom);

	useEffect(() => {
		console.log(_);
	}, [_]);
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl font-bold">مواصفات الرقبة</h1>
			<InputsGrid>
				<Controller
					control={control}
					name={`items.${orderItemIndexNumber}.measurement.neckImg`}
					render={({ field, fieldState }) => {
						const neckImgOptions =
							editMeasurementSchema.neckImg.unwrap().options;

						return (
							<Field>
								<FieldLabel>صورة الرقبة</FieldLabel>
								<Select {...field} onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder="choose">
											{field.value ? (
												<div className="flex items-center gap-2">
													<img
														src={`/images/measurements/NECK_${field.value}.png`}
														className="w-12 h-12"
													/>
													<span>الرقبة {field.value}</span>
												</div>
											) : (
												"choose"
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
													<span>الرقبة {val}</span>
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>
						);
					}}
				/>
				{Object.keys(neckValues).map((key) => {
					const fieldZod =
						editMeasurementSchema.neck.shape[
							key as keyof typeof editMeasurementSchema.neck.shape
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
								name={`items.${orderItemIndexNumber}.measurement.neck.${key}`}
								key={`items.${orderItemIndexNumber}.measurement.neck.${key}`}
								render={({
									field: { onChange, value, ...field },
									fieldState,
								}) => (
									<Field>
										<FieldLabel>{t(`neck_${key}`)}</FieldLabel>
										<Select
											{...field}
											value={value || undefined}
											onValueChange={(value) => {
												setNeckInfo((previous) => ({
													...previous,
													[key]: value,
												}));
												onChange(value);
											}}
										>
											<SelectTrigger
												className={
													value &&
													"border-blue-700 bg-blue-100 focus:outline-0 focus-visible:ring-0"
												}
												aria-invalid={fieldState.invalid}
											>
												<SelectValue placeholder={t(`neck_select_${key}`)} />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{unwrappedZod.options.map(
														(option: string | number) => (
															<SelectItem key={option} value={option as string}>
																{t(`neck_${key}_${option}`)}
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

					const value = watch(
						`items.${orderItemIndexNumber}.measurement.neck.${key}`,
					);
					return (
						<Controller
							key={`items.${orderItemIndexNumber}.measurement.neck.${key}`}
							control={control}
							name={`items.${orderItemIndexNumber}.measurement.neck.${key}`}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>{t(`neck_${key}`)}</FieldLabel>
									<Input
										placeholder={`${t(`neck_${key}`)}...`}
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
		</div>
	);
};
