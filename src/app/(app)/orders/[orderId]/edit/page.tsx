"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { measurementSchema } from "@/app/(app)/customers/[customerId]/measurements/create/_components/measurements/schema";
import { Loading } from "@/components/layout/loading";
import { useAuth } from "@/hooks/auth";
import { useGetOrder } from "@/hooks/orders/getOrder";
import { activeOrderCustomerIdAtom } from "@/lib/atoms";
import axios from "@/lib/axios";
import { GeneralInfo } from "./components/GeneralInfo";
import { InvoiceCard } from "./components/InvoiceCard";
import { OrderItem } from "./components/OrderItem";
import { Payments } from "./components/Payments";

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
	const t = useTranslations("messages");
	const form = useForm<orderRequest>({ resolver: zodResolver(orderSchema) });
	const router = useRouter();

	const { order, loadingOrder, errorOrder, mutateOrder } = useGetOrder({
		orderId: orderId,
		branchId: isInBranch,
	});

	const customer = order?.customer;

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
			toast.success("Updated Order", { position: "top-center" });
		} catch (e) {
			console.error(e);
		}
	};

	console.log(order);

	return (
		<>
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
				<Payments orderId={order?.id} invoices={order?.invoices} />
			</div>
		</>
	);
}
