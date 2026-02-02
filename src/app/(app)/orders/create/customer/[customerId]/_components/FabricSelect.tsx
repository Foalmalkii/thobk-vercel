// app/(app)/orders/[orderId]/edit/components/FabricSelect.tsx
"use client";

import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import useSWR from "swr";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";

interface Fabric {
	id: number;
	name: string;
	type: string;
	color: string;
	colorCode: string | null;
	supplier: string;
	remainingMeters: number | null;
}

interface FabricSelectProps {
	value?: number | null;
	onValueChange: (value: number | null) => void;
	disabled?: boolean;
	hasError?: boolean;
}

export const FabricSelect = ({
	value,
	onValueChange,
	disabled,
	hasError = false,
}: FabricSelectProps) => {
	const { isInBranch } = useAuth({ middleware: "auth" });
	const t = useTranslations("fabric");

	const { data, error, isLoading, mutate } = useSWR(
		isInBranch ? `/api/v1/branch/${isInBranch}/stock` : null,
		() =>
			axios.get(`/api/v1/branch/${isInBranch}/stock`).then((res) => res.data),
		{
			revalidateOnFocus: false,
		},
	);

	const fabrics: Fabric[] = data?.data || [];

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-2 border rounded-md">
				<Loader2Icon className="w-4 h-4 animate-spin" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-2 border rounded-md text-red-500 text-sm">
				{t("error_loading_fabrics")}
			</div>
		);
	}

	const selectedFabric = fabrics.find((f) => f.id === value);

	// Determine the className for the SelectTrigger
	const getTriggerClassName = () => {
		if (hasError) {
			return "border-orange-600 focus:ring-orange-600";
		}
		if (value) {
			return "border-blue-700 bg-blue-100 focus:ring-blue-700";
		}
		return "";
	};

	return (
		<Select
			value={value === null ? "outside" : value?.toString()}
			onValueChange={(val) => {
				if (val === "outside") {
					onValueChange(null);
				} else {
					onValueChange(Number(val));
				}
			}}
			disabled={disabled}
		>
			<SelectTrigger className={getTriggerClassName()}>
				<SelectValue placeholder={t("select_fabric")}>
					{value === null ? (
						<span>{t("outside_fabric")}</span>
					) : selectedFabric ? (
						<div className="flex items-center gap-2">
							<span>
								{selectedFabric.name} - {selectedFabric.color}
							</span>
							{selectedFabric.supplier && (
								<span className="text-xs text-muted-foreground">
									({selectedFabric.supplier})
								</span>
							)}
						</div>
					) : null}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{/* Outside Fabric Option */}
				<SelectItem value="outside">
					<div className="flex flex-col">
						<span className="font-semibold">{t("outside_fabric")}</span>
						<span className="text-xs text-muted-foreground">
							{t("outside_fabric_description")}
						</span>
					</div>
				</SelectItem>

				{/* Divider */}
				{fabrics.length > 0 && <div className="border-t my-1"></div>}

				{/* Available Fabrics */}
				{fabrics.length === 0 ? (
					<div className="p-4 text-center text-sm text-muted-foreground">
						{t("no_fabrics_available")}
					</div>
				) : (
					fabrics.map((fabric) => (
						<SelectItem key={fabric.id} value={fabric.id.toString()}>
							<div className="flex flex-col">
								<span>
									{fabric.name} - {fabric.color}
								</span>
								<span className="text-xs text-muted-foreground">
									{fabric.supplier}
									{fabric.remainingMeters &&
										` • ${fabric.remainingMeters}${t("meters_remaining")}`}
								</span>
							</div>
						</SelectItem>
					))
				)}
			</SelectContent>
		</Select>
	);
};

// Export a function to manually refresh the fabric list
export const useFabricListMutate = () => {
	const { isInBranch } = useAuth({ middleware: "auth" });
	const { mutate } = useSWR(
		isInBranch ? `/api/v1/branch/${isInBranch}/stock` : null,
	);
	return mutate;
};
