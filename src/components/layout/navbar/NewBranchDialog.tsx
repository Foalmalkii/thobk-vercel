import { zodResolver } from "@hookform/resolvers/zod";
import { useDirection } from "@radix-ui/react-direction";
import { Asterisk } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type React from "react";
import { type SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { mutate } from "swr";
import z from "zod";
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
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Label } from "@/components/ui/label";
import { useBranches } from "@/hooks/branches";
import axios from "@/lib/axios";

const branchSchema = z.object({
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
	countryId: z.number(),
	stateId: z.number(),
	cityId: z.number(),
	districtId: z.number(),
});
export type branchRequest = z.infer<typeof branchSchema>;

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

	const {
		control,
		handleSubmit,
		formState: { errors },
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
			countryId: 1,
			stateId: 1,
			cityId: 1,
			districtId: 1,
		},
	});

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
		else return;
	};

	useEffect(() => {
		console.log(errors);
	}, [errors]);

	return (
		<Dialog open={open && isAdmin} onOpenChange={setOpen}>
			<form onSubmit={handleSubmit(submitBranch)}>
				<DialogContent dir="rtl" className="gap-6">
					<DialogHeader>
						<DialogTitle>{t("add_branch")}</DialogTitle>
					</DialogHeader>

					<FormWrapper>
						<FieldGroup>
							<Controller
								control={control}
								name="name"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel> {t("branch_name")}</FieldLabel>
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
										<FieldLabel> {t("streetAdress")}</FieldLabel>
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
										<FieldLabel> {t("phone")}</FieldLabel>
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
										<FieldLabel> {t("email")}</FieldLabel>
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
											<FieldLabel> {t("buildingNumber")}</FieldLabel>
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
											<FieldLabel> {t("additionalNumber")}</FieldLabel>
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
										<FieldLabel> {t("postalCode")}</FieldLabel>
										<Input {...field} aria-invalid={fieldState.invalid} />
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
						</FieldGroup>
					</FormWrapper>

					<DialogFooter>
						<Button onClick={handleSubmit(submitBranch)} type="submit">
							{t("add_branch")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
};
