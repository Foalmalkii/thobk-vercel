import React from "react";
import { useFormContext } from "react-hook-form";
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { InputsGrid } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/inputs-grid";
import { CreateMeasurementSectionContainer } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/section-container";

export const SidePocketsMeasurementsInfo = ({
	orderItemIndex,
}: {
	orderItemIndex: number;
}) => {
	const { watch, register } = useFormContext();
	const sidePocketsValues = watch(`items.${orderItemIndex}.sidePockets`);
	const t = useTranslations("measurements");

	return (
		<CreateMeasurementSectionContainer>
			<h1 className="text-xl font-bold">تفاصيل جيوب الثوب</h1>

			<InputsGrid>
				{Object.keys(sidePocketsValues ?? {}).map((key) => {
					const value = watch(`items.${orderItemIndex}.sidePockets.${key}`);
					return (
						<InputWrapper className="w-full" key={key}>
							<Label>{t(`sidePockets_${key}`)}</Label>
							<Input
								placeholder={`${t(`sidePockets_${key}`)}...`}
								type="text"
								{...register(`items.${orderItemIndex}.sidePockets.${key}`)}
								value={value || ""}
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
