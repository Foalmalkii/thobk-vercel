import React, { SetStateAction } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { useLocale, useTranslations } from "next-intl";
import { getDirection } from "@/lib/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/lib/axios";
import { useBranches } from "@/hooks/branches";

export const CreateCustomer = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
	const t = useTranslations("createCustomer");
	const locale = useLocale();

	const customerSchema = z.object({
		name: z.string().nonempty(t("v_name_name")),
		phone: z
			.string()
			.nonempty()
			.regex(/^05\d{8}$/, { message: "Invalid phone" }),
		notes: z.string().nonempty(),
	});

	type customerFormData = z.infer<typeof customerSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<customerFormData>({
		resolver: zodResolver(customerSchema),
	});

	const { getCurrentBranch } = useBranches();
	const submitForm = async (data: customerFormData) => {
		await axios
			.post(`/api/v1/branch/${getCurrentBranch()?.id}/customer`, data)
			.then((res) => {
				console.log(res);
				if (res.status === 201) setOpen(false);
			})
			.catch((e) => console.log(e));
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent dir={getDirection(locale)}>
				<DialogHeader>
					<DialogTitle>{t("new_customer")}</DialogTitle>
					<DialogDescription>{t("new_customer_description")}</DialogDescription>
				</DialogHeader>

				<div className="mt-8">
					<form onSubmit={handleSubmit(submitForm)}>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label>
									<span className="text-red-600">*</span>
									{t("name")}
								</Label>
								<div>
									<Input
										{...register("name")}
										type="text"
										placeholder={t("enter_name")}
										error={errors?.name && true}
									/>
									<p className="text-xs text-red-600">
										- {errors?.name?.message}
									</p>
								</div>
							</div>

							<div className="grid gap-2">
								<Label>
									<span className="text-red-600">*</span>
									{t("phone")}
								</Label>
								<Input
									type="tel"
									dir={getDirection(locale)}
									placeholder={t("enter_phone")}
									{...register("phone")}
									error={errors?.phone && true}
								/>
							</div>

							<div className="grid gap-2">
								<Label>{t("notes")}</Label>
								<Textarea
									placeholder={t("enter_notes")}
									{...register("notes")}
									className={`${errors?.notes && "border-red-600"}`}
								/>
							</div>
						</div>
						<div className="w-full mt-8 flex justify-end">
							<Button>{t("submit")}</Button>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
