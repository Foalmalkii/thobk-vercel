"use client";
import { Page, Text, View } from "@react-pdf/renderer";
import React from "react";
import type { GetBranch, GetOrder, OrderItem } from "@/lib/types";
import { pdfStyles } from "../page";
import { MeasurementImage } from "./MeasurementImage";

const computePaymentSummary = (order: GetOrder) => {
	const orderTotal = order.items.reduce(
		(sum, i) => sum + i.quantity * i.price,
		0,
	);

	const finalInvoice = order.invoices.find(
		(inv) => inv.documentType === "invoice" && inv.status === "paid",
	);

	if (finalInvoice) {
		const paidDebitNotes = order.invoices
			.filter(
				(inv) => inv.documentType === "debit_note" && inv.status === "paid",
			)
			.reduce((sum, inv) => sum + inv.total, 0);
		const paid = finalInvoice.total + paidDebitNotes;
		return { orderTotal, paid, remaining: orderTotal - paid };
	}

	const paidDeposits = order.invoices
		.filter(
			(inv) => inv.documentType === "invoice_deposit" && inv.status === "paid",
		)
		.reduce((sum, inv) => sum + inv.total, 0);

	return { orderTotal, paid: paidDeposits, remaining: orderTotal - paidDeposits };
};

export const MeasurementPage = ({
	order,
	item,
	branch,
}: {
	order: GetOrder;
	item: OrderItem;
	branch: GetBranch;
}) => {
	const { orderTotal, paid, remaining } = computePaymentSummary(order);
	const d = new Date();
	const printDate = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

	return (
		<Page size="A4" style={{ padding: "15px", fontSize: "8px" }}>
			{/* Compact Header */}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					borderBottom: "1.5px solid #000",
					paddingBottom: "6px",
					marginBottom: "10px",
				}}
			>
				<View style={{ width: "50%" }}>
					<Text style={[{ fontSize: "14px" }, pdfStyles.bold]}>
						TAILOR ORDER SHEET
					</Text>
					<Text
						style={[
							{ fontSize: "7px", marginTop: "2px", color: "#666" },
							pdfStyles.light,
						]}
					>
						{branch?.name}
					</Text>
				</View>
				<View style={{ width: "50%", alignItems: "flex-end" }}>
					<Text style={[{ fontSize: "12px" }, pdfStyles.bold]}>
						Order #{order?.id}
					</Text>
					<Text
						style={[{ fontSize: "7px", marginTop: "1px" }, pdfStyles.regular]}
					>
						Due: {order.dueDate}
					</Text>
				</View>
			</View>

			{/* Two Column Layout for Info */}
			<View style={{ flexDirection: "row", gap: "10px", marginBottom: "8px" }}>
				{/* Left Column */}
				<View style={{ width: "50%" }}>
					{/* Order Info */}
					<View style={{ marginBottom: "6px" }}>
						<Text
							style={[
								{
									fontSize: "9px",
									marginBottom: "4px",
									backgroundColor: "#f0f0f0",
									padding: "3px",
								},
								pdfStyles.bold,
							]}
						>
							ORDER INFO
						</Text>
						<View style={{ flexDirection: "column", gap: "4px" }}>
							<View style={{ flexDirection: "row", gap: "4px" }}>
								<View style={{ flex: 1, padding: "4px", border: "1px solid #e0e0e0" }}>
									<Text style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}>Order #</Text>
									<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>#{order.id}</Text>
								</View>
								<View style={{ flex: 1, padding: "4px", border: "1px solid #e0e0e0" }}>
									<Text style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}>Date</Text>
									<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>{order.createdAt.slice(0, 10)}</Text>
								</View>
							</View>
							<View style={{ flexDirection: "row", gap: "4px" }}>
								<View style={{ flex: 1, padding: "4px", border: "1px solid #e0e0e0" }}>
									<Text style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}>Due Date</Text>
									<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>{order.dueDate}</Text>
								</View>
								<View style={{ flex: 1, padding: "4px", border: "1px solid #e0e0e0" }}>
									<Text style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}>Total</Text>
									<Text style={[{ fontSize: "8px" }, pdfStyles.bold]}>{orderTotal.toFixed(2)} SAR</Text>
								</View>
							</View>
							<View style={{ flexDirection: "row", gap: "4px" }}>
								<View style={{ flex: 1, padding: "4px", border: "1px solid #e0e0e0" }}>
									<Text style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}>Paid</Text>
									<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>{paid.toFixed(2)} SAR</Text>
								</View>
								<View style={{ flex: 1, padding: "4px", border: "1px solid #e0e0e0" }}>
									<Text style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}>Remaining</Text>
									<Text style={[{ fontSize: "8px" }, pdfStyles.bold]}>{remaining > 0 ? `${remaining.toFixed(2)} SAR` : "FULLY PAID"}</Text>
								</View>
							</View>
						</View>
					</View>

					{/* Customer Info */}
					<View style={{ marginBottom: "6px" }}>
						<Text
							style={[
								{
									fontSize: "9px",
									marginBottom: "4px",
									backgroundColor: "#f0f0f0",
									padding: "3px",
								},
								pdfStyles.bold,
							]}
						>
							CUSTOMER
						</Text>
						<View
							style={{ flexDirection: "row", flexWrap: "wrap", gap: "4px" }}
						>
							<View
								style={{
									width: "100%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text
									style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}
								>
									Name
								</Text>
								<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>
									{order.customer.name}
								</Text>
							</View>
							<View
								style={{
									width: "48%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text
									style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}
								>
									ID
								</Text>
								<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>
									#{order.customer.id}
								</Text>
							</View>
							<View
								style={{
									width: "48%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text
									style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}
								>
									Phone
								</Text>
								<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>
									{order.customer.phone}
								</Text>
							</View>
						</View>
					</View>
				</View>

				{/* Right Column */}
				<View style={{ width: "50%" }}>
					{/* Item Details */}
					<View style={{ marginBottom: "6px" }}>
						<Text
							style={[
								{
									fontSize: "9px",
									marginBottom: "4px",
									backgroundColor: "#f0f0f0",
									padding: "3px",
								},
								pdfStyles.bold,
							]}
						>
							ITEM DETAILS
						</Text>
						<View
							style={{ flexDirection: "row", flexWrap: "wrap", gap: "4px" }}
						>
							<View
								style={{
									width: "100%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text
									style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}
								>
									Thobe Type
								</Text>
								<Text style={[{ fontSize: "9px" }, pdfStyles.bold]}>
									{item?.thobeType || "N/A"}
								</Text>
							</View>
							<View
								style={{
									width: "31%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text
									style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}
								>
									Qty
								</Text>
								<Text style={[{ fontSize: "8px" }, pdfStyles.bold]}>
									{item?.quantity || 1}
								</Text>
							</View>
							<View
								style={{
									width: "31%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text
									style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}
								>
									Price
								</Text>
								<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>
									{item?.price || 0}
								</Text>
							</View>
							<View
								style={{
									width: "31%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text
									style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}
								>
									Total
								</Text>
								<Text style={[{ fontSize: "8px" }, pdfStyles.bold]}>
									{(item?.price || 0) * (item?.quantity || 1)}
								</Text>
							</View>
						</View>
					</View>

					{/* Fabric Details */}
					<View style={{ marginBottom: "6px" }}>
						<Text
							style={[
								{
									fontSize: "9px",
									marginBottom: "4px",
									backgroundColor: "#f0f0f0",
									padding: "3px",
								},
								pdfStyles.bold,
							]}
						>
							FABRIC
						</Text>
						{item?.fabric ? (
							<View
								style={{ flexDirection: "row", flexWrap: "wrap", gap: "4px" }}
							>
								<View
									style={{
										width: "48%",
										padding: "4px",
										border: "1px solid #e0e0e0",
									}}
								>
									<Text
										style={[
											{ fontSize: "6px", color: "#666" },
											pdfStyles.light,
										]}
									>
										Name
									</Text>
									<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>
										{item.fabric.name}
									</Text>
								</View>
								<View
									style={{
										width: "48%",
										padding: "4px",
										border: "1px solid #e0e0e0",
									}}
								>
									<Text
										style={[
											{ fontSize: "6px", color: "#666" },
											pdfStyles.light,
										]}
									>
										Type
									</Text>
									<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>
										{item.fabric.type}
									</Text>
								</View>
								<View
									style={{
										width: "48%",
										padding: "4px",
										border: "1px solid #e0e0e0",
									}}
								>
									<Text
										style={[
											{ fontSize: "6px", color: "#666" },
											pdfStyles.light,
										]}
									>
										Color
									</Text>
									<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>
										{item.fabric.color}
									</Text>
								</View>
								<View
									style={{
										width: "48%",
										padding: "4px",
										border: "1px solid #e0e0e0",
									}}
								>
									<Text
										style={[
											{ fontSize: "6px", color: "#666" },
											pdfStyles.light,
										]}
									>
										Supplier
									</Text>
									<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>
										{item.fabric.supplier}
									</Text>
								</View>
								{item.fabric.batches && item.fabric.batches.length > 0 && (
									<View
										style={{
											width: "100%",
											padding: "4px",
											border: "1px solid #e0e0e0",
										}}
									>
										<Text
											style={[
												{ fontSize: "6px", color: "#666" },
												pdfStyles.light,
											]}
										>
											Batch SKU
										</Text>
										<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>
											{item.fabric.batches[0].sku}
										</Text>
									</View>
								)}
							</View>
						) : (
							<View
								style={{
									width: "100%",
									padding: "8px",
									border: "1px solid #e0e0e0",
									backgroundColor: "#fff9e6",
								}}
							>
								<Text
									style={[
										{ fontSize: "8px", textAlign: "center" },
										pdfStyles.bold,
									]}
								>
									Outside Fabric (Customer Provided)
								</Text>
							</View>
						)}
					</View>
				</View>
			</View>


		{/* Measurements Section - Most space */}
			<View style={{ flex: 1 }}>
				<Text
					style={[
						{
							fontSize: "9px",
							marginBottom: "4px",
							backgroundColor: "#f0f0f0",
							padding: "3px",
						},
						pdfStyles.bold,
					]}
				>
					MEASUREMENTS
				</Text>
				<MeasurementImage orderItem={item} />
			</View>

			{/* Compact Footer */}
			<View
				style={{
					marginTop: "6px",
					paddingTop: "6px",
					borderTop: "1px solid #ddd",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View style={{ width: "33%" }}>
					<Text style={[{ fontSize: "7px" }, pdfStyles.regular]}>
						Tailor: _______________
					</Text>
				</View>
				<View style={{ width: "33%" }}>
					<Text style={[{ fontSize: "7px" }, pdfStyles.regular]}>
						QC: _______________
					</Text>
				</View>
				<View style={{ width: "33%", alignItems: "flex-end" }}>
					<Text style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}>
						Printed: {printDate}
					</Text>
				</View>
			</View>
		</Page>
	);
};
