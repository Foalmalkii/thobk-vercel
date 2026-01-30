"use client";

import { Settings2Icon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const OrdersFilter = () => {
	const t = useTranslations("orders");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [open, setOpen] = useState(false);
	const [phoneInput, setPhoneInput] = useState("");

	// Current filters from URL
	const currentPhones = searchParams.getAll("phone[]");
	const currentStatuses = searchParams.getAll("status[]");

	// Local state for pending filters (before save)
	const [pendingPhones, setPendingPhones] = useState<string[]>([]);
	const [pendingStatuses, setPendingStatuses] = useState<string[]>([]);

	// Initialize pending filters when dialog opens
	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (isOpen) {
			setPendingPhones([...currentPhones]);
			setPendingStatuses([...currentStatuses]);
			setPhoneInput("");
		}
	};

	const handleAddPhone = () => {
		if (phoneInput.trim() && !pendingPhones.includes(phoneInput.trim())) {
			setPendingPhones([...pendingPhones, phoneInput.trim()]);
			setPhoneInput("");
		}
	};

	const handleRemovePhone = (phone: string) => {
		setPendingPhones(pendingPhones.filter((p) => p !== phone));
	};

	const handleStatusToggle = (status: string) => {
		if (pendingStatuses.includes(status)) {
			setPendingStatuses(pendingStatuses.filter((s) => s !== status));
		} else {
			setPendingStatuses([...pendingStatuses, status]);
		}
	};

	const handleSaveFilters = () => {
		const params = new URLSearchParams();

		// Add phone filters
		pendingPhones.forEach((phone) => {
			params.append("phone[]", phone);
		});

		// Add status filters
		pendingStatuses.forEach((status) => {
			params.append("status[]", status);
		});

		// Reset to page 1 when filtering
		params.set("page", "1");

		router.push(`${pathname}?${params.toString()}`);
		setOpen(false);
	};

	const handleClearFilters = () => {
		setPendingPhones([]);
		setPendingStatuses([]);
	};

	const hasPendingFilters =
		pendingPhones.length > 0 || pendingStatuses.length > 0;
	const hasActiveFilters =
		currentPhones.length > 0 || currentStatuses.length > 0;

	const STATUS_OPTIONS = [
		"received",
		"in_progress",
		"ready",
		"delivered",
		"canceled",
	];

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline" className="relative h-full">
					<Settings2Icon className="h-4 w-4 mr-2" />
					{t("filter")}
					{hasActiveFilters && (
						<span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
							{currentPhones.length + currentStatuses.length}
						</span>
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>{t("filters")}</DialogTitle>
				</DialogHeader>

				<div className="space-y-6 py-4">
					{/* Phone Filter */}
					<div className="space-y-3">
						<Label>{t("filter_by_phone")}</Label>
						<div className="flex gap-2">
							<Input
								type="tel"
								placeholder="0512345678"
								value={phoneInput}
								onChange={(e) => setPhoneInput(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleAddPhone();
									}
								}}
								maxLength={10}
							/>
							<Button onClick={handleAddPhone} type="button" size="sm">
								{t("add")}
							</Button>
						</div>
						{pendingPhones.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{pendingPhones.map((phone) => (
									<Badge key={phone} variant="secondary" className="gap-1">
										{phone}
										<X
											className="h-3 w-3 cursor-pointer hover:text-destructive"
											onClick={() => handleRemovePhone(phone)}
										/>
									</Badge>
								))}
							</div>
						)}
					</div>

					{/* Status Filter */}
					<div className="space-y-3">
						<Label>{t("filter_by_status")}</Label>
						<div className="flex flex-wrap gap-2">
							{STATUS_OPTIONS.map((status) => (
								<Badge
									key={status}
									variant={
										pendingStatuses.includes(status) ? "default" : "outline"
									}
									className="cursor-pointer select-none"
									onClick={() => handleStatusToggle(status)}
								>
									{t(`status_${status}`)}
								</Badge>
							))}
						</div>
					</div>
				</div>

				<DialogFooter className="gap-2">
					{hasPendingFilters && (
						<Button variant="ghost" onClick={handleClearFilters} type="button">
							{t("clear_all")}
						</Button>
					)}
					<Button onClick={handleSaveFilters} type="button">
						{t("save_filters")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
