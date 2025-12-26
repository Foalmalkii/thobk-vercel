"use client";
import { SearchInput } from "@/components/forms/search-input";
import { CreateCustomer } from "@/components/shared/create-customer";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/auth";
import { useCustomers } from "@/hooks/customers";
import axios from "@/lib/axios";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export default function OrdersCreate() {
  const t = useTranslations("orders");
  const [openCreateCustomer, setOpenCreateCustomer] = useState<boolean>(false);

  const { customers, mutateCustomers } = useCustomers();

  useEffect(() => {
    if (openCreateCustomer === false) mutateCustomers();
  }, [openCreateCustomer]);
  return (
    <div>
      <CreateCustomer
        open={openCreateCustomer}
        setOpen={setOpenCreateCustomer}
      />
      <h1 className="font-size-2xl font-semibold">{t("choose_customer")}</h1>

      <div className="mt-8 flex justify-between">
        <SearchInput placeholder={t("search_by_phone")} />
        <Link href={"/orders/create"}>
          <Button onClick={() => setOpenCreateCustomer(!openCreateCustomer)}>
            {t("new_customer")}
          </Button>
        </Link>
      </div>

      <div className="border rounded-xl mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>اسم العميل</TableHead>
              <TableHead>رقم الهاتف</TableHead>

              <TableHead>اختيار</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {customers?.map((customer, index: number) => (
              <TableRow key={index} className="text-center">
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>

                <TableCell>
                  <Link href={`/orders/create/customer/${customer.id}`}>
                    <Button className="rounded-full h-auto">اختيار</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
