import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { PickupOrder } from "./PickupOrder";

export const GeneralInfo = () => {
	const orderForm = useFormContext();
	const t = useTranslations("order");
	const notes = orderForm.watch("notes");

	return (
		<div className="rounded-xl p-6 border bg-white">
			<div className="flex justify-between w-full">
				<div className="flex flex-col gap-1">
					<h1 className="font-bold text-lg">{t("general_notes_title")}</h1>
					<p className="text-muted-foreground text-sm">
						{t("general_notes_description")}
					</p>
				</div>

				<div>
					<PickupOrder />
				</div>
			</div>

			<div className="mt-4">
				<Controller
					name="notes"
					control={orderForm.control}
					render={({ field, fieldState }) => (
						<Field aria-invalid={fieldState.invalid}>
							<Textarea
								{...field}
								placeholder={t("general_notes_placeholder")}
								rows={6}
								aria-invalid={fieldState.invalid}
							/>
							<FieldError errors={[fieldState.error]} />
						</Field>
					)}
				/>
			</div>
		</div>
	);
};
