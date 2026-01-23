"use client";
import { CreateMeasurementDialog } from "@/app/(app)/customers/[customerId]/measurements/create/_components/create-measurement";
import { SearchInput } from "@/components/forms/search-input";
import { Loading } from "@/components/layout/loading";

import { useCustomer } from "@/hooks/customer";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { OrderItem } from "./_components/sections/order-items";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { activeOrderCustomerIdAtom } from "@/lib/atoms";
import { InvoiceCard } from "./_components/InvoiceCard";
import { GeneralInfo } from "./_components/GeneralInfo";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";

export const orderSchema = z.object({
	customerId: z.number(),
	dueDate: z.string(),
	status: z.string(),
	notes: z.string(),
	items: z
		.array(
			z.object({
				fabricType: z.string(),
				color: z.string(),
				unitPrice: z.number(),
				measurementId: z.number(),
				quantity: z.number(),
			}),
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
	}, [customerId, setCustomerIdState]);

	if (isLoadingCustomer || !isAtomInitialized) return <Loading />;

	const onSubmit = async (data: orderRequest) => {
		await axios
			.post(`/api/v1/branch/${isInBranch}/order`, data)
			.then((res) => console.log(res))
			.catch((e) => console.error(e));
		router.push("/orders");
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex justify-between max-w-full overflow-hidden gap-4">
					<div className=" flex flex-1 min-w-0 flex-col gap-4">
						<div className="flex items-center gap-4 bg-zinc-100 rounded-xl p-5">
							<div className="bg-white rounded-xl p-2 aspect-square w-auto flex flex-col items-center text-center gap-1">
								<span>الكود</span>
								<span>
									#{customer?.id < 10 ? "00" : customer?.id < 100 && "0"}
									{customer?.id}
								</span>
							</div>
							<div className="h-full flex flex-col justify-between gap-1  w-full">
								<p className="bg-white p-1 rounded-lg flex justify-between px-4">
									<span>{t("customer_name")}:</span>{" "}
									<span>{customer?.name}</span>
								</p>
								<p className="bg-white p-1 rounded-lg flex justify-between px-4">
									<span>{t("customer_phone")}:</span>{" "}
									<span>{customer?.phone}</span>
								</p>
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
