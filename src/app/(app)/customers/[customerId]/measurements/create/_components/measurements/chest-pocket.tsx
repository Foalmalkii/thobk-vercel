import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CreateMeasurementSectionContainer } from "../layout/section-container";
import { InputsGrid } from "../layout/inputs-grid";
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
import { Input } from "@/components/ui/input";
import { measurementSchema } from "./schema";
import { useTranslations } from "next-intl";
import z from "zod";

export const ChestPocketMeasurementInfo = () => {
	const { watch, register, control } = useFormContext();
	const chestValues = watch("chestPocket");

	const t = useTranslations("measurements");
	return (
		<CreateMeasurementSectionContainer>
			<h1 className="text-xl font-bold">تفاصيل جيب الصدر</h1>
			<InputsGrid>
				{Object.keys(chestValues).map((key) => {
					const field =
						measurementSchema.shape.chestPocket.shape[
							key as keyof typeof measurementSchema.shape.chestPocket.shape
						];

					// If it's a ZodEnum, render a Select
					if (field instanceof z.ZodEnum) {
						return (
							<InputWrapper className="w-full" key={key}>
								<Label>{t(`chestPocket_${key}`)}</Label>

								<Select {...register(`chestPocket.${key}`)}>
									<SelectTrigger className="">
										<SelectValue
											className="truncate"
											placeholder={t(`chestPocket_select_${key}`)}
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{field.options.map((option) => (
												<SelectItem key={option} value={option}>
													{t(`chestPocket_${key}_${option}`)}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</InputWrapper>
						);
					}

					// Otherwise, render a regular Input for numbers
					return (
						<InputWrapper className="w-full" key={key}>
							<Label>{t(`chestPocket_${key}`)}</Label>
							<Input placeholder="قم" {...register(`chestPocket.${key}`)} />
						</InputWrapper>
					);
				})}
			</InputsGrid>
		</CreateMeasurementSectionContainer>
	);
};
