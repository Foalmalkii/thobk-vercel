"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { LoginForm } from "./_components/login-form";
import { useAuth } from "@/hooks/auth";
import { Spinner } from "@/components/ui/spinner";
import { Loading } from "@/components/layout/loading";

export default function Login() {
	const t = useTranslations("auth");
	const { isLoading, isValidating, user } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/",
	});

	if (isLoading || isValidating || user) return <Loading />;
	return (
		<div className="border rounded-lg max-md:w-[95%] mx-auto max-w-[440px] px-10 py-8">
			<div className="grid gap-8">
				<div className="grid gap-4 text-center">
					<h1 className="font-medium font-size-4xl">{t("welcome")}</h1>
					<p className="text-slate-700 font-size-sm">
						{t("enter_credentials")}
					</p>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
