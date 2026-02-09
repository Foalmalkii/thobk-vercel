import { Image, Text, View } from "@react-pdf/renderer";
import React, { useState } from "react";
import type { OrderItem } from "@/lib/types";
import { pdfStyles } from "../page";
import {
	chestPocketMessages,
	jabzoorMessages,
	neckInfoMessages,
	wristInfoMessages,
} from "./MeasurementMessages";

export const MeasurementImage = ({
	orderItem,
}: {
	orderItem: OrderItem | undefined;
}) => {
	console.log(orderItem);
	return (
		<View
			style={{
				width: "auto",
				position: "relative",
				height: "450px",
				border: "1px",
				borderColor: "#95a5a6",
				borderRadius: "4px",
			}}
		>
			<Image src={"/images/thobe.png"} />

			{/* NECK IMAGE */}
			{orderItem?.neckImg && (
				<Image
					src={`/images/measurements/NECK_${orderItem?.neckImg}.png`}
					style={{
						position: "absolute",
						width: "9.5%",
						right: "86.5%",
						top: "5%",
						transformOrigin: "translateX(50%)",
					}}
				/>
			)}

			{/* CHEST POCKET IMAGE */}
			{orderItem?.chestPocketImg && (
				<Image
					src={`/images/measurements/CHEST_POCKET_${orderItem?.chestPocketImg}.png`}
					style={{
						position: "absolute",
						width: "7%",
						right: "87.5%",
						top: "27%",
						transformOrigin: "translateX(50%)",
					}}
				/>
			)}

			{/* JABZOOR IMAGE */}
			{orderItem?.jabzoorImg && (
				<Image
					src={`/images/measurements/ZIPPER_${orderItem?.jabzoorImg}.png`}
					style={{
						position: "absolute",
						width: "9%",
						right: "86.5%",
						top: "46.6%",
						transformOrigin: "translateX(50%)",
					}}
				/>
			)}
			{orderItem?.jabzoorHoleType === "zip" && (
				<Image
					src={`/images/measurements/ZIPPER.png`}
					style={{
						position: "absolute",
						width: "4%",
						right: "93%",
						top: "50%",
						transformOrigin: "translateX(50%)",
					}}
				/>
			)}

			{orderItem?.jabzoorHoleType === "buttons" && (
				<Image
					src={`/images/measurements/BUTTON.png`}
					style={{
						position: "absolute",
						width: "4%",
						right: "93%",
						top: "50%",
						transformOrigin: "translateX(50%)",
					}}
				/>
			)}

			{/* WRIST IMAGE */}
			{orderItem?.wristImg && (
				<Image
					src={`/images/measurements/CUFF_${orderItem?.wristImg}.png`}
					style={{
						position: "absolute",
						width: "9.5%",
						right: "87.4%",
						top: "66%",
						transformOrigin: "translateX(50%)",
					}}
				/>
			)}

			{/* FRONT LENGTH */}
			<Text
				style={{
					position: "absolute",
					top: "49.6%",
					right: "14.5%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalThobeLength}
			</Text>

			{/* BACK LENGTH */}

			<Text
				style={{
					position: "absolute",
					top: "59%",
					right: "14.5%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalThobeBackLength}
			</Text>

			{/* SLEEVE LENGTH */}
			<Text
				style={{
					position: "absolute",
					top: "28.3%",
					right: "19.6%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalMiddleSleeveWidth}
			</Text>

			{/* UPPER SLEEVE WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "22.2%",
					right: "24.9%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalUpperSleeveWidth}
			</Text>

			{orderItem?.generalTakaleesLength && (
				<View
					style={{
						position: "absolute",
						top: "50%",
						right: "63.5%",
						transform: "translateX(50%) translateY(-50%) ",
						width: "24.5%",
						fontSize: "9px",
					}}
				>
					<Text style={[{ textAlign: "center" }, pdfStyles.light]}>
						Takalees Length {orderItem?.generalTakaleesLength}
					</Text>
				</View>
			)}
			{orderItem?.generalTakaleesWidth && (
				<View
					style={{
						position: "absolute",
						top: "53%",
						right: "63.5%",
						transform: "translateX(50%) translateY(-50%) ",
						width: "24.5%",
						fontSize: "9px",
					}}
				>
					<Text style={[{ textAlign: "center" }, pdfStyles.light]}>
						Takalees Width {orderItem?.generalTakaleesWidth}
					</Text>
				</View>
			)}

			<View
				style={{
					position: "absolute",
					top: "93%",
					right: "15.5%",
					transform: "translateX(50%) translateY(-50%) ",
					width: "24.5%",
					fontSize: "9px",
				}}
			>
				<Text style={[{ textAlign: "center" }, pdfStyles.light]}>
					Notes: {orderItem?.notes}
				</Text>
			</View>

			{/* SHOULDER WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "13.8%",
					right: "37.9%",
					fontSize: "9px",
					transform: "translateX(50%) translateY(-50%)",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalShoulderWidth}
			</Text>
			{/* SHOULDER LEFT */}
			<Text
				style={{
					position: "absolute",
					top: "18.6%",
					right: "30.9%",
					fontSize: "9px",
					transform: "translateX(50%) translateY(-50%)",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalShoulderLeft}
			</Text>
			{/* SHOULDER RIGHT */}
			<Text
				style={{
					position: "absolute",
					top: "17.4%",
					right: "58.9%",
					fontSize: "9px",
					transform: "translateX(50%) translateY(-50%)",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalShoulderRight}
			</Text>

			{/* MIDDLE SLEEVE WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "23.7%",
					right: "59.5%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalSleeveLength}
			</Text>

			{/* WRIST WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "38.4%",
					right: "24.3%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalWristWidth}
			</Text>

			{/* CHEST FRONT */}
			<Text
				style={{
					position: "absolute",
					top: "20%",
					right: "40.2%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalChestFront}
			</Text>

			{/* CHEST FULL */}
			<Text
				style={{
					position: "absolute",
					top: "13%",
					right: "41.1%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalChestFull}
			</Text>

			{/* BOTTOM WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "92.2%",
					right: "36.6%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalBottomWidth}
			</Text>

			{/* CUFF BOTTOM WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "86.6%",
					right: "50.7%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalCuffBottomWidth}
			</Text>

			{/* WAIST WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "44.8%",
					right: "44.8%",
					fontSize: "9px",
					transform: "translateX(50%) translateY(-50%)",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalWaistWidth}
			</Text>

			{/* HIP WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "63.7%",
					right: "44.8%",
					fontSize: "9px",
					transform: "translateX(50%) translateY(-50%)",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalHipWidth}
			</Text>

			{/* ========== NECK SECTION (TOP) ========== */}
			<Text
				style={{
					position: "absolute",
					top: "10.6%",
					right: "74.3%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.neckLength}
			</Text>

			<Text
				style={{
					position: "absolute",
					top: "2.7%",
					right: "81.8%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.neckWidth}
			</Text>

			<View
				style={{
					position: "absolute",
					top: "10.5%",
					right: "74.7%",
					transform: "translateX(50%) translateY(-50%) ",
					width: "24.5%",
					fontSize: "9px",
				}}
			>
				<Text style={[{ textAlign: "center" }, pdfStyles.light]}>
					{orderItem?.neckFill && "Collar Hashwa"} {orderItem?.neckFill}
				</Text>
			</View>

			<View
				style={{
					position: "absolute",
					top: "13%",
					right: "76%",
					transform: "translateX(50%) translateY(-50%) ",
					width: "24.5%",
					fontSize: "9px",
				}}
			>
				<Text style={[{ textAlign: "center" }, pdfStyles.light]}>
					{orderItem?.neckBackLength && "Neck Back"} {orderItem?.neckBackLength}
				</Text>
			</View>

			<View
				style={{
					position: "absolute",
					top: "15.5%",
					right: "76%",
					transform: "translateX(50%) translateY(-50%) ",
					width: "24.5%",
					fontSize: "9px",
				}}
			>
				<Text style={[{ textAlign: "center" }, pdfStyles.light]}>
					{orderItem?.neckOpen && "Neck Open"} {orderItem?.neckOpen}
				</Text>
			</View>

			<View
				style={{
					position: "absolute",
					top: "28%",
					right: "84.7%",
					transform: "translateX(50%) translateY(-50%) ",
					width: "24.5%",
					fontSize: "9px",
				}}
			>
				<Text style={[{ textAlign: "center" }, pdfStyles.light]}>
					{orderItem?.neckNotes}
				</Text>
			</View>

			{/* ========== CHEST POCKET SECTION ========== */}
			<Text
				style={{
					position: "absolute",
					top: "31%",
					right: "75.3%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.chestPocketLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "23%",
					right: "82.4%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.chestPocketWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "27.5%",
					right: "74.5%",
					fontSize: "9px",
					direction: "ltr",
				}}
			>
				{orderItem?.betweenChestPocketShoulder && "Pocket Down"}{" "}
				{orderItem?.betweenChestPocketShoulder}
			</Text>

			<View
				style={{
					position: "absolute",
					top: "47.5%",
					right: "84.7%",
					transform: "translateX(50%) translateY(-50%) ",
					width: "24.5%",
					fontSize: "9px",
				}}
			>
				<Text style={[{ textAlign: "center" }, pdfStyles.light]}>
					{orderItem?.chestPocketNotes}
				</Text>
			</View>

			{/* ========== JABZOOR SECTION ========== */}
			<Text
				style={{
					position: "absolute",
					top: "51%",
					right: "77.1%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.jabzoorLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "43.2%",
					right: "82.5%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.jabzoorWidth}
			</Text>

			<View
				style={{
					position: "absolute",
					top: "69.2%",
					right: "84.7%",
					transform: "translateX(50%) translateY(-50%) ",
					width: "24.5%",
					fontSize: "9px",
				}}
			>
				<Text style={[{ textAlign: "center" }, pdfStyles.light]}>
					{orderItem?.jabzoorNotes}
				</Text>
			</View>

			{/* ========== WRIST SECTION (BOTTOM) ========== */}
			<Text
				style={{
					position: "absolute",
					top: "65%",
					right: "77.2%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.wristCuffLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "73.5%",
					right: "76.2%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.wristCuffWidth}
			</Text>

			<View
				style={{
					position: "absolute",
					top: "88%",
					right: "84.7%",
					transform: "translateX(50%) translateY(-50%) ",
					width: "24.5%",
					fontSize: "9px",
				}}
			>
				<Text style={[{ textAlign: "center" }, pdfStyles.light]}>
					{orderItem?.wristNotes}
				</Text>
			</View>

			{/* ========== SIDE POCKETS ========== */}
			<Text
				style={{
					position: "absolute",
					top: "89%",
					right: "67.4%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.sidePhonePocketLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "84%",
					right: "72.5%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.sidePhonePocketWidth}
			</Text>

			<Text
				style={{
					position: "absolute",
					top: "89%",
					right: "80%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.sideWalletPocketLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "84%",
					right: "85%",
					fontSize: "9px",
					width: "100px",
					textAlign: "center",
				}}
			>
				{orderItem?.sideWalletPocketWidth}
			</Text>
		</View>
	);
};
