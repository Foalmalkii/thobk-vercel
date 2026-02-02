"use client";

import { pdf } from "@react-pdf/renderer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { PrinterIcon, RulerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { measurementSchema } from "@/app/(app)/customers/[customerId]/measurements/create/_components/measurements/schema";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Loading } from "@/components/layout/loading";
import { useAuth } from "@/hooks/auth";
import { useGetOrder } from "@/hooks/orders/getOrder";
import { activeOrderCustomerIdAtom } from "@/lib/atoms";
import axios from "@/lib/axios";
import { registerPDFFonts } from "@/lib/pdf-fonts";
import { GeneralInfo } from "./components/GeneralInfo";
import { InvoiceCard } from "./components/InvoiceCard";
import { OrderItem } from "./components/OrderItem";
import { Payments } from "./components/Payments";
import { MeasurementDocument } from "../invoice/components/MeasurementDocument";
import { useGetBranch } from "@/hooks/branches/getBranch";

export default function EditOrderPage({
	params,
}: {
	params: { orderId: string };
}) {
	// In your schema definition
	const orderItemSchema = z
		.object({
			id: z.number().optional(), // Make ID optional
			fabricId: z.number().nullable(),
			unitPrice: z.number(),
			quantity: z.number(),
			name: z.string(),
			// ... rest of your fields
		})
		.merge(measurementSchema);

	const orderSchema = z.object({
		dueDate: z.string(),
		notes: z.string().optional(),
		items: z.array(orderItemSchema),
	});

	type orderRequest = z.infer<typeof orderSchema>;
	const orderId = Number(params?.orderId);
	const { isInBranch } = useAuth({ middleware: "auth" });
	const [_, setCustomerIdState] = useAtom(activeOrderCustomerIdAtom);
	const [isFormInitialized, setIsFormInitialized] = useState(false);
	const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
	const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
	const t = useTranslations("messages");
	const form = useForm<orderRequest>({ resolver: zodResolver(orderSchema) });
	const router = useRouter();

	const { order, loadingOrder, errorOrder, mutateOrder } = useGetOrder({
		orderId: orderId,
		branchId: isInBranch,
	});

	const { branch } = useGetBranch({ branchId: isInBranch });

	const customer = order?.customer;

	// Calculate pending payment
	const pendingPayment = useMemo(() => {
		if (!order) return 0;

		// Calculate total order amount from items
		const orderTotal = order.items.reduce((total: number, item: any) => {
			return total + item.quantity * item.price;
		}, 0);

		// Calculate total paid amount from invoices
		const paidAmount = order.invoices.reduce((total: number, invoice: any) => {
			// Only count paid invoices
			if (invoice.status === "paid") {
				return total + invoice.total;
			}
			return total;
		}, 0);

		// Calculate pending payment (difference)
		return orderTotal - paidAmount;
	}, [order]);

	// Initialize form with order data
	useEffect(() => {
		if (order && customer && !isFormInitialized) {
			// Set customer ID in atom
			setCustomerIdState(customer.id);

			// Transform order items back to form structure
			const transformedItems = order.items.map((item: any) => ({
				id: item.id,
				fabricId: item.fabricId,
				unitPrice: item.price,
				quantity: item.quantity,
				name: item.name,
				notes: item.notes,
				thobeType: item.thobeType,
				chestPocketImg: item.chestPocketImg,
				jabzoorImg: item.jabzoorImg,
				neckImg: item.neckImg,
				wristImg: item.wristImg,
				general: {
					generalThobeLength: item.generalThobeLength,
					generalThobeBackLength: item.generalThobeBackLength,
					generalShoulderWidth: item.generalShoulderWidth,
					generalShoulderRight: item.generalShoulderRight,
					generalShoulderLeft: item.generalShoulderLeft,
					generalSleeveLength: item.generalSleeveLength,
					generalUpperSleeveWidth: item.generalUpperSleeveWidth,
					generalMiddleSleeveWidth: item.generalMiddleSleeveWidth,
					generalWristWidth: item.generalWristWidth,
					generalChestFront: item.generalChestFront,
					generalChestFull: item.generalChestFull,
					generalTakaleesLength: item.generalTakaleesLength,
					generalTakaleesWidth: item.generalTakaleesWidth,
					generalBottomWidth: item.generalBottomWidth,
					generalCuffBottomWidth: item.generalCuffBottomWidth,
					generalWaistWidth: item.generalWaistWidth,
					generalHipWidth: item.generalHipWidth,
					generalShoulderRotation: item.generalShoulderRotation,
				},
				neck: {
					neckLength: item.neckLength,
					neckBackLength: item.neckBackLength,
					neckWidth: item.neckWidth,
					neckFill: item.neckFill,
					neckNotes: item.neckNotes,
				},
				wrist: {
					wristCuffType: item.wristCuffType,
					wristCuffLength: item.wristCuffLength,
					wristCuffWidth: item.wristCuffWidth,
					wristNotes: item.wristNotes,
				},
				chestPocket: {
					chestPocketLength: item.chestPocketLength,
					chestPocketWidth: item.chestPocketWidth,
					betweenChestPocketShoulder: item.betweenChestPocketShoulder,
					chestPocketPenType: item.chestPocketPenType,
					chestPocketNotes: item.chestPocketNotes,
				},
				sidePockets: {
					sidePhonePocketLength: item.sidePhonePocketLength,
					sidePhonePocketWidth: item.sidePhonePocketWidth,
					sideWalletPocketLength: item.sideWalletPocketLength,
					sideWalletPocketWidth: item.sideWalletPocketWidth,
				},
				jabzoor: {
					jabzoorLength: item.jabzoorLength,
					jabzoorWidth: item.jabzoorWidth,
					jabzoorHoleType: item.jabzoorHoleType,
					jabzoorNotes: item.jabzoorNotes,
				},
			}));

			// Set all form values
			form.reset({
				dueDate: order.dueDate,
				notes: order.notes || "",
				items: transformedItems,
			});

			setIsFormInitialized(true);
		}
	}, [order, customer, isFormInitialized, form, setCustomerIdState]);

	const handlePrintMeasurements = async () => {
		if (!order) return;

		setIsGeneratingPDF(true);
		try {
			registerPDFFonts();

			const blob = await pdf(
				<MeasurementDocument order={order} branch={branch} />,
			).toBlob();

			const url = URL.createObjectURL(blob);
			window.open(url, "_blank");
			setTimeout(() => URL.revokeObjectURL(url), 100);

			toast.success(t("measurements_pdf_generated"), {
				position: "top-center",
			});
		} catch (error) {
			console.error("Error generating measurements PDF:", error);
			toast.error(t("error_generating_pdf"), { position: "top-center" });
		} finally {
			setIsGeneratingPDF(false);
		}
	};

	const handleStatusChange = async (newStatus: string) => {
		setIsUpdatingStatus(true);
		try {
			await axios.patch(`/api/v1/branch/${isInBranch}/order/${orderId}/`, {
				status: newStatus,
			});

			mutateOrder();
			toast.success(t("order_status_updated"), { position: "top-center" });
		} catch (error) {
			console.error("Error updating order status:", error);
			toast.error(t("error_updating_status"), { position: "top-center" });
		} finally {
			setIsUpdatingStatus(false);
		}
	};

	if (loadingOrder || !isFormInitialized) return <Loading />;

	if (errorOrder) {
		return <div className="p-4 text-red-500">{t("error_loading_order")}</div>;
	}

	const onSubmit = async (data: orderRequest) => {
		// Transform items to flatten nested objects
		const transformedData = {
			...data,
			items: data.items.map((item) => ({
				id: item.id,
				fabricId: item.fabricId,
				unitPrice: item.unitPrice,
				quantity: item.quantity,
				notes: item.notes,
				name: item.name,
				thobeType: item.thobeType,
				chestPocketImg: item.chestPocketImg,
				jabzoorImg: item.jabzoorImg,
				neckImg: item.neckImg,
				wristImg: item.wristImg,
				// Spread all nested objects
				...item.general,
				...item.neck,
				...item.wrist,
				...item.chestPocket,
				...item.sidePockets,
				...item.jabzoor,
			})),
		};

		console.log("Transformed Data", transformedData);

		try {
			await axios.put(
				`/api/v1/branch/${isInBranch}/order/${orderId}`,
				transformedData,
			);

			mutateOrder();
			toast.success(t("updated_order"), { position: "top-center" });
		} catch (e) {
			console.error(e);
			toast.error(t("error_updating_order"), { position: "top-center" });
		}
	};

	console.log(order);

	// Order status options
	const orderStatuses = [
		{ value: "received", label: t("status_received") },
		{ value: "in_progress", label: t("status_in_progress") },
		{ value: "ready", label: t("status_ready") },
		{ value: "delivered", label: t("status_delivered") },
		{ value: "cancelled", label: t("status_cancelled") },
	];

	return (
		<>
			{/* Action Buttons at the Top */}
			<div className="mb-4 flex items-center gap-3  p-4">
				<Button
					type="button"
					onClick={handlePrintMeasurements}
					disabled={isGeneratingPDF}
					className="bg-gray-900 text-white hover:bg-gray-800"
				>
					<RulerIcon className="w-4 h-4 mr-2" />
					{isGeneratingPDF ? t("loading") : t("print_measurements")}
				</Button>

				<div className="flex items-center gap-2">
					<span className="text-sm font-medium text-gray-700">
						{t("order_status")}:
					</span>
					<Select
						value={order?.status}
						onValueChange={handleStatusChange}
						disabled={isUpdatingStatus}
					>
						<SelectTrigger className="w-[200px] bg-white">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{orderStatuses.map((status) => (
								<SelectItem key={status.value} value={status.value}>
									{status.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex justify-between max-w-full overflow-hidden gap-4">
						<div className="flex flex-1 min-w-0 flex-col gap-4">
							{/* Customer Info Card */}
							<div className="flex items-center gap-4 bg-white rounded-2xl p-5 border">
								<div className="bg-gray-900 rounded-xl p-4 aspect-square w-20 flex flex-col items-center justify-center text-center gap-0.5">
									<span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
										{t("code")}
									</span>
									<span className="text-xl font-black text-white">
										#{customer?.id < 10 ? "00" : customer?.id < 100 ? "0" : ""}
										{customer?.id}
									</span>
								</div>
								<div className="flex-1 flex flex-col gap-3">
									<div className="flex justify-between items-center pb-2 border-b-2 border-gray-100">
										<span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
											{t("customer_name")}
										</span>
										<span className="text-base font-bold text-gray-900">
											{customer?.name}
										</span>
									</div>
									<div className="flex justify-between items-center pb-2 border-b-2 border-gray-100">
										<span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
											{t("customer_phone")}
										</span>
										<span className="text-base font-bold text-gray-900 direction-ltr">
											{customer?.phone}
										</span>
									</div>
								</div>
							</div>

							<OrderItem />
							<GeneralInfo />
						</div>

						<div className="w-[350px]">
							<InvoiceCard customerId={customer?.id || 0} />
						</div>
					</div>
				</form>
			</FormProvider>
			<div className="mt-4">
				<Payments
					orderId={order?.id}
					invoices={order?.invoices}
					pendingPayment={pendingPayment}
				/>
			</div>
		</>
	);
}
