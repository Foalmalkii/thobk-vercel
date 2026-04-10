"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { useAuth } from "@/hooks/auth";

type LoginFn = ReturnType<typeof useAuth>["login"];

export const LoginForm = ({ login }: { login: LoginFn }) => {
	const t = useTranslations("auth");

	const loginSchema = z.object({
		phone: z
			.string()
			.regex(/^05\d{8}$/, {
				message: t("v_phone_invalid"),
			})
			.length(10, {
				message: t("v_phone_length"),
			}),
		password: z.string().min(5, {
			message: t("v_password_min"),
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

	const onSubmit = async (data: FormData) => {
		try {
			await login(data);
		} catch (error: any) {
			// Handle server-side errors
			if (error.response?.status === 422) {
				const serverErrors = error.response.data.errors;
				const message = error.response.data.message;

				// Check if it's an auth.failed error
				if (
					message === "auth.failed" ||
					serverErrors?.phone?.[0] === "auth.failed"
				) {
					setError("root", {
						type: "server",
						message: t("error_invalid_credentials"),
					});
					return;
				}

				// Handle other validation errors
				if (serverErrors?.phone) {
					setError("phone", {
						type: "server",
						message: serverErrors.phone[0],
					});
				}

				if (serverErrors?.password) {
					setError("password", {
						type: "server",
						message: serverErrors.password[0],
					});
				}
			} else if (error.response?.data?.message) {
				// General error message
				setError("root", {
					type: "server",
					message: error.response.data.message,
				});
			} else {
				// Network or unknown errors
				setError("root", {
					type: "server",
					message: t("error_network"),
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
				<p className="text-center text-xs text-slate-400">
					{t("sla_disclaimer")}{" "}
					<Link href="/sla" className="underline hover:text-slate-600">
						{t("sla_link")}
					</Link>
					{" "}{t("and")}{" "}
					<Link href="/terms-and-conditions" className="underline hover:text-slate-600">
						{t("terms_link")}
					</Link>
				</p>
			</div>
		</form>
	);
};
