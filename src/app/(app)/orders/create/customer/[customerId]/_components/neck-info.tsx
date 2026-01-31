import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import z from "zod";
import { InputsGrid } from "@/app/(app)/customers/[customerId]/measurements/create/_components/layout/inputs-grid";
import { measurementSchema } from "@/app/(app)/customers/[customerId]/measurements/create/_components/measurements/schema";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { neckInfoAtom } from "@/lib/atoms";

export const NeckMeasurementInfo = ({
	orderItemIndex,
}: {
	orderItemIndex: number;
}) => {
	const { register, watch, control } = useFormContext();
	const neckValues = watch(`items.${orderItemIndex}.neck`) || {};
	const t = useTranslations("measurements");
	const [_, setNeckInfo] = useAtom(neckInfoAtom);

	useEffect(() => {
		console.log(_);
	}, [_]);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl font-bold">{t("neck")}</h1>
			<InputsGrid>
				<Controller
					control={control}
					name={`items.${orderItemIndex}.neckImg`}
					render={({ field, fieldState }) => {
						const neckImgOptions =
							measurementSchema.shape.neckImg.unwrap().options;

						return (
							<Field>
								<FieldLabel>{t("neck_select_neckImg")}</FieldLabel>
								<Select
									{...field}
									value={field.value || undefined}
									onValueChange={field.onChange}
								>
									<SelectTrigger>
										<SelectValue placeholder={t("neck_select_neckImg")}>
											{field.value ? (
												<div className="flex items-center gap-2">
													<img
														src={`/images/measurements/NECK_${field.value}.png`}
														className="w-12 h-12"
													/>
													<span>
														{t("neck")} {field.value}
													</span>
												</div>
											) : (
												t("neck_select_neckImg")
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
													<span>
														{t("neck")} {val}
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
				{Object.keys(neckValues).map((key) => {
					// Skip neckNotes here as it will be rendered separately
					if (key === "neckNotes") return null;

					const fieldZod =
						measurementSchema.shape.neck.shape[
							key as keyof typeof measurementSchema.shape.neck.shape
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
								name={`items.${orderItemIndex}.neck.${key}`}
								key={`items.${orderItemIndex}.neck.${key}`}
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

					const value = watch(`items.${orderItemIndex}.neck.${key}`);
					return (
						<Controller
							key={`items.${orderItemIndex}.neck.${key}`}
							control={control}
							name={`items.${orderItemIndex}.neck.${key}`}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>{t(`neck_${key}`)}</FieldLabel>
									<Input
										placeholder={`${t(`neck_${key}`)}...`}
										{...field}
										value={field.value || ""}
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

			{/* Render neckNotes as textarea outside the grid */}
			{Object.hasOwn(neckValues, "neckNotes") && (
				<Controller
					control={control}
					name={`items.${orderItemIndex}.neck.neckNotes`}
					render={({ field, fieldState }) => {
						const value = watch(`items.${orderItemIndex}.neck.neckNotes`);
						return (
							<Field>
								<FieldLabel>{t("neck_neckNotes")}</FieldLabel>
								<Textarea
									placeholder={`${t("neck_neckNotes")}...`}
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
		</div>
	);
};
