"use client";
import React from "react";
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
import { ArrowLeftIcon, ArrowRightIcon, DigipLogo } from "./ui/icons";
import Link from "next/link";
import {
	CogIcon,
	FileIcon,
	FilePlusIcon,
	HomeIcon,
	ListOrderedIcon,
	PencilRulerIcon,
	UserRoundPlusIcon,
	UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { getDirection } from "@/lib/types";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/hooks/auth";
import { CreditBadgeCard } from "./layout/CreditBadgeCard";

export const AppSidebar = () => {
	const { open, setOpen, isMobile, setOpenMobile, openMobile } = useSidebar();
	const pathname = usePathname();
	const locale = useLocale();
	const t = useTranslations();
	const { user } = useAuth({ middleware: "auth" });
	const menuItems = {
		home: {
			label: t("messages.home"),
			items: [
				{ name: "عام", href: "/", icon: HomeIcon },
				{ name: "الفواتير", href: "/invoices", icon: FileIcon },
			],
		},
		general: {
			label: t("messages.general"),
			items: [
				{ name: t("messages.orders"), href: "/orders", icon: UsersIcon },
				{
					name: t("messages.customers"),
					href: "/customers",
					icon: UserRoundPlusIcon,
				},
				{ name: "القياسات", href: "/customers/sizes", icon: PencilRulerIcon },
			],
		},
		orders: {
			label: "الطلبات",
			items: [
				{ name: "جميع الطلبات", href: "/orders", icon: ListOrderedIcon },
				{ name: "إضافة طلب", href: "/orders/add", icon: FilePlusIcon },
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
												asChild
												isActive={
													item.href !== "/"
														? pathname.startsWith(item.href)
														: pathname === item.href
												}
												onClick={() => {
													if (isMobile) setOpenMobile(false);
												}}
											>
												<Link className="" href={item.href}>
													<item.icon /> {item.name}
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
						{key !== "orders" && <SidebarSeparator />}
					</>
				))}
			</SidebarContent>

			<SidebarFooter className="border-t py-6">
				<SidebarMenu>
					<SidebarMenuItem>
						<CreditBadgeCard user={user} />
					</SidebarMenuItem>
					<SidebarMenuItem className={`${!open && "mx-auto"}`}>
						<SidebarMenuButton asChild>
							<Link href={"/settings"}>
								<CogIcon /> الإعدادات
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};
