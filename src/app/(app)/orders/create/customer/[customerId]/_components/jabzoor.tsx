import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import z from "zod";
import { InputsGrid } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/inputs-grid";
import { CreateMeasurementSectionContainer } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/section-container";
import { measurementSchema } from "@/app/(app)/customers/[customerId]/measurements/create/_components/measurements/schema";
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
import { Textarea } from "@/components/ui/textarea";
import { jabzoorInfoAtom } from "@/lib/atoms";

export const JabzoorMeasurementInfo = ({
	orderItemIndex,
}: {
	orderItemIndex: number;
}) => {
	const { watch, register, control } = useFormContext();
	const t = useTranslations("measurements");
	const jabzoorValues = watch(`items.${orderItemIndex}.jabzoor`);
	const [_, setJabzoorInfo] = useAtom(jabzoorInfoAtom);

	return (
		<CreateMeasurementSectionContainer>
			<h1 className="text-xl font-bold">{t("jabzoor")}</h1>

			<InputsGrid>
				<Controller
					control={control}
					name={`items.${orderItemIndex}.jabzoorImg`}
					render={({ field, fieldState }) => {
						const jabzoorImgOptions =
							measurementSchema.shape.jabzoorImg.unwrap().options;

						return (
							<Field>
								<FieldLabel>{t("jabzoor_select_jabzoorImg")}</FieldLabel>
								<Select
									{...field}
									value={field.value || undefined}
									onValueChange={field.onChange}
								>
									<SelectTrigger
										className={
											field.value &&
											"border-blue-700 bg-blue-100 text-blue-700 focus:ring-blue-700"
										}
									>
										<SelectValue placeholder={t("jabzoor_select_jabzoorImg")}>
											{field.value ? (
												<div className="flex items-center gap-2">
													<img
														src={`/images/measurements/ZIPPER_${field.value}.png`}
														className="w-20 h-20 rotate-90"
													/>
													<span>
														{t("jabzoor")} {field.value}
													</span>
												</div>
											) : (
												t("jabzoor_select_jabzoorImg")
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
														{t("jabzoor")} {val}
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
				{Object.keys(jabzoorValues ?? {}).map((key) => {
					// Skip jabzoorNotes here as it will be rendered separately
					if (key === "jabzoorNotes") return null;

					const fieldZod =
						measurementSchema.shape.jabzoor.shape[
							key as keyof typeof measurementSchema.shape.jabzoor.shape
						];

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
								name={`items.${orderItemIndex}.jabzoor.${key}`}
								key={`items.${orderItemIndex}.jabzoor.${key}`}
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

					const value = watch(`items.${orderItemIndex}.jabzoor.${key}`);
					return (
						<InputWrapper className="w-full" key={key}>
							<Label>{t(`jabzoor_${key}`)}</Label>
							<Input
								placeholder={`${t(`jabzoor_${key}`)}...`}
								{...register(`items.${orderItemIndex}.jabzoor.${key}`)}
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

			{/* Render jabzoorNotes as textarea outside the grid */}
			{jabzoorValues?.hasOwnProperty("jabzoorNotes") && (
				<Controller
					control={control}
					name={`items.${orderItemIndex}.jabzoor.jabzoorNotes`}
					render={({ field, fieldState }) => {
						const value = watch(`items.${orderItemIndex}.jabzoor.jabzoorNotes`);
						return (
							<Field>
								<FieldLabel>{t("jabzoor_jabzoorNotes")}</FieldLabel>
								<Textarea
									placeholder={`${t("jabzoor_jabzoorNotes")}...`}
									{...field}
									value={field.value || ""}
									className={
										value &&
										"border-blue-700 bg-blue-100 focus:outline-0 focus-visible:ring-0"
									}
									rows={4}
								/>
							</Field>
						);
					}}
				/>
			)}
		</CreateMeasurementSectionContainer>
	);
};
