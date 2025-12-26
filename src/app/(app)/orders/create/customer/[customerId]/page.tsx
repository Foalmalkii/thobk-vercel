"use client";
import { CreateMeasurementDialog } from "@/app/(app)/customers/[customerId]/measurements/create/_components/create-measurement";
import { SearchInput } from "@/components/forms/search-input";
import { Loading } from "@/components/layout/loading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCustomer } from "@/hooks/customer";
import { useMeasurements } from "@/hooks/measurements";
import axios from "@/lib/axios";
import { customer } from "@/lib/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { OrderItem } from "./_components/sections/order-items";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const orderSchema = z.object({
  customerId: z.number(),
  dueDate: z.string(),
  status: z.string(),
  items: z
    .array(
      z.object({
        fabricType: z.string(),
        color: z.string(),
        unitPrice: z.number(),
        measurementId: z.number(),
        quantity: z.number(),
      })
    )
    .nonempty(),
});

export default function OrderNewCustomerPage({
  params,
}: {
  params: { customerId: string };
}) {
  const customerId = Number(params.customerId);
  const t = useTranslations("messages");
  const form = useForm<orderRequest>({ resolver: zodResolver(orderSchema) });

  if (isNaN(customerId) || !customerId) return <div>NAN</div>;

  const { customer, isLoadingCustomer } = useCustomer({ id: customerId });

  const { measurements } = useMeasurements({ customerId: customerId });
  const [open, setOpen] = useState<boolean>(false);
  if (isLoadingCustomer) return <Loading />;
  if (!isLoadingCustomer && !customer) return <h1>no customer?!</h1>;

  type orderRequest = z.infer<typeof orderSchema>;

  return (
    <>
      <CreateMeasurementDialog
        customerId={customerId}
        open={open}
        setOpen={setOpen}
      />
      <FormProvider {...form}>
        <form>
          <div className="flex justify-between gap-4">
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-zinc-100 rounded-xl p-5">
                <div className="bg-white rounded-xl p-2 aspect-square w-auto flex flex-col items-center text-center gap-1">
                  <span>الكود</span>
                  <span>
                    #{customer.id < 10 ? "00" : customer.id < 100 && "0"}
                    {customer.id}
                  </span>
                </div>
                <div className="h-full flex flex-col justify-between gap-1  w-full">
                  <p className="bg-white p-1 rounded-lg flex justify-between px-4">
                    <span>{t("customer_name")}:</span>{" "}
                    <span>{customer.name}</span>
                  </p>
                  <p className="bg-white p-1 rounded-lg flex justify-between px-4">
                    <span>{t("customer_phone")}:</span>{" "}
                    <span>{customer.phone}</span>
                  </p>
                </div>
              </div>
              <OrderItem />
            </div>
            <div className="w-1/3 rounded-lg border p-5">الفاتورة</div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
