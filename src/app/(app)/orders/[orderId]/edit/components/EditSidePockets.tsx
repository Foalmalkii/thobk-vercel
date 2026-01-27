import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext } from "react-hook-form";
import { InputsGrid } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/inputs-grid";
import { CreateMeasurementSectionContainer } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/section-container";
import { Input } from "@/components/ui/input";
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Label } from "@/components/ui/label";

export const EditSidePocketsMeasurementsInfo = ({
	orderItemIndexNumber,
}: {
	orderItemIndexNumber: number;
}) => {
	const { watch, register } = useFormContext();
	const sidePocketsValues = watch(
		`items.${orderItemIndexNumber}.measurement.sidePockets`,
	);
	const t = useTranslations("measurements");
	return (
		<CreateMeasurementSectionContainer>
			<h1 className="text-xl font-bold">{t("sidePockets")}</h1>

			<InputsGrid>
				{Object.keys(sidePocketsValues ?? {}).map((key) => {
					const value = watch(
						`items.${orderItemIndexNumber}.measurement.sidePockets.${key}`,
					);
					return (
						<InputWrapper className="w-full" key={key}>
							<Label>{t(`sidePockets_${key}`)}</Label>
							<Input
								placeholder={`${t(`sidePockets_${key}`)}...`}
								type="text"
								{...register(
									`items.${orderItemIndexNumber}.measurement.sidePockets.${key}`,
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
