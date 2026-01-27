"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import useSWR from "swr";
import z from "zod";
import { CreateMeasurementDialog } from "@/app/(app)/customers/[customerId]/measurements/create/_components/create-measurement";
import { SearchInput } from "@/components/forms/search-input";
import { Loading } from "@/components/layout/loading";
import { useAuth } from "@/hooks/auth";
import { useCustomer } from "@/hooks/customer";
import { useGetOrder } from "@/hooks/orders/getOrder";
import { activeOrderCustomerIdAtom } from "@/lib/atoms";
import axios from "@/lib/axios";
import { GeneralInfo } from "../../create/customer/[customerId]/_components/GeneralInfo";
import { InvoiceCard } from "../../create/customer/[customerId]/_components/InvoiceCard";
import { OrderItem } from "../../create/customer/[customerId]/_components/sections/order-items";
import { EditInvoiceCard } from "./components/EditInvoiceCard";
import { EditOrderItems } from "./components/EditOrderItems";
import { Payments } from "./components/Payments";

export const editOrderSchema = z.object({
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
				quantity: z.number(),
				measurement: z.object({
					name: z.string().nullable(),
					thobeType: z
						.enum(["saudi", "kuwaiti", "qatari", "emirati"])
						.nullable(),
					chestPocketImg: z
						.enum([
							"1",
							"2",
							"3",
							"4",
							"5",
							"6",
							"7",
							"8",
							"9",
							"10",
							"11",
							"12",
						])
						.nullable(),
					jabzoorImg: z
						.enum(["1", "2", "3", "4", "5", "6", "7", "8"])
						.nullable(),
					neckImg: z
						.enum([
							"1",
							"2",
							"3",
							"4",
							"5",
							"6",
							"7",
							"8",
							"9",
							"10",
							"11",
							"12",
							"13",
							"14",
							"15",
							"16",
							"17",
							"18",
							"19",
							"20",
						])
						.nullable(),

					wristImg: z
						.enum([
							"1",
							"2",
							"3",
							"4",
							"5",
							"6",
							"7",
							"8",
							"9",
							"10",
							"11",
							"12",
							"13",
							"14",
							"15",
							"16",
							"17",
							"18",
							"19",
							"20",
							"21",
							"22",
							"23",
							"24",
						])
						.nullable(),

					general: z.object({
						generalThobeLength: z.coerce.number().nonnegative().nullable(),
						generalThobeBackLength: z.coerce.number().nonnegative().nullable(),
						generalShoulderWidth: z.coerce.number().nonnegative().nullable(),
						generalShoulderRotation: z.coerce.number().nonnegative().nullable(),
						generalSleeveLength: z.coerce.number().nonnegative().nullable(),
						generalUpperSleeveWidth: z.coerce.number().nonnegative().nullable(),
						generalMiddleSleeveWidth: z.coerce
							.number()
							.nonnegative()
							.nullable(),
						generalWristWidth: z.coerce.number().nonnegative().nullable(),
						generalChestFront: z.coerce.number().nonnegative().nullable(),
						generalChestBack: z.coerce.number().nonnegative().nullable(),
						generalChestFull: z.coerce.number().nonnegative().nullable(),
						generalBottomWidth: z.coerce.number().nonnegative().nullable(),
						generalCuffBottomWidth: z.coerce.number().nonnegative().nullable(),
						generalAddedInfo: z.coerce.number().nonnegative().nullable(),
						generalSidePocket: z.coerce.number().nonnegative().nullable(),
						generalWaistWidth: z.coerce.number().nonnegative().nullable(),
						generalHipWidth: z.coerce.number().nonnegative().nullable(),
					}),

					neck: z.object({
						neckLength: z.coerce.number().nonnegative().nullable(),
						neckBackLength: z.coerce.number().nonnegative().nullable(),
						neckWidth: z.coerce.number().nonnegative().nullable(),
						neckButtonCount: z.coerce.number().nonnegative().nullable(),

						neckDesign: z
							.enum(["plain", "v-neck", "french", "chinese", "royal"])
							.nullable(),

						neckShape: z.enum(["square", "rounded"]).nullable(),
						neckFill: z.enum(["1", "2"]).nullable(),
						neckButtonType: z.enum(["normal", "opposite"]).nullable(),
						neckButtonholeType: z.enum(["normal", "arawi"]).nullable(),
						neckButtonMaterial: z.enum(["plastic", "steel"]).nullable(),
						neckButtonVisibility: z.enum(["visible", "invisibile"]).nullable(),
					}),

					wrist: z.object({
						wristCuffType: z.enum(["normal", "cufflinks"]).nullable(),
						wristCuffLength: z.coerce.number().nonnegative().nullable(),
						wristCuffWidth: z.coerce.number().nonnegative().nullable(),

						wristDesign: z
							.enum([
								"plain",
								"on",
								"minced",
								"rounded",
								"square",
								"french",
								"double",
							])
							.nullable(),

						wristButtonNumber: z.coerce.number().nonnegative().nullable(),
						wristMaterialLayers: z.enum(["1", "2"]).nullable(),
						wristSleeveCrumbNumber: z.enum(["0", "1", "2"]).nullable(),
					}),

					chestPocket: z.object({
						chestPocketLength: z.coerce.number().nonnegative().nullable(),
						chestPocketWidth: z.coerce.number().nonnegative().nullable(),
						betweenChestPocketShoulder: z.coerce
							.number()
							.nonnegative()
							.nullable(),

						chestPocketPenType: z
							.enum(["no", "halfLength", "fullLength"])
							.nullable(),

						chestPocketDesign: z
							.enum(["official", "kuwaiti", "model"])
							.nullable(),

						chestPocketShape: z.enum(["rounded", "square"]).nullable(),
						chestPocketVisibility: z.enum(["visible", "invisible"]).nullable(),
					}),

					sidePockets: z.object({
						sidePhonePocketLength: z.coerce.number().nonnegative().nullable(),
						sidePhonePocketWidth: z.coerce.number().nonnegative().nullable(),
						sideWalletPocketLength: z.coerce.number().nonnegative().nullable(),
						sideWalletPocketWidth: z.coerce.number().nonnegative().nullable(),
					}),

					jabzoor: z.object({
						jabzoorHoleType: z.enum(["push", "buttons", "zip"]).nullable(),
						jabzoorLength: z.coerce.number().nonnegative().nullable(),
						jabzoorWidth: z.coerce.number().nonnegative().nullable(),

						jabzoorDesign: z
							.enum([
								"normal",
								"combination",
								"supportedStitch",
								"fill",
								"fullPush",
							])
							.nullable(),

						jabzoorVisibility: z.enum(["visible", "invisible"]).nullable(),
						jabzoorShape: z.enum(["square", "rounded", "minced"]).nullable(),
						jabzoorPushMaterial: z.enum(["plastic", "steel"]).nullable(),
					}),
				}),
			}),
		)
		.nonempty(),
});

export const editMeasurementSchema =
	editOrderSchema.shape.items.element.shape.measurement.shape;
export type editOrderRequest = z.infer<typeof editOrderSchema>;

export default function EditOrderPage({
	params,
}: {
	params: { orderId: string };
}) {
	const orderId = Number(params?.orderId);
	const { isInBranch } = useAuth({ middleware: "auth" });

	const { order, loadingOrder } = useGetOrder({
		orderId: orderId,
		branchId: isInBranch,
	});

	const customer = order?.customer;
	const [isAtomInitialized, setIsAtomInitialized] = useState(false);
	const t = useTranslations("messages");
	const form = useForm<editOrderRequest>({
		resolver: zodResolver(editOrderSchema),
		defaultValues: { items: [] },
	});

	const items = useFieldArray({ control: form.control, name: "items" });
	const router = useRouter();

	// Set atom before allowing interaction
	useEffect(() => {
		setIsAtomInitialized(true);
		console.log(order);
		if (order && customer) {
			form.reset({
				customerId: customer.id,
				status: "received",
				dueDate: order.dueDate || "",
				notes: order.notes || "",
				items: order.items.map((item) => ({
					fabricType: item.fabricType ?? "",
					color: item.color ?? "",
					unitPrice: Number(item.price),
					measurement: {
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
							generalShoulderRotation: item.generalShoulderRotation,
							generalSleeveLength: item.generalSleeveLength,
							generalUpperSleeveWidth: item.generalUpperSleeveWidth,
							generalMiddleSleeveWidth: item.generalMiddleSleeveWidth,
							generalWristWidth: item.generalWristWidth,
							generalChestFront: item.generalChestFront,
							generalChestBack: item.generalChestBack,
							generalChestFull: item.generalChestFull,
							generalBottomWidth: item.generalBottomWidth,
							generalCuffBottomWidth: item.generalCuffBottomWidth,
							generalAddedInfo: item.generalAddedInfo,
							generalSidePocket: item.generalSidePocket,
							generalWaistWidth: item.generalWaistWidth,
							generalHipWidth: item.generalHipWidth,
						},

						neck: {
							neckLength: item.neckLength,
							neckBackLength: item.neckBackLength,
							neckWidth: item.neckWidth,
							neckButtonCount: item.neckButtonCount,
							neckDesign: item.neckDesign,
							neckShape: item.neckShape,
							neckFill: item.neckFill,
							neckButtonType: item.neckButtonType,
							neckButtonholeType: item.neckButtonholeType,
							neckButtonMaterial: item.neckButtonMaterial,
							neckButtonVisibility: item.neckButtonVisibility,
						},

						wrist: {
							wristCuffType: item.wristCuffType,
							wristCuffLength: item.wristCuffLength,
							wristCuffWidth: item.wristCuffWidth,
							wristDesign: item.wristDesign,
							wristButtonNumber: item.wristButtonNumber,
							wristMaterialLayers: item.wristMaterialLayers,
							wristSleeveCrumbNumber: item.wristSleeveCrumbNumber,
						},

						chestPocket: {
							chestPocketLength: item.chestPocketLength,
							chestPocketWidth: item.chestPocketWidth,
							betweenChestPocketShoulder: item.betweenChestPocketShoulder,
							chestPocketPenType: item.chestPocketPenType,
							chestPocketDesign: item.chestPocketDesign,
							chestPocketShape: item.chestPocketShape,
							chestPocketVisibility: item.chestPocketVisibility,
						},

						sidePockets: {
							sidePhonePocketLength: item.sidePhonePocketLength,
							sidePhonePocketWidth: item.sidePhonePocketWidth,
							sideWalletPocketLength: item.sideWalletPocketLength,
							sideWalletPocketWidth: item.sideWalletPocketWidth,
						},

						jabzoor: {
							jabzoorHoleType: item.jabzoorHoleType,
							jabzoorLength: item.jabzoorLength,
							jabzoorWidth: item.jabzoorWidth,
							jabzoorDesign: item.jabzoorDesign,
							jabzoorVisibility: item.jabzoorVisibility,
							jabzoorShape: item.jabzoorShape,
							jabzoorPushMaterial: item.jabzoorPushMaterial,
						},
					},
					quantity: item.quantity ?? 1,
				})),
			});
		}

		console.log(form.watch("items"));
	}, [order, form]);

	if (!isAtomInitialized || loadingOrder) return <Loading />;
	if (!customer) return router.push("/orders");

	const onSubmit = async (data: editOrderRequest) => {
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
									{customer && (
										<>
											#{customer.id < 10 ? "00" : customer.id < 100 ? "0" : ""}
											{customer.id}
										</>
									)}
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
						<EditOrderItems />
						<GeneralInfo />
						<Payments invoices={order.invoices} />
					</div>
					<div className=" w-[350px]">
						<EditInvoiceCard />
					</div>
				</div>
			</form>
		</FormProvider>
	);
}
