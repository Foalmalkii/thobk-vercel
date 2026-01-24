"use client";
import { GetBranch, GetOrder, Order, OrderItem } from "@/lib/types";
import { Page, pdf, Text, View } from "@react-pdf/renderer";
import React from "react";
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
		<Page style={{ padding: "10px" }}>
			<View
				style={[
					{
						flexDirection: "row",
						justifyContent: "space-between",
						gap: "4px",
						borderBottom: "1px",
						padding: "12px",
					},
					pdfStyles.regular,
				]}
			>
				<View style={{ flexDirection: "column", gap: "4px", fontSize: "8px" }}>
					<View style={{ flexDirection: "row", gap: "4px" }}>
						<Text>Customer: {order?.customer.name}</Text>
						<Text>Fabric: {item?.fabricType}</Text>
					</View>

					<View style={{ flexDirection: "row", gap: "4px" }}>
						<Text>Customer Phone: {order?.customer.phone}</Text>
					</View>
				</View>

				<View style={pdfStyles.bold}>
					<Text>Order Details</Text>
				</View>

				<View style={[pdfStyles.light, { fontSize: "8px" }]}>
					<Text>Order No.: #{order?.id}</Text>
					<Text>Branch: {branch?.name}</Text>
				</View>
			</View>
			<View
				style={[
					{
						marginTop: "20px",
						flexDirection: "row",
						fontSize: "12px",
						gap: "50px",
						paddingHorizontal: "40px",
						alignItems: "center",
					},
					pdfStyles.regular,
				]}
			>
				<View style={[{ textAlign: "left" }, pdfStyles.cell]}>
					<Text style={pdfStyles.bold}>Order No.</Text>
					<Text style={{ fontSize: "10px" }}>#{order.id}</Text>
				</View>
				<View style={[{ textAlign: "left" }, pdfStyles.cell]}>
					<Text style={pdfStyles.bold}>Ordered At</Text>
					<Text style={{ fontSize: "10px" }}>
						{order.createdAt.slice(0, 10)}
					</Text>
				</View>
				<View style={[{ textAlign: "left" }, pdfStyles.cell]}>
					<Text style={pdfStyles.bold}>Branch</Text>
					<Text style={{ fontSize: "10px" }}>#{order.id}</Text>
				</View>
				<View style={[{ textAlign: "left" }, pdfStyles.cell]}>
					<Text style={pdfStyles.bold}>Order Due</Text>
					<Text style={{ fontSize: "10px" }}>{order.dueDate}</Text>
				</View>
			</View>
			<View
				style={[
					{
						marginTop: "20px",
						flexDirection: "row",
						fontSize: "12px",
						gap: "50px",
						paddingHorizontal: "40px",
						alignItems: "center",
					},
					pdfStyles.regular,
				]}
			>
				<View style={[{ textAlign: "left" }, pdfStyles.cell]}>
					<Text style={[pdfStyles.bold]}>Customer ID.</Text>
					<Text style={{ fontSize: "10px" }}>#{order.customer.id}</Text>
				</View>
				<View style={[{ textAlign: "left" }, pdfStyles.cell]}>
					<Text style={pdfStyles.bold}>Customer</Text>
					<Text style={{ fontSize: "10px" }}>{order.customer.name}</Text>
				</View>
				<View style={[{ textAlign: "left" }, pdfStyles.cell]}>
					<Text style={pdfStyles.bold}>Customer Phone</Text>
					<Text style={{ fontSize: "10px" }}>{order.customer.phone}</Text>
				</View>
			</View>
			<View
				style={[
					{
						marginTop: "20px",
						flexDirection: "row",
						fontSize: "12px",
						gap: "50px",
						paddingHorizontal: "40px",
						alignItems: "center",
					},
					pdfStyles.regular,
				]}
			>
				<View style={[{ textAlign: "left" }, pdfStyles.cell]}>
					<Text style={[pdfStyles.bold]}>Fabric ID.</Text>
					<Text style={{ fontSize: "10px" }}>#SFH002211</Text>
				</View>
				<View style={[{ textAlign: "left" }, pdfStyles.cell]}>
					<Text style={pdfStyles.bold}>Fabric Name</Text>
					<Text style={{ fontSize: "10px" }}>Samiramis</Text>
				</View>
				<View style={[{ textAlign: "left" }, pdfStyles.cell]}>
					<Text style={pdfStyles.bold}>Fabric Color</Text>
					<Text style={{ fontSize: "10px" }}>White</Text>
				</View>
			</View>

			<MeasurementImage orderItem={item} />
		</Page>
	);
};
