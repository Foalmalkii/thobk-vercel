import { Input } from "@/components/ui/input";
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldLabel } from "@/components/ui/field";
import { CreateMeasurementSectionContainer } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/section-container";
import { InputsGrid } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/inputs-grid";

export const EditGeneralMeasurementInfo = ({
	orderItemIndexNumber,
}: {
	orderItemIndexNumber: number;
}) => {
	const form = useFormContext();
	const generalValues = form.watch(
		`items.${orderItemIndexNumber}.measurement.general`,
	);
	const t = useTranslations("measurements");
	return (
		<CreateMeasurementSectionContainer>
			<h1 className="text-xl font-bold">المواصفات العامة</h1>
			<InputsGrid>
				{Object.keys(generalValues ?? {}).map((key) => {
					const value = form.watch(
						`items.${orderItemIndexNumber}.measurement.general.${key}`,
					);
					return (
						/*<InputWrapper key={key}>
							
							<Label>{t(`general_${key}`)}</Label>
							<Input
								placeholder={`${t(`general_${key}`)}...`}
								{...register(`general.${key}`)}
								className={
									value &&
									"border-blue-700 bg-blue-100 focus:outline-0 focus-visible:ring-0"
								}
							/>
						</InputWrapper>*/
						<Controller
							key={`items.${orderItemIndexNumber}.measurement.general.${key}`}
							control={form.control}
							name={`items.${orderItemIndexNumber}.measurement.general.${key}`}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>{t(`general_${key}`)}</FieldLabel>
									<Input
										placeholder={`${t(`general_${key}`)}...`}
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
