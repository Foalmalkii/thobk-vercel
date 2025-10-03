"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CheckIcon, GlobeIcon } from "lucide-react";
import { locales } from "@/middleware";
import Cookies from "js-cookie";
import { getDirection } from "@/lib/types";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { SaudiFlagIcon, USFlagIcon } from "../ui/icons";

export const LocaleDropdown = () => {
  const locale = useLocale();
  const localesNew = locales.filter((localeNew) => localeNew !== locale);

  const t = useTranslations();
  const router = useRouter();
  return (
    <DropdownMenu dir={getDirection(locale)}>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="shadow-none">
          <GlobeIcon color="#c2c2c2" strokeWidth={1} className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 shadow-none">
        <DropdownMenuLabel>{t("Navbar.choose_locale")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="bg-zinc-100 flex w-full justify-between"
          defaultChecked
        >
          <span className="flex items-center gap-2">
            {locale === "ar" ? (
              <SaudiFlagIcon className="w-4 h-4" />
            ) : locale === "en" ? (
              <USFlagIcon className="w-4 h-4 " />
            ) : null}
            {t("Navbar.locale_" + locale)}
          </span>
          <span>
            <CheckIcon className="w-4 h-4" />
          </span>
        </DropdownMenuItem>
        {localesNew.map((localeNew) => (
          <DropdownMenuItem
            onClick={() => {
              Cookies.set("locale", localeNew, { path: "/" });
              router.refresh();
            }}
            key={localeNew}
          >
            {localeNew === "ar" ? (
              <SaudiFlagIcon className="w-5 h-5" />
            ) : localeNew === "en" ? (
              <USFlagIcon className="w-5 h-5 " />
            ) : null}
            {t("Navbar.locale_" + localeNew)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
