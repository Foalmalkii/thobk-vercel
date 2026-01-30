import {
	BoxIcon,
	CheckCircleIcon,
	Loader2Icon,
	PackageCheckIcon,
	ScissorsIcon,
	XCircleIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";

const STATUS_CONFIG = {
	received: {
		icon: BoxIcon,
		bgClass: "bg-orange-100",
		borderClass: "border-orange-600",
		textClass: "text-orange-600",
	},
	in_progress: {
		icon: ScissorsIcon,
		bgClass: "bg-blue-100",
		borderClass: "border-blue-600",
		textClass: "text-blue-600",
	},
	ready: {
		icon: PackageCheckIcon,
		bgClass: "bg-purple-100",
		borderClass: "border-purple-600",
		textClass: "text-purple-600",
	},
	delivered: {
		icon: CheckCircleIcon,
		bgClass: "bg-green-100",
		borderClass: "border-green-600",
		textClass: "text-green-600",
	},
	canceled: {
		icon: XCircleIcon,
		bgClass: "bg-red-100",
		borderClass: "border-red-600",
		textClass: "text-red-600",
	},
};

type OrderStatus = keyof typeof STATUS_CONFIG;

interface OrderStatusDropdownProps {
	defaultValue: OrderStatus;
	orderId: number;
	onStatusChange?: (newStatus: OrderStatus) => void;
}

export const OrderStatusDropdown = ({
	defaultValue,
	orderId,
	onStatusChange,
}: OrderStatusDropdownProps) => {
	const t = useTranslations("order_status");
	const tMessages = useTranslations("messages");
	const { isInBranch } = useAuth({ middleware: "auth" });
	const [value, setValue] = useState<OrderStatus>(defaultValue);
	const [isUpdating, setIsUpdating] = useState(false);

	const currentStatus = STATUS_CONFIG[value];
	const StatusIcon = currentStatus?.icon;

	const handleStatusChange = async (newStatus: string) => {
		const previousStatus = value;
		const newStatusTyped = newStatus as OrderStatus;

		// Optimistic update
		setValue(newStatusTyped);

		setIsUpdating(true);

		try {
			await axios.patch(`/api/v1/branch/${isInBranch}/order/${orderId}`, {
				status: newStatus,
			});

			// Success toast
			toast.success(tMessages("status_updated_successfully"), {
				description: `${tMessages("status_changed_to")} ${t(newStatus)}`,
				position: "top-center",
			});

			// Call optional callback
			onStatusChange?.(newStatusTyped);
		} catch (error: any) {
			// Revert to previous status on error
			setValue(previousStatus);

			// Error toast
			const errorMessage =
				error?.response?.data?.message || tMessages("status_update_failed");

			toast.error(tMessages("error"), {
				description: errorMessage,
				position: "top-center",
			});

			console.error("Failed to update order status:", error);
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<Select
			onValueChange={handleStatusChange}
			value={value}
			disabled={isUpdating}
		>
			<SelectTrigger
				className={`${currentStatus?.bgClass} ${currentStatus?.borderClass} ${currentStatus?.textClass} gap-2 font-medium`}
			>
				<div className="flex gap-2 items-center">
					{isUpdating ? (
						<Loader2Icon className="w-4 h-4 animate-spin" />
					) : (
						StatusIcon && <StatusIcon className="w-4 h-4" />
					)}
					<SelectValue />
				</div>
			</SelectTrigger>

			<SelectContent>
				{Object.keys(STATUS_CONFIG).map((key) => {
					const config = STATUS_CONFIG[key as OrderStatus];
					const Icon = config?.icon;

					return (
						<SelectItem key={key} value={key}>
							<div className="flex items-center gap-2">
								<span>{t(key)}</span>
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};
