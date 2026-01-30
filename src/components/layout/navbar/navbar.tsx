"use client";
import { ArrowRightFromLine, MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth";
import { SearchInput } from "../../forms/search-input";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { QuestionCircleIcon } from "../../ui/icons";
import { Separator } from "../../ui/separator";
import { useSidebar } from "../../ui/sidebar";
import { LocaleDropdown } from "../locale-dropdown";
import { BranchDropdown } from "./branch-dropdown";

export const Navbar = () => {
	const { setOpenMobile } = useSidebar();
	const { logout, user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "",
	});

	const t = useTranslations("messages");

	return (
		<nav className="px-8 py-4 border-b w-full ">
			<div className="flex max-md:justify-between justify-between w-full h-full items-center">
				<div className="flex gap-3 items-center">
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
					<BranchDropdown />
				</div>
				<div className="flex gap-3">
					<LocaleDropdown />

					<Separator orientation="vertical" className="h-8" />

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar className="cursor-pointer">
								<AvatarFallback>{user?.email?.slice(0, 2)}</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuGroup>
								<DropdownMenuItem
									onClick={() => {
										logout();
									}}
									className="text-red-600"
								>
									{t("logout")} <ArrowRightFromLine />
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
};
