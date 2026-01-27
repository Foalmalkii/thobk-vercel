import { CheckIcon, ChevronDown, PlusIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/auth";
import { useBranches } from "@/hooks/branches";
import axios from "@/lib/axios";
import { type branch, getDirection } from "@/lib/types";
import { NewBranchDialog } from "./NewBranchDialog";

export const BranchDropdown = () => {
	const locale = useLocale();
	const t = useTranslations("messages");

	const { isAdmin, isInBranch } = useAuth({ middleware: "auth" });
	const { branches, setCurrentBranch, getCurrentBranch, isLoadingBranches } =
		useBranches();
	const [open, setOpen] = useState<boolean>(false);

	if (isLoadingBranches) {
		<>
			<DropdownMenu dir={getDirection(locale)}>
				<DropdownMenuTrigger asChild>
					<Button variant={"ghost"}>
						<Spinner className="w-5 h-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>...</DropdownMenuLabel>
				</DropdownMenuContent>
			</DropdownMenu>
		</>;
	}
	const activeBranch = getCurrentBranch();
	const [current, setCurrent] = useState<number | undefined>(activeBranch?.id);

	return (
		<>
			<NewBranchDialog open={open} setOpen={setOpen} isAdmin={true} />
			<DropdownMenu dir={getDirection(locale)}>
				<DropdownMenuTrigger asChild>
					<Button variant={"ghost"}>
						{isInBranch ? getCurrentBranch()?.name : t("choose_branch")}
						<ChevronDown className="w-4 h-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>{t("branches")}</DropdownMenuLabel>

					<DropdownMenuGroup>
						{branches?.length === 0 ? (
							<DropdownMenuItem
								className="cursor-not-allowed"
								onClick={(e) => e.stopPropagation()}
							>
								لا يوجد أي فروع
							</DropdownMenuItem>
						) : (
							branches?.map((branch: branch) => {
								const isActive = activeBranch?.id === branch.id;
								return (
									<DropdownMenuItem
										onClick={(e) => setCurrentBranch(branch.id.toString())}
										className={`${isActive && "bg-zinc-100"}`}
									>
										{branch.name}
										{isActive && <CheckIcon />}
									</DropdownMenuItem>
								);
							})
						)}
					</DropdownMenuGroup>

					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => setOpen(!open)}>
						{t("add_branch")} <PlusIcon className="w-4 h-4" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
