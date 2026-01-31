"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useSWR from "swr";
import z from "zod";
import { CreateMeasurementDialog } from "@/app/(app)/customers/[customerId]/measurements/create/_components/create-measurement";
import { measurementSchema } from "@/app/(app)/customers/[customerId]/measurements/create/_components/measurements/schema";
import { SearchInput } from "@/components/forms/search-input";
import { Loading } from "@/components/layout/loading";
import { useAuth } from "@/hooks/auth";
import { useCustomer } from "@/hooks/customer";
import { activeOrderCustomerIdAtom } from "@/lib/atoms";
import axios from "@/lib/axios";
import { GeneralInfo } from "./_components/GeneralInfo";
import { InvoiceCard } from "./_components/InvoiceCard";
import { OrderItem } from "./_components/sections/order-items";

export const orderSchema = z.object({
	customerId: z.number(),
	dueDate: z.string(),
	status: z.string(),
	notes: z.string(),
	items: z
		.array(
			z
				.object({
					fabricId: z.number().nullable(),
					unitPrice: z.number(),
					quantity: z.number(),
				})
				.merge(measurementSchema),
		)
		.nonempty(),
});
export type orderRequest = z.infer<typeof orderSchema>;
export default function OrderNewCustomerPage({
	params,
}: {
	params: { customerId: string };
}) {
	const customerId = Number(params?.customerId);
	const [_, setCustomerIdState] = useAtom(activeOrderCustomerIdAtom);
	const [isAtomInitialized, setIsAtomInitialized] = useState(false);
	const t = useTranslations("messages");
	const form = useForm<orderRequest>({ resolver: zodResolver(orderSchema) });
	const router = useRouter();
	const { isInBranch } = useAuth({ middleware: "auth" });

	const { customer, isLoadingCustomer } = useCustomer({
		id: customerId,
	});
	// Set atom before allowing interaction
	useEffect(() => {
		setCustomerIdState(customerId);
		setIsAtomInitialized(true);
		form.setValue("customerId", customerId);
		form.setValue("status", "received");
		form.setValue("notes", "");
	}, [customerId, setCustomerIdState]);

	if (isLoadingCustomer || !isAtomInitialized) return <Loading />;

	const onSubmit = async (data: orderRequest) => {
		// Transform items to flatten nested objects
		const transformedData = {
			...data,
			items: data.items.map((item) => ({
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
		console.log(transformedData);
		const id = await axios
			.post(`/api/v1/branch/${isInBranch}/order`, transformedData)
			.then((res) => res.data.data.id)
			.catch((e) => console.error(e));
		router.push(`/orders/${id}/edit`);
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex justify-between max-w-full overflow-hidden gap-4">
					<div className=" flex flex-1 min-w-0 flex-col gap-4">
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
					<div className=" w-[350px]">
						<InvoiceCard customerId={customerId} />
					</div>
				</div>
			</form>
		</FormProvider>
	);
}
