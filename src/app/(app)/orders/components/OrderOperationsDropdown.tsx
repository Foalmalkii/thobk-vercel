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
	RulerIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import { DeleteOrderConfirmation } from "./DeleteOrderConfirmation";
import { pdf } from "@react-pdf/renderer";
import { GetBranch, GetOrder } from "@/lib/types";
import { MeasurementDocument } from "../[orderId]/invoice/components/MeasurementDocument";
import axios from "@/lib/axios";
import { registerPDFFonts } from "@/lib/pdf-fonts";

export const OrderOperationsDropdown = ({
	orderId,
	branch,
}: {
	orderId: number;
	branch?: GetBranch;
}) => {
	const t = useTranslations("messages");
	const locale = useLocale();
	const dir = getDirection(locale);
	const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

	const handlePrintMeasurements = async () => {
		if (!branch) {
			console.error("Branch data is missing");
			return;
		}

		setIsGeneratingPDF(true);
		try {
			// Register fonts before generating PDF
			registerPDFFonts();

			// Fetch order data
			const order: GetOrder = await axios
				.get(`/api/v1/branch/${branch.id}/order/${orderId}`)
				.then((res) => res.data.data);

			// Generate PDF blob
			const blob = await pdf(
				<MeasurementDocument order={order} branch={branch} />,
			).toBlob();

			// Create blob URL and open in new window
			const url = URL.createObjectURL(blob);
			window.open(url, "_blank");

			// Clean up the blob URL after a delay
			setTimeout(() => URL.revokeObjectURL(url), 100);
		} catch (error) {
			console.error("Error generating measurements PDF:", error);
		} finally {
			setIsGeneratingPDF(false);
		}
	};

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
							<PencilIcon /> تحديث الطلب
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
					<DropdownMenuItem
						onClick={handlePrintMeasurements}
						disabled={isGeneratingPDF || !branch}
					>
						<RulerIcon />
						{isGeneratingPDF ? "جاري التحميل..." : "طباعة المقاسات"}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
