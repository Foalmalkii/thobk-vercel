import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const PickupOrder = () => {
	const orderForm = useFormContext();
	const dueDate = orderForm.watch("dueDate");
	return (
		<Controller
			name="dueDate"
			control={orderForm.control}
			render={({ field }) => (
				<Field>
					<FieldLabel>تاريخ التسليم المتوقع</FieldLabel>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={
									dueDate &&
									"border-blue-600 bg-blue-100 hover:bg-blue-100 text-blue-600 hover:text-blue-600"
								}
							>
								<CalendarIcon />
								{dueDate ? <span>{dueDate}</span> : <span>تحديد تاريخ</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<Calendar
								dir="ltr"
								mode="single"
								disabled={{ before: new Date() }}
								timeZone="Asia/Riyadh"
								onSelect={(date) => {
									console.log(date);
									console.log("in iso", date?.toISOString());
									field.onChange(date?.toISOString().slice(0, 10));
								}}
								selected={dueDate}
							/>
						</PopoverContent>
					</Popover>
				</Field>
			)}
		/>
	);
};
