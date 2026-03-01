"use client";
import {
	CoinsIcon,
	CogIcon,
	FactoryIcon,
	FileIcon,
	FilePlusIcon,
	HomeIcon,
	ListOrderedIcon,
	PencilRulerIcon,
	UserRoundPlusIcon,
	Users2Icon,
	UsersIcon,
	WarehouseIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { useAuth } from "@/hooks/auth";
import { getDirection } from "@/lib/types";
import { CreditBadgeCard } from "./layout/CreditBadgeCard";
import { ArrowLeftIcon, ArrowRightIcon, DigipLogo } from "./ui/icons";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
	useSidebar,
} from "./ui/sidebar";

export const AppSidebar = () => {
	const { open, setOpen, isMobile, setOpenMobile, openMobile } = useSidebar();
	const pathname = usePathname();
	const locale = useLocale();
	const t = useTranslations();
	const { user } = useAuth({ middleware: "auth" });
	const menuItems = {
		general: {
			label: t("messages.general"),
			items: [
				{ name: t("messages.general"), href: "/", icon: HomeIcon },
				{ name: t("messages.orders"), href: "/orders", icon: UsersIcon },

				{ name: t("messages.storage"), href: "/storage", icon: WarehouseIcon },
				{ name: t("messages.factory"), href: "/factory", icon: FactoryIcon },
				{ name: t("messages.erp"), href: "/erp", icon: PencilRulerIcon },
				{
					name: t("messages.accounting"),
					href: "/accounting",
					icon: CoinsIcon,
					soon: true,
				},
			],
		},
	};
	console.log("hi + " + locale);
	return (
		<Sidebar
			dir={getDirection(locale)}
			side={locale === "ar" ? "right" : "left"}
			collapsible="icon"
			variant="sidebar"
		>
			<SidebarHeader className="p-4">
				<div className="flex justify-between w-full items-center">
					{open ? (
						<>
							<DigipLogo className="h-12" />
							{getDirection(locale) === "rtl" ? (
								<ArrowRightIcon
									onClick={() => {
										if (!isMobile) setOpen(!open);
										else setOpenMobile(!openMobile);
									}}
									className="cursor-pointer w-6 h-6 hover:bg-zinc-100 hover:border hover:rounded"
								/>
							) : (
								<ArrowLeftIcon
									onClick={() => {
										if (!isMobile) setOpen(!open);
										else setOpenMobile(!openMobile);
									}}
									className="cursor-pointer w-6 h-6 hover:bg-zinc-100 hover:border hover:rounded"
								/>
							)}
						</>
					) : getDirection(locale) === "rtl" ? (
						<ArrowLeftIcon
							onClick={() => {
								if (!isMobile) setOpen(!open);
								else setOpenMobile(!openMobile);
							}}
							className="cursor-pointer w-6 h-6 hover:bg-zinc-100 hover:border hover:rounded"
						/>
					) : (
						<ArrowRightIcon
							onClick={() => {
								if (!isMobile) setOpen(!open);
								else setOpenMobile(!openMobile);
							}}
							className="cursor-pointer w-6 h-6 hover:bg-zinc-100 hover:border hover:rounded"
						/>
					)}
				</div>
			</SidebarHeader>
			<SidebarContent>
				{Object.entries(menuItems).map(([key, group]) => (
					<>
						<SidebarGroup key={key}>
							<SidebarGroupLabel className={`${!open && "justify-center"}`}>
								{group.label}
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{group.items.map((item) => (
										<SidebarMenuItem
											className={`${!open && "mx-auto"}`}
											key={item.name}
										>
											<SidebarMenuButton
												asChild={true}
												isActive={
													item.href !== "/"
														? pathname.startsWith(item.href)
														: pathname === item.href
												}
												onClick={() => {
													if (isMobile) setOpenMobile(false);
												}}
											>
												{item.soon ? (
													<div className="flex items-center gap-2 w-full opacity-60 cursor-default">
														<item.icon />

														<span className="flex-1 flex ">
															<span className="">{item.name}</span>
														</span>
														{open && (
															<span className="text-[10px] font-semibold bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full">
																{t("messages.soon")}
															</span>
														)}
													</div>
												) : (
													<Link href={item.href}>
														<item.icon /> {item.name}
													</Link>
												)}
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</>
				))}
			</SidebarContent>

			<SidebarFooter className="border-t py-6">
				<SidebarMenu>
					<SidebarMenuItem>
						<CreditBadgeCard user={user} />
					</SidebarMenuItem>
					{/*<SidebarMenuItem className={`${!open && "mx-auto"}`}>
						<SidebarMenuButton asChild>
							<Link href={"/settings"}>
								<CogIcon /> الإعدادات
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>*/}
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};
