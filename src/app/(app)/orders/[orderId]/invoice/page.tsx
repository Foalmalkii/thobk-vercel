"use client";

import {
	Document,
	Font,
	Image,
	Page,
	PDFViewer,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import { useAuth } from "@/hooks/auth";
import { useGetBranch } from "@/hooks/branches/getBranch";
import { useGetOrder } from "@/hooks/orders/getOrder";
import { useGetStock } from "@/hooks/stock/getStock";
import { MeasurementDocument } from "./components/MeasurementDocument";

// Register IBM Plex Sans Arabic font family
Font.register({
	family: "IBMPlexSansArabic",
	fonts: [
		{ src: "/fonts/IBMPlexSansArabic-ExtraLight.ttf", fontWeight: 200 },
		{ src: "/fonts/IBMPlexSansArabic-Light.ttf", fontWeight: 300 },
		{ src: "/fonts/IBMPlexSansArabic-Regular.ttf", fontWeight: 400 },
		{ src: "/fonts/IBMPlexSansArabic-Medium.ttf", fontWeight: 500 },
		{ src: "/fonts/IBMPlexSansArabic-SemiBold.ttf", fontWeight: 600 },
		{ src: "/fonts/IBMPlexSansArabic-Bold.ttf", fontWeight: 700 },
	],
});

// Create styles for different font weights
const styles = StyleSheet.create({
	extraLight: {
		direction: "rtl",

		fontFamily: "IBMPlexSansArabic",
		fontWeight: 200,
	},
	light: {
		direction: "rtl",

		fontFamily: "IBMPlexSansArabic",
		fontWeight: 300,
	},
	regular: {
		direction: "rtl",
		fontFamily: "IBMPlexSansArabic",
		fontWeight: 400,
	},
	medium: {
		direction: "rtl",

		fontFamily: "IBMPlexSansArabic",
		fontWeight: 500,
	},
	semiBold: {
		direction: "rtl",

		fontFamily: "IBMPlexSansArabic",
		fontWeight: 600,
	},
	bold: {
		direction: "rtl",

		fontFamily: "IBMPlexSansArabic",
		fontWeight: 700,
	},
	cell: {
		width: "25%",
	},
	infoBox: {
		padding: "8px",
		border: "1px solid #e0e0e0",
		borderRadius: "2px",
	},
	label: {
		color: "#666",
		marginBottom: "3px",
		textTransform: "uppercase",
		letterSpacing: "0.5px",
	},
});

export default function OrderInvoicePage({
	params,
}: {
	params: { orderId: number };
}) {
	const { isInBranch } = useAuth({ middleware: "auth" });

	const { order } = useGetOrder({
		branchId: isInBranch,
		orderId: params.orderId,
	});

	const { branch } = useGetBranch({ branchId: isInBranch });
	if (!branch || !order) return;
	return (
		<div className="h-screen w-full">
			<PDFViewer className="w-full h-full">
				<MeasurementDocument branch={branch} order={order} />
			</PDFViewer>
		</div>
	);
}

// Export styles for use in other components
export { styles as pdfStyles };
