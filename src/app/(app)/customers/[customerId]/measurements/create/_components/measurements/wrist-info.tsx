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
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import z from "zod";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { measurementSchema } from "./schema";
import { useAtom } from "jotai";
import { wristInfoAtom } from "@/lib/atoms";
import { Field, FieldLabel } from "@/components/ui/field";

export const WristInfro = () => {
	const { watch, register, control } = useFormContext();
	const wristValues = watch("wrist");
	const t = useTranslations("measurements");

	const [_, setWristInfo] = useAtom(wristInfoAtom);
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl font-bold">تفاصيل المعصم</h1>
			<div className="grid grid-cols-4 gap-4 w-full">
				<Controller
					control={control}
					name="wristImg"
					render={({ field, fieldState }) => {
						const wristImgOptions =
							measurementSchema.shape.wristImg.unwrap().options;

						return (
							<Field>
								<FieldLabel>صورة جيب الصدر</FieldLabel>
								<Select {...field} onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder="choose">
											{field.value ? (
												<div className="flex items-center gap-2">
													<img
														src={`/images/measurements/CUFF_${field.value}.png`}
														className="w-12 h-12"
													/>
													<span>كفة {field.value}</span>
												</div>
											) : (
												"choose"
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
													<span>كفة {val}</span>
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>
						);
					}}
				/>
				{Object.keys(wristValues).map((key) => {
					const fieldZod =
						measurementSchema.shape.wrist.shape[
							key as keyof typeof measurementSchema.shape.wrist.shape
						];
					let unwrappedZod: any = fieldZod;
					while (
						unwrappedZod instanceof z.ZodNullable ||
						unwrappedZod instanceof z.ZodOptional
					) {
						unwrappedZod = unwrappedZod.unwrap();
					}
					// If it's a ZodEnum, render a Select
					if (unwrappedZod instanceof z.ZodEnum) {
						return (
							<Controller
								name={`wrist.${key}`}
								control={control}
								render={({ field }) => (
									<Field>
										<FieldLabel>{t(`wrist_${key}`)}</FieldLabel>
										<Select
											value={field.value || undefined}
											onValueChange={(value) => {
												field.onChange(value);

												setWristInfo((prev) => ({ ...prev, [key]: value })); // update jotai
												console.log(_);
											}}
										>
											<SelectTrigger
												className={
													field.value &&
													"border-blue-700 bg-blue-100 focus:outline-0 focus-visible:ring-0"
												}
											>
												<SelectValue
													placeholder={t(`wrist_select_${key}`)}
													className="truncate"
												/>
											</SelectTrigger>

											<SelectContent>
												<SelectGroup>
													{unwrappedZod.options.map(
														(option: string | number) => (
															<SelectItem key={option} value={option as string}>
																{t(`wrist_${key}_${option}`)}
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

					const value = watch(`wrist.${key}`);
					return (
						<Controller
							key={`wrist.${key}`}
							control={control}
							name={`wrist.${key}`}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>{t(`wrist_${key}`)}</FieldLabel>
									<Input
										placeholder={`${t(`wrist_${key}`)}...`}
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
			</div>
		</div>
	);
};
