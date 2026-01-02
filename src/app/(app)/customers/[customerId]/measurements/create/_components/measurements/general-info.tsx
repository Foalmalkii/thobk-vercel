import { Input } from "@/components/ui/input";
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext } from "react-hook-form";
import { InputsGrid } from "../layout/inputs-grid";
import { CreateMeasurementSectionContainer } from "../layout/section-container";

export const GeneralMeasurementInfo = () => {
	const { register, watch } = useFormContext();
	const generalValues = watch("general");
	const t = useTranslations("measurements");
	return (
		<CreateMeasurementSectionContainer>
			<h1 className="text-xl font-bold">المواصفات العامة</h1>
			<InputsGrid>
				{Object.keys(generalValues ?? {}).map((key) => (
					<InputWrapper key={key}>
						<Label>{t(`general_${key}`)}</Label>
						<Input type="text" {...register(`general.${key}`)} />
					</InputWrapper>
				))}
			</InputsGrid>
		</CreateMeasurementSectionContainer>
	);
};
