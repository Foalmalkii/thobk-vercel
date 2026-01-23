import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUS } from "@/lib/enums";
import { BoxIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export const OrderStatusDropdown = ({
	defaultValue,
}: {
	defaultValue: string;
}) => {
	const t = useTranslations("messages");
	const [value, setValue] = useState(defaultValue);
	return (
		<Select
			onValueChange={(value) => setValue(value)}
			value={value}
			defaultValue={defaultValue}
		>
			<SelectTrigger
				className={`${value === "received" && "bg-orange-100 border-orange-600 text-orange-600 gap-1 justify"}`}
			>
				<div className="flex gap-1 items-center">
					{value === "received" && <BoxIcon />}

					<SelectValue />
				</div>
			</SelectTrigger>

			<SelectContent>
				{Object.entries(ORDER_STATUS).map(([key, label]) => (
					<SelectItem key={key} value={key}>
						<span>{label}</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
