import React from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "../ui/icons";

export const SearchInput = () => {
  return (
    <div className="relative">
      <Input
        placeholder="ابحث..."
        type="text"
        className="shadow-none pr-8 max-md:hidden"
      />
      <SearchIcon className="absolute w-5 h-5 top-2 right-2 max-md:hidden" />
    </div>
  );
};
