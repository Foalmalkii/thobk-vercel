import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const PickupOrder = () => {
	const orderForm = useFormContext();
	const dueDate = orderForm.watch("dueDate");
	const t = useTranslations("order");
	const hasError = !!orderForm.formState.errors.dueDate;

	return (
		<Controller
			name="dueDate"
			control={orderForm.control}
			render={({ field }) => (
				<Field data-invalid={hasError}>
					<FieldLabel>{t("expected_delivery_date")}</FieldLabel>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									// Default state
									"w-full justify-start text-left font-normal",
									// Error state
									hasError &&
										"border-orange-600 bg-orange-50 hover:bg-orange-50 text-orange-600 hover:text-orange-600 focus-visible:ring-orange-600",
									// Selected state (when no error)
									!hasError &&
										dueDate &&
										"border-blue-600 bg-blue-100 hover:bg-blue-100 text-blue-600 hover:text-blue-600",
									// Placeholder state
									!dueDate && "text-muted-foreground",
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{dueDate ? (
									<span>{dueDate}</span>
								) : (
									<span>{t("select_date")}</span>
								)}
							</Button>
						</PopoverTrigger>

						<PopoverContent className="w-auto p-0" align="start">
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
