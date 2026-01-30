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
	const neckInfo = {
		neckDesign: orderItem?.neckDesign,
		neckShape: orderItem?.neckShape,
		neckFill: orderItem?.neckFill,
		neckButtonType: orderItem?.neckButtonType,
		neckButtonMaterial: orderItem?.neckButtonMaterial,
		neckButtonVisibility: orderItem?.neckButtonVisibility,
	};

	const wristInfo = {
		wristCuffType: orderItem?.wristCuffType,
		wristDesign: orderItem?.wristDesign,
		wristMaterialLayers: orderItem?.wristMaterialLayers,
		wristSleeveCrumbNumber: orderItem?.wristSleeveCrumbNumber,
	};

	const chestPocketInfo = {
		chestPocketPenType: orderItem?.chestPocketPenType,
		chestPocketDesign: orderItem?.chestPocketDesign,
		chestPocketShape: orderItem?.chestPocketShape,
		chestPocketVisibility: orderItem?.chestPocketVisibility,
	};

	const jabzoorInfo = {
		jabzoorHoleType: orderItem?.jabzoorHoleType,
		jabzoorDesign: orderItem?.jabzoorDesign,
		jabzoorVisibility: orderItem?.jabzoorVisibility,
		jabzoorShape: orderItem?.jabzoorShape,
		jabzoorPushMaterial: orderItem?.jabzoorPushMaterial,
	};

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

			<Image
				src={`/images/measurements/CUFF_${orderItem?.wristImg}.png`}
				style={{
					position: "absolute",
					width: "9.5%",
					right: "87.4%",
					top: "24%",
					transformOrigin: "translateX(50%)",
				}}
			/>

			<Image
				src={`/images/measurements/CHEST_POCKET_${orderItem?.chestPocketImg}.png`}
				style={{
					position: "absolute",
					width: "7%",
					right: "87.5%",
					top: "46.5%",
					transformOrigin: "translateX(50%)",
				}}
			/>

			<Image
				src={`/images/measurements/ZIPPER_${orderItem?.jabzoorImg}.png`}
				style={{
					position: "absolute",
					width: "10%",
					right: "86%",
					top: "66.5%",
					transformOrigin: "translateX(50%)",
				}}
			/>

			{/* FRONT LENGTH */}
			<Text
				style={{
					position: "absolute",
					top: "50.4%", // 51.3% + 2.2%
					right: "22.8%", // 3.7% - 17.4%
					fontSize: "9px",
				}}
			>
				{orderItem?.generalThobeLength}
			</Text>

			{/* SLEEVE LENGTH */}
			<Text
				style={{
					position: "absolute",
					top: "28.6%", // 29% + 2.2%
					right: "27.8%", // 8.9% - 17.4%
					fontSize: "9px",
				}}
			>
				{orderItem?.generalSleeveLength}
			</Text>

			{/* UPPER SLEEVE WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "22.6%", // 23% + 2.2%
					right: "33.2%", // 14.3% - 17.4%
					fontSize: "9px",
				}}
			>
				{orderItem?.generalUpperSleeveWidth}
			</Text>

			{/* BACK LENGTH */}
			<Text
				style={{
					position: "absolute",
					top: "50.4%", // 51.3% + 2.2%
					right: "66.5%", // 47.3% - 17.4%
					fontSize: "9px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalThobeBackLength}
			</Text>

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
					top: "14%", // 11.3% + 2.2%
					right: "46%", // 62.9% - 17.4%
					fontSize: "9px",
					transform: "translateX(50%) translateY(-50%)",
				}}
			>
				{orderItem?.generalShoulderWidth}
			</Text>
			{/* SHOULDER WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "18.6%", // 11.3% + 2.2%
					right: "39.2%", // 62.9% - 17.4%
					fontSize: "9px",
					transform: "translateX(50%) translateY(-50%)",
				}}
			>
				{orderItem?.generalShoulderLeft}
			</Text>
			{/* SHOULDER WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "17.4%", // 11.3% + 2.2%
					right: "67.2%", // 62.9% - 17.4%
					fontSize: "9px",
					transform: "translateX(50%) translateY(-50%)",
				}}
			>
				{orderItem?.generalShoulderRight}
			</Text>

			{/* MIDDLE SLEEVE WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "22.6%", // 23.3% + 2.2%
					right: "60%", // 40.8% - 17.4%
					fontSize: "9px",
				}}
			>
				{orderItem?.generalMiddleSleeveWidth}
			</Text>

			{/* WRIST WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "39.2%", // 39.8% + 2.2%
					right: "32.6%", // 13.5% - 17.4%
					fontSize: "9px",
				}}
			>
				{orderItem?.generalWristWidth}
			</Text>

			{/* CHEST FRONT */}
			<Text
				style={{
					position: "absolute",
					top: "20%", // 15.8% + 2.2%
					right: "48.5%", // 29.5% - 17.4%
					fontSize: "9px",
				}}
			>
				{orderItem?.generalChestFront}
			</Text>

			{/* CHEST FULL */}
			<Text
				style={{
					position: "absolute",
					top: "13%", // 20.5% + 2.2%
					right: "49.4%", // 29.4% - 17.4%
					fontSize: "9px",
				}}
			>
				{orderItem?.generalChestFull}
			</Text>

			{/* BOTTOM WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "94%", // 95% + 2.2%
					right: "44.6%", // 26% - 17.4%
					fontSize: "9px",
				}}
			>
				{orderItem?.generalBottomWidth}
			</Text>

			{/* CUFF BOTTOM WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "87.7%", // 89% + 2.2%
					right: "59%", // 39.9% - 17.4%
					fontSize: "9px",
				}}
			>
				{orderItem?.generalCuffBottomWidth}
			</Text>

			{/* WAIST WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "45.4%", // 35% + 2.2%
					right: "53%", // 25.4% - 17.4%
					fontSize: "9px",
					transform: "translateX(50%) translateY(-50%)",
				}}
			>
				{orderItem?.generalWaistWidth}
			</Text>

			{/* HIP WIDTH */}
			<Text
				style={{
					position: "absolute",
					top: "64.5%", // 54.3% + 2.2%
					right: "53%", // 25.4% - 17.4%
					fontSize: "9px",
					transform: "translateX(50%) translateY(-50%)",
					textAlign: "center",
				}}
			>
				{orderItem?.generalHipWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "10.6%",
					right: "81.6%",
					fontSize: "9px",
				}}
			>
				{orderItem?.neckLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "2.8%",
					right: "64.4%",
					fontSize: "9px",
				}}
			>
				{orderItem?.neckBackLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "2.7%",
					right: "89.5%",
					fontSize: "9px",
				}}
			>
				{orderItem?.neckWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "23.5%",
					right: "84.2%",
					fontSize: "9px",
				}}
			>
				{orderItem?.wristCuffLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "32.4%",
					right: "83.3%",
					fontSize: "9px",
				}}
			>
				{orderItem?.wristCuffWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "51.1%",
					right: "82.3%",
					fontSize: "9px",
				}}
			>
				{orderItem?.chestPocketLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "42.8%",
					right: "89.5%",
					fontSize: "9px",
				}}
			>
				{orderItem?.chestPocketWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "44.5%",
					right: "74.5%",
					fontSize: "9px",
				}}
			>
				{orderItem?.betweenChestPocketShoulder && "Pocket Down"}{" "}
				{orderItem?.betweenChestPocketShoulder}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "71.3%",
					right: "84.2%",
					fontSize: "9px",
				}}
			>
				{orderItem?.jabzoorLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "63.3%",
					right: "89.6%",
					fontSize: "9px",
				}}
			>
				{orderItem?.jabzoorWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "90.5%",
					right: "74.2%",
					fontSize: "9px",
				}}
			>
				{orderItem?.sidePhonePocketLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "85.4%",
					right: "79.8%",
					fontSize: "9px",
				}}
			>
				{orderItem?.sidePhonePocketWidth}
			</Text>

			<Text
				style={{
					position: "absolute",
					top: "90.5%",
					right: "86.8%",
					fontSize: "9px",
				}}
			>
				{orderItem?.sideWalletPocketLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "85.4%",
					right: "92%",
					fontSize: "9px",
				}}
			>
				{orderItem?.sidePhonePocketWidth}
			</Text>

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

			<View
				style={{
					position: "absolute",
					top: "14%",
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
					top: "16.5%",
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
					top: "47%",
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

			<View
				style={{
					position: "absolute",
					top: "67.4%",
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

			<View
				style={{
					position: "absolute",
					top: "89.5%",
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
		</View>
	);
};
