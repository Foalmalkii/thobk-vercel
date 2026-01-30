"use client";
import { Page, Text, View } from "@react-pdf/renderer";
import React from "react";
import type { GetBranch, GetOrder, OrderItem } from "@/lib/types";
import { pdfStyles } from "../page";
import { MeasurementImage } from "./MeasurementImage";

export const MeasurementPage = ({
	order,
	item,
	branch,
}: {
	order: GetOrder;
	item: OrderItem;
	branch: GetBranch;
}) => {
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
					<Text style={{ fontSize: "14px", fontWeight: "bold" }}>
						TAILOR ORDER SHEET
					</Text>
					<Text style={{ fontSize: "7px", marginTop: "2px", color: "#666" }}>
						{branch?.name}
					</Text>
				</View>
				<View style={{ width: "50%", alignItems: "flex-end" }}>
					<Text style={{ fontSize: "12px", fontWeight: "bold" }}>
						Order #{order?.id}
					</Text>
					<Text style={{ fontSize: "7px", marginTop: "1px" }}>
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
							style={{
								fontSize: "9px",
								fontWeight: "bold",
								marginBottom: "4px",
								backgroundColor: "#f0f0f0",
								padding: "3px",
							}}
						>
							ORDER INFO
						</Text>
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
								<Text style={{ fontSize: "6px", color: "#666" }}>Order #</Text>
								<Text style={{ fontSize: "8px" }}>#{order.id}</Text>
							</View>
							<View
								style={{
									width: "48%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text style={{ fontSize: "6px", color: "#666" }}>Date</Text>
								<Text style={{ fontSize: "8px" }}>
									{order.createdAt.slice(0, 10)}
								</Text>
							</View>
						</View>
					</View>

					{/* Customer Info */}
					<View style={{ marginBottom: "6px" }}>
						<Text
							style={{
								fontSize: "9px",
								fontWeight: "bold",
								marginBottom: "4px",
								backgroundColor: "#f0f0f0",
								padding: "3px",
							}}
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
								<Text style={{ fontSize: "6px", color: "#666" }}>Name</Text>
								<Text style={{ fontSize: "8px" }}>{order.customer.name}</Text>
							</View>
							<View
								style={{
									width: "48%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text style={{ fontSize: "6px", color: "#666" }}>ID</Text>
								<Text style={{ fontSize: "8px" }}>#{order.customer.id}</Text>
							</View>
							<View
								style={{
									width: "48%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text style={{ fontSize: "6px", color: "#666" }}>Phone</Text>
								<Text style={{ fontSize: "8px" }}>{order.customer.phone}</Text>
							</View>
						</View>
					</View>
				</View>

				{/* Right Column */}
				<View style={{ width: "50%" }}>
					{/* Item Details */}
					<View style={{ marginBottom: "6px" }}>
						<Text
							style={{
								fontSize: "9px",
								fontWeight: "bold",
								marginBottom: "4px",
								backgroundColor: "#f0f0f0",
								padding: "3px",
							}}
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
								<Text style={{ fontSize: "6px", color: "#666" }}>
									Thobe Type
								</Text>
								<Text style={{ fontSize: "9px", fontWeight: "bold" }}>
									{item?.thobeType || "N/A"}
								</Text>
							</View>
							<View
								style={{
									width: "48%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text style={{ fontSize: "6px", color: "#666" }}>Fabric</Text>
								<Text style={{ fontSize: "8px" }}>
									{item?.fabricType || "N/A"}
								</Text>
							</View>
							<View
								style={{
									width: "48%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text style={{ fontSize: "6px", color: "#666" }}>Color</Text>
								<Text style={{ fontSize: "8px" }}>
									{item?.fabricColor || "White"}
								</Text>
							</View>
							<View
								style={{
									width: "31%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text style={{ fontSize: "6px", color: "#666" }}>Qty</Text>
								<Text style={{ fontSize: "8px", fontWeight: "bold" }}>
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
								<Text style={{ fontSize: "6px", color: "#666" }}>Price</Text>
								<Text style={{ fontSize: "8px" }}>{item?.price || 0}</Text>
							</View>
							<View
								style={{
									width: "31%",
									padding: "4px",
									border: "1px solid #e0e0e0",
								}}
							>
								<Text style={{ fontSize: "6px", color: "#666" }}>Total</Text>
								<Text style={{ fontSize: "8px", fontWeight: "bold" }}>
									{(item?.price || 0) * (item?.quantity || 1)}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>

			{/* Measurements Section - Most space */}
			<View style={{ flex: 1 }}>
				<Text
					style={{
						fontSize: "9px",
						fontWeight: "bold",
						marginBottom: "4px",
						backgroundColor: "#f0f0f0",
						padding: "3px",
					}}
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
				<View style={{ width: "48%" }}>
					<Text style={{ fontSize: "7px" }}>Tailor: _______________</Text>
				</View>
				<View style={{ width: "48%" }}>
					<Text style={{ fontSize: "7px" }}>QC: _______________</Text>
				</View>
			</View>
		</Page>
	);
};
