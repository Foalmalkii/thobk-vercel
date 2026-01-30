import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export const PickupOrder = () => {
	const orderForm = useFormContext();
	const dueDate = orderForm.watch("dueDate");
	const t = useTranslations("order");

	return (
		<Controller
			name="dueDate"
			control={orderForm.control}
			render={({ field }) => (
				<Field>
					<FieldLabel>{t("expected_delivery_date")}</FieldLabel>

					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={
									dueDate &&
									"border-blue-600 bg-blue-100 hover:bg-blue-100 text-blue-600 hover:text-blue-600"
								}
							>
								<CalendarIcon />
								{dueDate ? (
									<span>{dueDate}</span>
								) : (
									<span>{t("select_date")}</span>
								)}
							</Button>
						</PopoverTrigger>

						<PopoverContent>
							<Calendar
								dir="ltr"
								mode="single"
								disabled={{ before: new Date() }}
								timeZone="Asia/Riyadh"
								onSelect={(date) =>
									field.onChange(date?.toISOString().slice(0, 10))
								}
								selected={dueDate ? new Date(dueDate) : undefined}
							/>
						</PopoverContent>
					</Popover>
				</Field>
			)}
		/>
	);
};
