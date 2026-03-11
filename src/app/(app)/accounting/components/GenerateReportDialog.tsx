"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useDirection } from "@radix-ui/react-direction";
import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { FormWrapper } from "@/components/ui/form-wrapper";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import axios from "@/lib/axios";

const reportSchema = z.object({
	startDate: z.string().nonempty(),
	endDate: z.string().nonempty(),
});

type ReportRequest = z.infer<typeof reportSchema>;

interface GenerateReportDialogProps {
	onCreated?: () => void;
}

export const GenerateReportDialog = ({ onCreated }: GenerateReportDialogProps) => {
	const t = useTranslations("accounting");
	const dir = useDirection();
	const [open, setOpen] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { isSubmitting },
	} = useForm<ReportRequest>({
		resolver: zodResolver(reportSchema),
		defaultValues: {
			startDate: "",
			endDate: "",
		},
	});

	const startDate = watch("startDate");

	const onSubmit = async (data: ReportRequest) => {
		const status = await axios
			.post("/api/v1/accounting", data)
			.then((res) => res.status)
			.catch((e) => console.error(e));

		if (status === 200 || status === 201) {
			reset();
			setOpen(false);
			onCreated?.();
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{t("generate_report")}</Button>
			</DialogTrigger>
			<DialogContent dir={dir}>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<DialogHeader>
						<DialogTitle>{t("generate_report")}</DialogTitle>
					</DialogHeader>

					<FormWrapper>
						<FieldGroup>
							<Controller
								control={control}
								name="startDate"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("start_date")}</FieldLabel>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={
														field.value
															? "border-blue-600 bg-blue-100 hover:bg-blue-100 text-blue-600 hover:text-blue-600"
															: undefined
													}
												>
													<CalendarIcon />
													<span>
														{field.value ? field.value : t("start_date")}
													</span>
												</Button>
											</PopoverTrigger>
											<PopoverContent>
												<Calendar
													dir="ltr"
													mode="single"
													timeZone="Asia/Riyadh"
													selected={field.value ? new Date(field.value) : undefined}
													onSelect={(date) =>
														field.onChange(date?.toISOString().slice(0, 10))
													}
												/>
											</PopoverContent>
										</Popover>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={control}
								name="endDate"
								render={({ field, fieldState }) => (
									<Field aria-invalid={fieldState.invalid}>
										<FieldLabel>{t("end_date")}</FieldLabel>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={
														field.value
															? "border-blue-600 bg-blue-100 hover:bg-blue-100 text-blue-600 hover:text-blue-600"
															: undefined
													}
												>
													<CalendarIcon />
													<span>
														{field.value ? field.value : t("end_date")}
													</span>
												</Button>
											</PopoverTrigger>
											<PopoverContent>
												<Calendar
													dir="ltr"
													mode="single"
													timeZone="Asia/Riyadh"
													disabled={
														startDate
															? { before: new Date(startDate) }
															: undefined
													}
													selected={field.value ? new Date(field.value) : undefined}
													onSelect={(date) =>
														field.onChange(date?.toISOString().slice(0, 10))
													}
												/>
											</PopoverContent>
										</Popover>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
						</FieldGroup>
					</FormWrapper>

					<DialogFooter>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? t("generating") : t("generate_report")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
