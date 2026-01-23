"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/auth";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export const LoginForm = () => {
	const t = useTranslations("auth");
	const loginSchema = z.object({
		email: z.string().email({ message: t("v_email_email") }),
		password: z.string().min(5),
	});

	type FormData = z.infer<typeof loginSchema>;

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(loginSchema),
	});

	const { login } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/",
	});

	const onSubmit = async (data: FormData) => {
		await login(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-4">
				<Controller
					control={control}
					name="email"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>{t("email")}</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								type="email"
								placeholder="faisal@digip.sa"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					control={control}
					name="password"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>{t("password")}</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								type="password"
								placeholder={t("enter_password")}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Button
					disabled={isSubmitting}
					className="mt-8 rounded-xl w-full"
					type="submit"
				>
					{t("login")}
				</Button>
			</div>
		</form>
	);
};
