import { zodResolver } from "@hookform/resolvers/zod";
import { useDirection } from "@radix-ui/react-direction";
import { useTranslations } from "next-intl";
import type React from "react";
import type { SetStateAction } from "react";
import { useMemo } from "react";
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
} from "@/components/ui/dialog";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Input } from "@/components/ui/input";
import { useBranches } from "@/hooks/branches";
import axios from "@/lib/axios";

const baseBranchSchema = z.object({
	name: z.string(),
	streetAddress: z.string(),
	phone: z.string(),
	email: z.string(),
	buildingNumber: z.string(),
	additionalNumber: z.string(),
	postalCode: z.string(),
	countryId: z.number(),
	stateId: z.number(),
	cityId: z.number(),
	districtId: z.number(),
	type: z.enum(["store", "factory"]),
});

export type branchRequest = z.infer<typeof baseBranchSchema>;

export const NewBranchDialog = ({
	isAdmin,
	open,
	setOpen,
}: {
	isAdmin: boolean;
	open: boolean;
	setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
	const t = useTranslations("messages");
	const dir = useDirection();

	const branchSchema = useMemo(
		() =>
			z.object({
				name: z.string().nonempty(t("v_required")),
				streetAddress: z.string().nonempty(t("v_required")),
				phone: z
					.string()
					.nonempty(t("v_required"))
					.regex(/^05\d{8}$/, t("v_phone_invalid")),
				email: z.email({ message: t("v_email_invalid") }),
				buildingNumber: z.string().nonempty(t("v_required")),
				additionalNumber: z.string().nonempty(t("v_required")),
				postalCode: z.string().nonempty(t("v_required")),
				countryId: z.number().min(1, t("v_select_required")),
				stateId: z.number().min(1, t("v_select_required")),
				cityId: z.number().min(1, t("v_select_required")),
				districtId: z.number().min(1, t("v_select_required")),
				type: z.enum(["store", "factory"]),
			}),
		[t],
	);

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { isSubmitting },
	} = useForm<branchRequest>({
		resolver: zodResolver(branchSchema),
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
			type: "store",
		},
	});

	const countryId = watch("countryId");
	const stateId = watch("stateId");
	const cityId = watch("cityId");

	const { mutateBranches } = useBranches();

	const addBranch = async (data: branchRequest): Promise<boolean> => {
		const status = await axios
			.post("/api/v1/branch", data)
			.then((res) => res.status)
			.catch((e) => console.log(e));

		if (status === 200 || status === 201) {
			mutateBranches();
			return true;
		} else return false;
	};

	const submitBranch = async (data: branchRequest) => {
		const resultBranch = await addBranch(data);
		if (resultBranch) setOpen(false);
	};

	return (
		<Dialog open={open && isAdmin} onOpenChange={setOpen}>
			<DialogContent dir={dir} className="max-h-[90vh] flex flex-col">
				<form onSubmit={handleSubmit(submitBranch)} className="flex flex-col gap-6 min-h-0">
					<DialogHeader className="shrink-0">
						<DialogTitle>{t("add_branch")}</DialogTitle>
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
						<Button type="submit" disabled={isSubmitting}>
							{t("add_branch")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
