import { pdf } from "@react-pdf/renderer";
import {
	FileTextIcon,
	PencilIcon,
	PrinterIcon,
	RulerIcon,
	SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "@/lib/axios";
import { registerPDFFonts } from "@/lib/pdf-fonts";
import { type GetBranch, type GetOrder, getDirection } from "@/lib/types";
import { MeasurementDocument } from "../[orderId]/invoice/components/MeasurementDocument";

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
		if (!branch) return;

		setIsGeneratingPDF(true);
		try {
			registerPDFFonts();

			const order: GetOrder = await axios
				.get(`/api/v1/branch/${branch.id}/order/${orderId}`)
				.then((res) => res.data.data);

			const blob = await pdf(
				<MeasurementDocument order={order} branch={branch} />,
			).toBlob();

			const url = URL.createObjectURL(blob);
			window.open(url, "_blank");
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
				<Button variant="outline">
					<SettingsIcon /> {t("order_operations")}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuGroup className="font-medium">
					<DropdownMenuItem asChild>
						<Link href={`/orders/${orderId}/edit`}>
							<PencilIcon /> {t("update_order")}
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem asChild>
						<Link href={`/orders/${orderId}/edit`}>
							<FileTextIcon /> {t("print_invoice")}
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem asChild>
						<Link href={`/orders/${orderId}/edit`}>
							<PrinterIcon /> {t("print_receipt")}
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={handlePrintMeasurements}
						disabled={isGeneratingPDF || !branch}
					>
						<RulerIcon />
						{isGeneratingPDF ? t("loading") : t("print_measurements")}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
