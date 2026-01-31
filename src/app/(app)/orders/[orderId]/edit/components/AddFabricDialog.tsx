// Update the AddFabricDialog component

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { mutate } from "swr";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";

interface AddFabricDialogProps {
	onFabricCreated?: (fabricId: number) => void;
	action?: React.ReactNode;
}

export const AddFabricDialog = ({
	onFabricCreated,
	action,
}: AddFabricDialogProps) => {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { isInBranch } = useAuth({ middleware: "auth" });
	const t = useTranslations("fabric");

	const batchSchema = z.object({
		sku: z.string().min(1, t("sku_required")),
		initialLength: z.string().min(1, t("initial_length_required")),
		remainingLength: z.string().min(1, t("remaining_length_required")),
		costPerMeter: z.string().min(1, t("cost_per_meter_required")),
	});

	const fabricSchema = z.object({
		name: z.string().min(1, t("name_required")),
		supplier: z.string().min(1, t("supplier_required")),
		type: z.string().default("fabric"), // Always fabric
		color: z.string().min(1, t("color_required")),
		batches: z.array(batchSchema).min(1, t("batches_required")),
	});

	type FabricFormData = z.infer<typeof fabricSchema>;

	const form = useForm<FabricFormData>({
		resolver: zodResolver(fabricSchema),
		defaultValues: {
			name: "",
			supplier: "",
			type: "fabric", // Default to fabric
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
			const response = await axios.post(
				`/api/v1/branch/${isInBranch}/stock`,
				data,
			);

			// Get the created fabric ID from response
			const createdFabricId = response.data?.data?.id;

			// Refresh the fabric list in all components using SWR
			await mutate(`/api/v1/branch/${isInBranch}/stock`);

			// Notify parent component
			if (createdFabricId && onFabricCreated) {
				onFabricCreated(createdFabricId);
			}

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
				{action ? (
					action
				) : (
					<Button size={"icon"} variant={"outline"} type="button">
						<PlusIcon />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{t("add_new_fabric")}</DialogTitle>
				</DialogHeader>

				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>
										{t("fabric_name")}
									</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder={t("fabric_name_placeholder")}
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
									<FieldLabel htmlFor={field.name}>{t("supplier")}</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder={t("supplier_placeholder")}
										autoComplete="off"
									/>
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
									<FieldLabel htmlFor={field.name}>{t("color")}</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder={t("color_placeholder")}
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
							<h3 className="text-lg font-semibold">{t("batches")}</h3>
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
								<PlusIcon className="w-4 h-4 mr-2" />
								{t("add_batch")}
							</Button>
						</div>

						{fields.map((field, index) => (
							<div
								key={field.id}
								className="p-4 border rounded-lg space-y-4 bg-muted/30"
							>
								<div className="flex items-center justify-between mb-2">
									<h4 className="font-medium">
										{t("batch_number", { number: index + 1 })}
									</h4>
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
												<FieldLabel htmlFor={field.name}>{t("sku")}</FieldLabel>
												<Input
													{...field}
													id={field.name}
													aria-invalid={fieldState.invalid}
													placeholder={t("sku_placeholder")}
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
													{t("cost_per_meter")}
												</FieldLabel>
												<Input
													{...field}
													id={field.name}
													type="number"
													step="0.01"
													aria-invalid={fieldState.invalid}
													placeholder={t("cost_per_meter_placeholder")}
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
													{t("initial_length")}
												</FieldLabel>
												<Input
													{...field}
													id={field.name}
													type="number"
													step="0.01"
													aria-invalid={fieldState.invalid}
													placeholder={t("initial_length_placeholder")}
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
													{t("remaining_length")}
												</FieldLabel>
												<Input
													{...field}
													id={field.name}
													type="number"
													step="0.01"
													aria-invalid={fieldState.invalid}
													placeholder={t("remaining_length_placeholder")}
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
							{isLoading ? t("adding") : t("add")}
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
							{t("cancel")}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
