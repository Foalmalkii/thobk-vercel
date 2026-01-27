"use client";
import { MenuIcon } from "lucide-react";
import React from "react";
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
					<SearchInput />

					<LocaleDropdown />
					<Button
						variant={"outline"}
						onClick={() => {
							logout();
						}}
						size={"icon"}
						className=""
					>
						<QuestionCircleIcon className="w-5 h-5" />
					</Button>

					<Separator orientation="vertical" className="h-8" />

					<Avatar>
						<AvatarFallback>{user?.email?.slice(0, 2)}</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</nav>
	);
};
