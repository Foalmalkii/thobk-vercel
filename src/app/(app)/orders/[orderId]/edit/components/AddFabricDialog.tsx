import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PlusIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "@/lib/axios";
import { useAuth } from "@/hooks/auth";

const batchSchema = z.object({
	sku: z.string().min(1, "رقم التعريف مطلوب"),
	initialLength: z.string().min(1, "الطول الأولي مطلوب"),
	remainingLength: z.string().min(1, "الطول المتبقي مطلوب"),
	costPerMeter: z.string().min(1, "التكلفة للمتر مطلوبة"),
});

const fabricSchema = z.object({
	name: z.string().min(1, "اسم القماش مطلوب"),
	supplier: z.string().min(1, "اسم المورد مطلوب"),
	type: z.string().min(1, "نوع المنتج مطلوب"),
	color: z.string().min(1, "اللون مطلوب"),
	batches: z.array(batchSchema).min(1, "يجب إضافة دفعة واحدة على الأقل"),
});

type FabricFormData = z.infer<typeof fabricSchema>;

export const AddFabricDialog = () => {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { isInBranch } = useAuth({ middleware: "auth" });

	const form = useForm<FabricFormData>({
		resolver: zodResolver(fabricSchema),
		defaultValues: {
			name: "",
			supplier: "",
			type: "fabric",
			color: "",
			batches: [
				{
					sku: "",
					initialLength: "",
					remainingLength: "",
					costPerMeter: "",
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "batches",
	});

	const onSubmit = async (data: FabricFormData) => {
		setIsLoading(true);
		try {
			// Replace with your actual API call
			// const response = await axios.post(`/api/v1/branch/${branchNumber}/stock`, data);
			console.log("Form data:", data);
			await axios
				.post(`/api/v1/branch/${isInBranch}/stock`, data)
				.then((res) => console.log(res))
				.catch((e) => console.error(e));
			// Reset form and close dialog on success
			form.reset();
			setOpen(false);
		} catch (error) {
			console.error("Error adding fabric:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size={"icon"} variant={"outline"}>
					<PlusIcon />
				</Button>
			</DialogTrigger>
			<DialogContent
				className="max-w-3xl max-h-[90vh] overflow-y-auto"
				dir="rtl"
			>
				<DialogHeader>
					<DialogTitle>إضافة قماش جديد</DialogTitle>
				</DialogHeader>

				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>اسم القماش</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder="سميراميس"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="supplier"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>المورد</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder="جريسي"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="type"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>نوع المنتج</FieldLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger
											id={field.name}
											aria-invalid={fieldState.invalid}
										>
											<SelectValue placeholder="اختر النوع" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="fabric">قماش</SelectItem>
											<SelectItem value="accessory">إكسسوار</SelectItem>
											<SelectItem value="button">زر</SelectItem>
										</SelectContent>
									</Select>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="color"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>اللون</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder="أبيض"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold">الدفعات</h3>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() =>
									append({
										sku: "",
										initialLength: "",
										remainingLength: "",
										costPerMeter: "",
									})
								}
							>
								<PlusIcon className="w-4 h-4 ml-2" />
								إضافة دفعة
							</Button>
						</div>

						{fields.map((field, index) => (
							<div
								key={field.id}
								className="p-4 border rounded-lg space-y-4 bg-muted/30"
							>
								<div className="flex items-center justify-between mb-2">
									<h4 className="font-medium">دفعة {index + 1}</h4>
									{fields.length > 1 && (
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => remove(index)}
										>
											<Trash2Icon className="w-4 h-4 text-destructive" />
										</Button>
									)}
								</div>

								<div className="grid grid-cols-2 gap-4">
									<Controller
										name={`batches.${index}.sku`}
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor={field.name}>
													رقم التعريف (SKU)
												</FieldLabel>
												<Input
													{...field}
													id={field.name}
													aria-invalid={fieldState.invalid}
													placeholder="SFH201937"
													autoComplete="off"
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									<Controller
										name={`batches.${index}.costPerMeter`}
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor={field.name}>
													التكلفة للمتر
												</FieldLabel>
												<Input
													{...field}
													id={field.name}
													type="number"
													step="0.01"
													aria-invalid={fieldState.invalid}
													placeholder="50.00"
													autoComplete="off"
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									<Controller
										name={`batches.${index}.initialLength`}
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor={field.name}>
													الطول الأولي (متر)
												</FieldLabel>
												<Input
													{...field}
													id={field.name}
													type="number"
													step="0.01"
													aria-invalid={fieldState.invalid}
													placeholder="300.00"
													autoComplete="off"
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									<Controller
										name={`batches.${index}.remainingLength`}
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor={field.name}>
													الطول المتبقي (متر)
												</FieldLabel>
												<Input
													{...field}
													id={field.name}
													type="number"
													step="0.01"
													aria-invalid={fieldState.invalid}
													placeholder="270.00"
													autoComplete="off"
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
							</div>
						))}
					</div>

					<div className="flex gap-3 pt-4">
						<Button type="submit" disabled={isLoading} className="flex-1">
							{isLoading ? "جاري الإضافة..." : "إضافة"}
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								form.reset();
								setOpen(false);
							}}
							disabled={isLoading}
							className="flex-1"
						>
							إلغاء
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
