// app/(app)/orders/create/components/CustomersFilter.tsx
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

export const CustomersFilter = () => {
	const t = useTranslations("orders");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [open, setOpen] = useState(false);
	const [phoneInput, setPhoneInput] = useState("");
	const [nameInput, setNameInput] = useState("");

	// Current filters from URL
	const currentPhones = searchParams.getAll("phone[]");
	const currentNames = searchParams.getAll("name[]");

	// Local state for pending filters (before save)
	const [pendingPhones, setPendingPhones] = useState<string[]>([]);
	const [pendingNames, setPendingNames] = useState<string[]>([]);

	// Initialize pending filters when dialog opens
	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (isOpen) {
			setPendingPhones([...currentPhones]);
			setPendingNames([...currentNames]);
			setPhoneInput("");
			setNameInput("");
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

	const handleAddName = () => {
		if (nameInput.trim() && !pendingNames.includes(nameInput.trim())) {
			setPendingNames([...pendingNames, nameInput.trim()]);
			setNameInput("");
		}
	};

	const handleRemoveName = (name: string) => {
		setPendingNames(pendingNames.filter((n) => n !== name));
	};

	const handleSaveFilters = () => {
		const params = new URLSearchParams();

		// Add phone filters
		pendingPhones.forEach((phone) => {
			params.append("phone[]", phone);
		});

		// Add name filters
		pendingNames.forEach((name) => {
			params.append("name[]", name);
		});

		// Reset to page 1 when filtering
		params.set("page", "1");

		router.push(`${pathname}?${params.toString()}`);
		setOpen(false);
	};

	const handleClearFilters = () => {
		setPendingPhones([]);
		setPendingNames([]);
	};

	const hasPendingFilters = pendingPhones.length > 0 || pendingNames.length > 0;
	const hasActiveFilters = currentPhones.length > 0 || currentNames.length > 0;

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline" className="relative">
					<Settings2Icon className="h-4 w-4 mr-2" />
					{t("filter")}
					{hasActiveFilters && (
						<span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
							{currentPhones.length + currentNames.length}
						</span>
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>{t("filters")}</DialogTitle>
				</DialogHeader>

				<div className="space-y-6 py-4">
					{/* Name Filter */}
					<div className="space-y-3">
						<Label>{t("filter_by_name")}</Label>
						<div className="flex gap-2">
							<Input
								type="text"
								placeholder={t("enter_name")}
								value={nameInput}
								onChange={(e) => setNameInput(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleAddName();
									}
								}}
							/>
							<Button onClick={handleAddName} type="button" size="sm">
								{t("add")}
							</Button>
						</div>
						{pendingNames.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{pendingNames.map((name) => (
									<Badge key={name} variant="secondary" className="gap-1">
										{name}
										<X
											className="h-3 w-3 cursor-pointer hover:text-destructive"
											onClick={() => handleRemoveName(name)}
										/>
									</Badge>
								))}
							</div>
						)}
					</div>

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
