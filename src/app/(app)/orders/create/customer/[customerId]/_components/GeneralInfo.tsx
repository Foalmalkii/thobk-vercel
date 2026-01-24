import { Field, FieldError } from "@/components/ui/field";
import React from "react";
import { PickupOrder } from "./PickupOrder";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

export const GeneralInfo = () => {
	const orderForm = useFormContext();
	const t = useTranslations("order");
	const notes = orderForm.watch("notes");

	return (
		<div className="rounded-xl p-6 border">
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
