import React from "react";
import { SearchInput } from "../forms/search-input";
import { Button } from "./button";
import { BellIcon, QuestionCircleIcon } from "./icons";
import { Separator } from "./separator";
import { Avatar, AvatarFallback } from "./avatar";

export const Navbar = () => {
  return (
    <nav className="px-8 py-4 border-b w-full ">
      <div className="flex justify-end w-full gap-3 h-full items-center">
        <SearchInput />
        <Button variant={"outline"} size={"icon"} className="shadow-none">
          <BellIcon className="w-4 h-4" />
        </Button>
        <Button variant={"outline"} size={"icon"} className="">
          <QuestionCircleIcon className="w-5 h-5" />
        </Button>

        <Separator orientation="vertical" className="h-8" />

        <Avatar>
          <AvatarFallback>FA</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};
