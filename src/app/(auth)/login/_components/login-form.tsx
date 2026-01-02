"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/auth";

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
				<div className="grid gap-1">
					<Label htmlFor="email">
						<span className="text-red-600">*</span>
						{t("email")}
					</Label>
					<Input
						{...register("email")}
						type="email"
						placeholder="faisal@digip.sa"
						error={errors?.email && true}
					/>
					<span className="text-red-600 text-sm">{errors?.email?.message}</span>
				</div>

				<div className="grid gap-1">
					<Label htmlFor="password">
						<span className="text-red-600">*</span>
						{t("password")}
					</Label>
					<Input
						{...register("password")}
						type="password"
						placeholder={t("password")}
						error={errors?.password && true}
					/>
					<span className="text-red-600 text-sm">
						{errors?.password?.message}
					</span>
				</div>
			</div>

			<Button
				disabled={isSubmitting}
				className="mt-8 rounded-xl w-full"
				type="submit"
			>
				{t("login")}
			</Button>
		</form>
	);
};
