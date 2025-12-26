"use client";
import axios from "@/lib/axios";
import { customer } from "@/lib/types";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";
import { measurementSchema } from "./_schemas/measurementSchema";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/layout/loading";
import { useCustomer } from "@/hooks/customer";
import { useMeasurements } from "@/hooks/measurements";
import Image from "next/image";
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CreateCustomerMeasurement({
  params,
}: {
  params: { customerId: string };
}) {
  const customerId = Number(params.customerId);

  const { customer, isLoadingCustomer } = useCustomer({ id: customerId });
  const { measurements, isLoadingMeasurements } = useMeasurements({
    customerId: customerId,
  });
  const [thobeLength, setThobeLength] = useState<string>();
  const t = useTranslations("messages");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const backToOrders: boolean = searchParams.get("backTo") === "orders";

  type formData = z.infer<typeof measurementSchema>;

  const { register, handleSubmit } = useForm<formData>({
    resolver: zodResolver(measurementSchema),
  });

  if (isLoadingCustomer || isLoadingMeasurements) {
    return <Loading />;
  }

  return (
    <>
      <Link
        className=" text-blue-900 flex gap-1.5 items-center"
        href={`/orders/create/customer/${customer?.id}`}
      >
        {locale === "ar" ? (
          <>
            <ArrowRightIcon />
          </>
        ) : (
          <>
            <ArrowLeftIcon />
          </>
        )}
        {t("back_to_orders")}
      </Link>
      <div className="flex flex-col gap-4 mt-4">
        <h1 className="font-semibold text-2xl">
          {t("messages.create_measurement_for")} {customer?.name}
        </h1>

        <p className=" text-slate-500">
          {t("messages.create_measurement_description")}
        </p>
        <Separator orientation="horizontal" />
      </div>

      <div className="mt-4">
        <div className="flex w-full h-full min-h-10  gap-4">
          <div className="w-1/2">
            <div className="w-full inline-block relative">
              <div className="absolute top-[51.3%] w-auto -translate-y-1/2 right-[3.7%] font-bold translate-x-1/2 text-xs text-center">
                {thobeLength}
              </div>
              <div className="absolute top-[29%] w-auto -translate-y-1/2 right-[8.9%] font-bold translate-x-1/2 text-xs text-center">
                {thobeLength}
              </div>
              <div className="absolute top-[23%] w-auto -translate-y-1/2 right-[14.3%] font-bold translate-x-1/2 text-xs text-center">
                {thobeLength}
              </div>
              <Image
                alt="thobe"
                width={987.18}
                height={1278.5}
                src={"/images/thobe.svg"}
              />
            </div>
          </div>
          <div className=" w-px bg-zinc-200 self-stretch" />
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-medium">المواصفات العامة</h1>
            <div className="grid grid-cols-4 gap-4">
              <InputWrapper>
                <Label>طول الثوب أمام</Label>
                <Input
                  type="text"
                  onChange={(e) => setThobeLength(e.target.value)}
                  value={thobeLength}
                />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>{" "}
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>{" "}
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>اهلا</Label>
                <Input />
              </InputWrapper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
