"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useDirection } from "@radix-ui/react-direction";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
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

const employeeSchema = z.object({
	name: z.string().nonempty(),
	address: z.string().nonempty(),
	phone: z
		.string()
		.nonempty()
		.regex(/^05\d{8}$/, { message: "Invalid phone" }),
	email: z.email(),
	password: z.string().min(6),
});

type EmployeeRequest = z.infer<typeof employeeSchema>;

interface AddEmployeeDialogProps {
	branchId: number;
	onCreated?: () => void;
}

export const AddEmployeeDialog = ({ branchId, onCreated }: AddEmployeeDialogProps) => {
	const t = useTranslations("erp");
	const tm = useTranslations("messages");
	const dir = useDirection();
	const [open, setOpen] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<EmployeeRequest>({
		resolver: zodResolver(employeeSchema),
		defaultValues: {
			name: "",
			address: "",
			phone: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: EmployeeRequest) => {
		try {
			await axios.post(`/api/v1/branch/${branchId}/employee`, data);
			toast.success(t("create_employee_success"));
			reset();
			setOpen(false);
			onCreated?.();
		} catch {
			toast.error(t("create_employee_error"));
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{t("create_employee")}</Button>
			</DialogTrigger>
			<DialogContent dir={dir}>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<DialogHeader>
						<DialogTitle>{t("create_employee")}</DialogTitle>
					</DialogHeader>

					<FormWrapper>
						<FieldGroup>
							<Controller
								control={control}
								name="name"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("employee_name")}</FieldLabel>
										<Input {...field} aria-invalid={fieldState.invalid} />
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={control}
								name="address"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("employee_address")}</FieldLabel>
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
										<FieldLabel>{t("employee_phone")}</FieldLabel>
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
										<FieldLabel>{t("employee_email")}</FieldLabel>
										<Input {...field} type="email" aria-invalid={fieldState.invalid} />
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={control}
								name="password"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("employee_password")}</FieldLabel>
										<Input {...field} type="password" aria-invalid={fieldState.invalid} />
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
						</FieldGroup>
					</FormWrapper>

					<DialogFooter>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? tm("loading") : t("create_employee")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
