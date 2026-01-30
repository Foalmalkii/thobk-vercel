"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/auth";

export const LoginForm = () => {
	const t = useTranslations("auth");

	const loginSchema = z.object({
		phone: z
			.string()
			.regex(/^05\d{8}$/, {
				message: t("v_phone_invalid"), // "Phone must start with 05 and be 10 digits"
			})
			.length(10, {
				message: t("v_phone_length"), // "Phone must be exactly 10 digits"
			}),
		password: z.string().min(5, {
			message: t("v_password_min"), // "Password must be at least 5 characters"
		}),
	});

	type FormData = z.infer<typeof loginSchema>;

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<FormData>({
		resolver: zodResolver(loginSchema),
	});

	const { login } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/",
	});

	const onSubmit = async (data: FormData) => {
		try {
			await login(data);
		} catch (error: any) {
			// Handle server-side errors
			if (error.response?.data?.errors) {
				// Laravel validation errors
				const serverErrors = error.response.data.errors;

				if (serverErrors.phone) {
					setError("phone", {
						type: "server",
						message: serverErrors.phone[0],
					});
				}

				if (serverErrors.password) {
					setError("password", {
						type: "server",
						message: serverErrors.password[0],
					});
				}
			} else if (error.response?.data?.message) {
				// General error message (e.g., "Invalid credentials")
				setError("root", {
					type: "server",
					message: error.response.data.message,
				});
			} else {
				// Network or unknown errors
				setError("root", {
					type: "server",
					message: t("error_network"), // "An error occurred. Please try again."
				});
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-4">
				{errors.root && (
					<div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
						{errors.root.message}
					</div>
				)}

				<Controller
					control={control}
					name="phone"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>{t("phone")}</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								type="tel"
								placeholder="0512345678"
								maxLength={10}
								inputMode="numeric"
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
					{isSubmitting ? t("logging_in") : t("login")}
				</Button>
			</div>
		</form>
	);
};
