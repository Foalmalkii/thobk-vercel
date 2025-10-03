import { SearchInput } from "@/components/forms/search-input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function OrdersCreate() {
  const t = useTranslations("orders");
  return (
    <div>
      <h1 className="font-size-2xl font-semibold">{t("choose_customer")}</h1>
      <div className="mt-8 flex justify-between">
        <SearchInput placeholder={t("search_by_phone")} />
        <Link href={"/orders/create"}>
          <Button>{t("new_customer")}</Button>
        </Link>
      </div>

      <div className="border rounded-xl mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>اسم العميل</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>العنوان</TableHead>
              <TableHead>المزيد</TableHead>
              <TableHead>اختيار</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index} className="text-center">
                <TableCell>1</TableCell>
                <TableCell>محمد أحمد</TableCell>
                <TableCell>01012345678</TableCell>
                <TableCell>123 شارع النيل، القاهرة</TableCell>
                <TableCell>s</TableCell>
                <TableCell>
                  <Button className="rounded-full h-auto">اختيار</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
