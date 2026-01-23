import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getDirection } from "@/lib/types";
import {
	FileIcon,
	FileTextIcon,
	PencilIcon,
	PrinterIcon,
	SettingsIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { DeleteOrderConfirmation } from "./DeleteOrderConfirmation";

export const OrderOperationsDropdown = ({ orderId }: { orderId: number }) => {
	const t = useTranslations("messages");
	const locale = useLocale();
	const dir = getDirection(locale);
	//TODO PRINT MEASUREMENTS
	return (
		<DropdownMenu dir={dir}>
			<DropdownMenuTrigger asChild>
				<Button variant={"outline"}>
					<SettingsIcon /> {t("order_operations")}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup className="font-medium">
					<DropdownMenuItem asChild>
						<Link href={`/orders/${orderId}/edit`}>
							<PencilIcon /> تعديل
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href={`/orders/${orderId}/edit`}>
							<FileTextIcon /> طباعة الفاتورة
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href={`/orders/${orderId}/edit`}>
							<PrinterIcon /> طباعة سند القبض
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				{/*
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<DeleteOrderConfirmation orderId={orderId} />
					</DropdownMenuItem>
				</DropdownMenuGroup>
*/}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
