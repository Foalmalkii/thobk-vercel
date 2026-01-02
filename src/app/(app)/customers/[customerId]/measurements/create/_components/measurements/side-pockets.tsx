import React from "react";
import { CreateMeasurementSectionContainer } from "../layout/section-container";
import { useFormContext } from "react-hook-form";
import { InputsGrid } from "../layout/inputs-grid";
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export const SidePocketsMeasurementsInfo = () => {
	const { watch, register } = useFormContext();
	const sidePocketsValues = watch("sidePockets");
	const t = useTranslations("measurements");
	return (
		<CreateMeasurementSectionContainer>
			<h1 className="text-xl font-bold">تفاصيل جيوب الثوب</h1>

			<InputsGrid>
				{Object.keys(sidePocketsValues ?? {}).map((key) => (
					<InputWrapper className="w-full" key={key}>
						<Label>{t(`sidePockets_${key}`)}</Label>
						<Input type="text" {...register(`sidePockets.${key}`)} />
					</InputWrapper>
				))}
			</InputsGrid>
		</CreateMeasurementSectionContainer>
	);
};
