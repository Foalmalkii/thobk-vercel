"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useDirection } from "@radix-ui/react-direction";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { CitySelect } from "@/components/address/CitySelect";
import { CountrySelect } from "@/components/address/CountrySelect";
import { DistrictSelect } from "@/components/address/DistrictSelect";
import { StateSelect } from "@/components/address/StateSelect";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axios";

const factorySchema = z.object({
	name: z.string().nonempty(),
	streetAddress: z.string().nonempty(),
	phone: z
		.string()
		.nonempty()
		.regex(/^05\d{8}$/, { message: "Invalid phone" }),
	email: z.email(),
	buildingNumber: z.string().nonempty(),
	additionalNumber: z.string().nonempty(),
	postalCode: z.string().nonempty(),
	countryId: z.number().min(1),
	stateId: z.number().min(1),
	cityId: z.number().min(1),
	districtId: z.number().min(1),
});

type FactoryRequest = z.infer<typeof factorySchema>;

interface AddFactoryDialogProps {
	onCreated?: () => void;
}

export const AddFactoryDialog = ({ onCreated }: AddFactoryDialogProps) => {
	const t = useTranslations("messages");
	const tf = useTranslations("factory");
	const dir = useDirection();
	const [open, setOpen] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { isSubmitting },
	} = useForm<FactoryRequest>({
		resolver: zodResolver(factorySchema),
		defaultValues: {
			name: "",
			streetAddress: "",
			phone: "",
			email: "",
			buildingNumber: "",
			additionalNumber: "",
			postalCode: "",
			countryId: 0,
			stateId: 0,
			cityId: 0,
			districtId: 0,
		},
	});

	const countryId = watch("countryId");
	const stateId = watch("stateId");
	const cityId = watch("cityId");

	const onSubmit = async (data: FactoryRequest) => {
		const status = await axios
			.post("/api/v1/branch", { ...data, type: "factory" })
			.then((res) => res.status)
			.catch((e) => console.error(e));

		if (status === 200 || status === 201) {
			reset();
			setOpen(false);
			onCreated?.();
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{tf("create_factory")}</Button>
			</DialogTrigger>
			<DialogContent dir={dir} className="max-h-[90vh] flex flex-col">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 min-h-0">
					<DialogHeader className="shrink-0">
						<DialogTitle>{tf("create_factory")}</DialogTitle>
					</DialogHeader>

					<div className="overflow-y-auto min-h-0">
					<FormWrapper>
						<FieldGroup>
							<Controller
								control={control}
								name="name"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("branch_name")}</FieldLabel>
										<Input {...field} aria-invalid={fieldState.invalid} />
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={control}
								name="streetAddress"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("streetAdress")}</FieldLabel>
										<Input {...field} aria-invalid={fieldState.invalid} />
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={control}
								name="phone"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("phone")}</FieldLabel>
										<Input {...field} aria-invalid={fieldState.invalid} />
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={control}
								name="email"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("email")}</FieldLabel>
										<Input {...field} aria-invalid={fieldState.invalid} />
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<div className="flex gap-4">
								<Controller
									control={control}
									name="buildingNumber"
									render={({ field, fieldState }) => (
										<Field aria-invalid={fieldState.invalid}>
											<FieldLabel>{t("buildingNumber")}</FieldLabel>
											<Input {...field} aria-invalid={fieldState.invalid} />
											<FieldError errors={[fieldState.error]} />
										</Field>
									)}
								/>
								<Controller
									control={control}
									name="additionalNumber"
									render={({ field, fieldState }) => (
										<Field aria-invalid={fieldState.invalid}>
											<FieldLabel>{t("additionalNumber")}</FieldLabel>
											<Input {...field} aria-invalid={fieldState.invalid} />
											<FieldError errors={[fieldState.error]} />
										</Field>
									)}
								/>
							</div>
							<Controller
								control={control}
								name="postalCode"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("postalCode")}</FieldLabel>
										<Input {...field} aria-invalid={fieldState.invalid} />
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={control}
								name="countryId"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("country")}</FieldLabel>
										<CountrySelect
											value={field.value || null}
											onChange={(val) => {
												field.onChange(val);
												setValue("stateId", 0);
												setValue("cityId", 0);
												setValue("districtId", 0);
											}}
										/>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={control}
								name="stateId"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("state")}</FieldLabel>
										<StateSelect
											value={field.value || null}
											onChange={(val) => {
												field.onChange(val);
												setValue("cityId", 0);
												setValue("districtId", 0);
											}}
											countryId={countryId || null}
										/>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={control}
								name="cityId"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("city")}</FieldLabel>
										<CitySelect
											value={field.value || null}
											onChange={(val) => {
												field.onChange(val);
												setValue("districtId", 0);
											}}
											countryId={countryId || null}
											stateId={stateId || null}
										/>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={control}
								name="districtId"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("district")}</FieldLabel>
										<DistrictSelect
											value={field.value || null}
											onChange={field.onChange}
											countryId={countryId || null}
											stateId={stateId || null}
											cityId={cityId || null}
										/>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
						</FieldGroup>
					</FormWrapper>
					</div>

					<DialogFooter className="shrink-0">
						<Button
							onClick={handleSubmit(onSubmit)}
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? t("loading") : tf("create_factory")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
