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

export const WristInfro = () => {
	const { watch, register, control } = useFormContext();
	const wristValues = watch("wrist");
	const t = useTranslations("measurements");

	const [_, setWristInfo] = useAtom(wristInfoAtom);
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl font-bold">تفاصيل المعصم</h1>
			<div className="grid grid-cols-4 gap-4 w-full">
				{Object.keys(wristValues).map((key) => {
					const fieldZod =
						measurementSchema.shape.wrist.shape[
							key as keyof typeof measurementSchema.shape.wrist.shape
						];

					// If it's a ZodEnum, render a Select
					if (fieldZod instanceof z.ZodEnum) {
						return (
							<InputWrapper className="w-full" key={key}>
								<Label>{t(`wrist_${key}`)}</Label>

								<Controller
									name={`wrist.${key}`}
									control={control}
									render={({ field }) => (
										<Select
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);

												setWristInfo((prev) => ({ ...prev, [key]: value })); // update jotai
												console.log(_);
											}}
										>
											<SelectTrigger>
												<SelectValue
													placeholder={`Select ${key}`}
													className="truncate"
												/>
											</SelectTrigger>

											<SelectContent>
												<SelectGroup>
													{fieldZod.options.map((option) => (
														<SelectItem key={option} value={option}>
															{t(`wrist_${key}_${option}`)}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								/>
							</InputWrapper>
						);
					}

					// Otherwise, render a regular Input for numbers
					return (
						<InputWrapper className="w-full" key={key}>
							<Label>{t(`wrist_${key}`)}</Label>
							<Input {...register(`wrist.${key}`)} />
						</InputWrapper>
					);
				})}
			</div>
		</div>
	);
};
