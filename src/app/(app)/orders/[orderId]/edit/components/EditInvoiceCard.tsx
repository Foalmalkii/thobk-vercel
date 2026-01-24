import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { orderRequest } from "../page";
import { RiyalIcon } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth";
import { useCustomer } from "@/hooks/customer";
import { CoinsIcon, CreditCardIcon } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export const EditInvoiceCard = () => {
	const orderForm = useFormContext();
	const items: orderRequest["items"] = orderForm.watch("items");

	const totalPrice = items?.reduce(
		(sum, item) => sum + item.quantity * item.unitPrice,
		0,
	);
	const customer = orderForm.getValues("customer");
	const dueDate = orderForm.watch("dueDate");
	console.log(orderForm.watch());
	return (
		<div className="w-full p-6 border rounded-lg h-full shadow flex flex-col justify-between max-h-[730px]">
			<div>
				<div className="flex flex-col gap-1.5">
					<h1 className="text-lg font-bold">تفاصيل الطلب</h1>
					<p className="text-sm text-muted-foreground">
						تاريخ الطلب: {new Date().toLocaleDateString()}
					</p>
					<p className="text-sm text-muted-foreground">
						تاريخ الاستلام: {dueDate}
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<div className="mt-4 flex flex-col gap-2">
						<h2 className="font-semibold">تفاصيل الطلب</h2>
						{items?.map((item, index) => (
							<div className="flex justify-between w-full " key={index}>
								<p className="text-muted-foreground">
									x{item.quantity} ثوب {item.fabricType}{" "}
									{item.color && `- ${item.color}`}
								</p>

								<p className="flex gap-2 items-center">
									{(item.unitPrice / 100) * item.quantity}{" "}
									<RiyalIcon className="w-3.5 h-3.5" />
								</p>
							</div>
						))}
					</div>
					<Separator orientation="horizontal" />
					<div className="flex flex-col gap-1">
						<div className="flex w-full justify-between">
							<p className="text-muted-foreground">الإجمالي الفرعي</p>
							<p className="flex gap-2 items-center">
								<span>{totalPrice / 100}</span>
								<RiyalIcon className="w-3.5 h-3.5" />
							</p>
						</div>
						<div className="flex w-full justify-between">
							<p className="text-muted-foreground">الخصم</p>
							<p className="flex gap-2 items-center">
								<span>0</span>
								<RiyalIcon className="w-3.5 h-3.5" />
							</p>
						</div>
						<div className="flex w-full justify-between">
							<p className="text-muted-foreground">الإجمالي بعد الخصم</p>
							<p className="flex gap-2 items-center">
								<span>{totalPrice / 100}</span>
								<RiyalIcon className="w-3.5 h-3.5" />
							</p>
						</div>
					</div>

					<Separator orientation="horizontal" />
					<div className="flex flex-col gap-2">
						<h2 className="font-semibold">معلومات العميل</h2>
						<div className="flex w-full justify-between">
							<p className="text-muted-foreground">العميل</p>
							<p className="flex gap-2 items-center">
								<span>{customer?.name}</span>
							</p>
						</div>
						<div className="flex w-full justify-between">
							<p className="text-muted-foreground">الهاتف</p>
							<p className="flex gap-2 items-center">
								<span>{customer?.phone}</span>
							</p>
						</div>
					</div>

					<Separator orientation="horizontal" />

					<div className="flex flex-col gap-2">
						<h2 className="font-semibold">معلومات الدفع</h2>
						<div className="flex w-full justify-between">
							<p className="text-muted-foreground flex gap-2 items-center">
								<CreditCardIcon className="w-4 h-4" />
								<span>شبكة</span>
							</p>
							<p className="flex gap-2 items-center">
								<span>{totalPrice}</span>
								<RiyalIcon className="w-3.5 h-3.5" />
							</p>
						</div>

						<div className="flex w-full justify-between">
							<p className="text-muted-foreground flex gap-2 items-center">
								<CoinsIcon className="w-4 h-4" />
								<span>نقدي</span>
							</p>
							<p className="flex gap-2 items-center">
								<span>{totalPrice}</span>
								<RiyalIcon className="w-3.5 h-3.5" />
							</p>
						</div>
						<Separator orientation="horizontal" />
					</div>
				</div>
			</div>
			<div className="mt-4">
				<FieldGroup>
					<Field>
						<FieldLabel>إخطار العميل</FieldLabel>
					</Field>

					<Button
						onClick={() => console.log(orderForm.formState.errors)}
						type="submit"
					>
						تحديث الطلب
					</Button>
				</FieldGroup>
			</div>
		</div>
	);
};
