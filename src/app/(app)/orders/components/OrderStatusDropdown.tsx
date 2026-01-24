import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUS } from "@/lib/enums";
import {
	BoxIcon,
	ScissorsIcon,
	CheckCircleIcon,
	PackageCheckIcon,
	XCircleIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

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

export const OrderStatusDropdown = ({
	defaultValue,
}: {
	defaultValue: string;
}) => {
	const t = useTranslations("messages");
	const [value, setValue] = useState(defaultValue);

	const currentStatus = STATUS_CONFIG[value as keyof typeof STATUS_CONFIG];
	const StatusIcon = currentStatus?.icon;

	return (
		<Select
			onValueChange={(value) => setValue(value)}
			value={value}
			defaultValue={defaultValue}
		>
			<SelectTrigger
				className={`${currentStatus?.bgClass} ${currentStatus?.borderClass} ${currentStatus?.textClass} gap-2 font-medium`}
			>
				<div className="flex gap-2 items-center">
					<SelectValue />
				</div>
			</SelectTrigger>

			<SelectContent>
				{Object.entries(ORDER_STATUS).map(([key, label]) => {
					const config = STATUS_CONFIG[key as keyof typeof STATUS_CONFIG];
					const Icon = config?.icon;

					return (
						<SelectItem key={key} value={key}>
							<div className="flex items-center gap-2">
								{Icon && <Icon className={`w-4 h-4 ${config.textClass}`} />}
								<span>{label}</span>
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};
