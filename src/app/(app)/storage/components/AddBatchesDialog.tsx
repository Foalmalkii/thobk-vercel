// app/(app)/storage/components/AddBatchesDialog.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2Icon, PackagePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { mutate } from "swr";
import { toast } from "sonner";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth";
import { useGetStock } from "@/hooks/stock/getStock";
import axios from "@/lib/axios";

interface AddBatchesDialogProps {
	stockId: number;
	branchId: number;
}

export const AddBatchesDialog = ({
	stockId,
	branchId,
}: AddBatchesDialogProps) => {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { isInBranch } = useAuth({ middleware: "auth" });
	const t = useTranslations("fabric");

	const { stock, loadingStock } = useGetStock({
		branchId: branchId,
		stockId: stockId,
	});

	const batchSchema = z.object({
		sku: z.string().min(1, t("sku_required")),
		initialLength: z.string().min(1, t("initial_length_required")),
		remainingLength: z.string().min(1, t("remaining_length_required")),
		costPerMeter: z.string().min(1, t("cost_per_meter_required")),
	});

	const batchesSchema = z.object({
		batches: z.array(batchSchema).min(1, t("batches_required")),
	});

	type BatchesFormData = z.infer<typeof batchesSchema>;

	const form = useForm<BatchesFormData>({
		resolver: zodResolver(batchesSchema),
		defaultValues: {
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

	// Reset form when dialog closes
	useEffect(() => {
		if (!open) {
			form.reset({
				batches: [
					{
						sku: "",
						initialLength: "",
						remainingLength: "",
						costPerMeter: "",
					},
				],
			});
		}
	}, [open, form]);

	const onSubmit = async (data: BatchesFormData) => {
		setIsLoading(true);
		try {
			await axios.post(`/api/v1/branch/${isInBranch}/stock/${stockId}`, data);

			// Refresh stock lists
			await mutate([`list_stock`, isInBranch]);
			await mutate(["get_stock", branchId, stockId]);

			toast.success(t("batches_added_successfully"), {
				position: "top-center",
			});

			form.reset();
			setOpen(false);
		} catch (error: any) {
			console.error("Error adding batches:", error);
			toast.error(t("error_adding_batches"), {
				description: error?.response?.data?.message,
				position: "top-center",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" className="gap-2">
					<PackagePlus className="w-4 h-4" />
					{t("add_batches")}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-xl">
						{t("add_batches_to")} {stock?.name}
					</DialogTitle>
					<p className="text-sm text-muted-foreground">
						{stock?.type} • {stock?.color} • {stock?.supplier}
					</p>
				</DialogHeader>

				{loadingStock ? (
					<div className="py-8 text-center">
						<p className="text-muted-foreground">{t("loading")}</p>
					</div>
				) : (
					<div className="space-y-6">
						{/* Existing Batches */}
						{stock?.batches && stock.batches.length > 0 && (
							<div className="space-y-3">
								<h3 className="text-sm font-semibold text-slate-700">
									{t("existing_batches")} ({stock.batches.length})
								</h3>
								<div className="space-y-2 max-h-48 overflow-y-auto">
									{stock.batches.map((batch, index) => (
										<div
											key={batch.id}
											className="p-3 bg-slate-50 rounded-lg border border-slate-200"
										>
											<div className="grid grid-cols-4 gap-3 text-sm">
												<div>
													<p className="text-xs text-slate-500 mb-1">
														{t("sku")}
													</p>
													<p className="font-mono font-medium">{batch.sku}</p>
												</div>
												<div>
													<p className="text-xs text-slate-500 mb-1">
														{t("initial_length")}
													</p>
													<p className="font-medium">{batch.initialLength} m</p>
												</div>
												<div>
													<p className="text-xs text-slate-500 mb-1">
														{t("remaining_length")}
													</p>
													<p className="font-medium">
														{batch.remainingLength} m
													</p>
												</div>
												<div>
													<p className="text-xs text-slate-500 mb-1">
														{t("cost_per_meter")}
													</p>
													<p className="font-medium">
														{batch.costPerMeter} SAR
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
								<Separator />
							</div>
						)}

						{/* Add New Batches Form */}
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-semibold">{t("new_batches")}</h3>
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
														<FieldLabel htmlFor={field.name}>
															{t("sku")}
														</FieldLabel>
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
									{isLoading ? t("adding") : t("add_batches")}
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
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};
