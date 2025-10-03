"use client";
import React from "react";
import { SearchInput } from "../forms/search-input";
import { Button } from "../ui/button";
import { QuestionCircleIcon } from "../ui/icons";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { MenuIcon } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { LocaleDropdown } from "./locale-dropdown";

export const Navbar = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <nav className="px-8 py-4 border-b w-full ">
      <div className="flex max-md:justify-between justify-end w-full h-full items-center">
        <div className="md:hidden">
          <Button
            onClick={() => {
              setOpenMobile(true);
            }}
            variant={"outline"}
            size={"icon"}
          >
            <MenuIcon color="#c2c2c2" />
          </Button>
        </div>
        <div className="flex gap-3">
          <SearchInput />

          <LocaleDropdown />
          <Button variant={"outline"} size={"icon"} className="">
            <QuestionCircleIcon className="w-5 h-5" />
          </Button>

          <Separator orientation="vertical" className="h-8" />

          <Avatar>
            <AvatarFallback>FA</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};
