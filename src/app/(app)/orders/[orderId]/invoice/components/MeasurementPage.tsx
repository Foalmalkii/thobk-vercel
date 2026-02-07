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
									style={[{ fontSize: "6px", color: "#666" }, pdfStyles.light]}
								>
									Order #
								</Text>
								<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>
									#{order.id}
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
									Date
								</Text>
								<Text style={[{ fontSize: "8px" }, pdfStyles.medium]}>
									{order.createdAt.slice(0, 10)}
								</Text>
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
				<View style={{ width: "48%" }}>
					<Text style={[{ fontSize: "7px" }, pdfStyles.regular]}>
						Tailor: _______________
					</Text>
				</View>
				<View style={{ width: "48%" }}>
					<Text style={[{ fontSize: "7px" }, pdfStyles.regular]}>
						QC: _______________
					</Text>
				</View>
			</View>
		</Page>
	);
};
