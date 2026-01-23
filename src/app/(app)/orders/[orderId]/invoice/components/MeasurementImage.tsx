import { OrderItem } from "@/lib/types";
import { Image, Text, View } from "@react-pdf/renderer";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
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

	const t = useTranslations("measurements");

	console.log(neckInfo);
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
			<Text
				style={{
					position: "absolute",
					top: "49.7%",
					right: "2%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalThobeLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "27.5%",
					right: "7%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalSleeveLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "21.6%",
					right: "12.4%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalUpperSleeveWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "49.8%",
					right: "45.5%",
					fontSize: "9px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalThobeBackLength}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "9.9%",
					right: "61%",
					fontSize: "9px",
					textAlign: "center",
				}}
			>
				{orderItem?.generalShoulderWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "7.4%",
					right: "32.5%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalShoulderRotation}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "21.9%",
					right: "38.9%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalMiddleSleeveWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "38.4%",
					right: "11.6%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalWristWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "14.4%",
					right: "27.6%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalChestFront}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "14.4%",
					right: "61%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalChestBack}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "19.1%",
					right: "27.5%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalChestFull}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "92.9%",
					right: "24%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalBottomWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "87.2%",
					right: "38%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalCuffBottomWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "33.3%",
					right: "23.5%",
					fontSize: "9px",
				}}
			>
				{orderItem?.generalWaistWidth}
			</Text>
			<Text
				style={{
					position: "absolute",
					top: "52.6%",
					right: "23.5%",
					fontSize: "9px",
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
					top: "10%",
					right: "19.5%",
					fontSize: "9px",
				}}
			>
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
					{Object.entries(neckInfo).map(([key, value], index) => (
						<>
							{value && neckInfoMessages[`neck_${key}_${value}`]}
							{index !== Object.entries(neckInfo).length - 1 && value && " | "}
						</>
					))}
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
					{Object.entries(wristInfo).map(([key, value], index) => (
						<>
							{value && wristInfoMessages[`wrist_${key}_${value}`]}
							{index !== Object.entries(wristInfo).length - 1 && value && " | "}
						</>
					))}
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
					{Object.entries(chestPocketInfo).map(([key, value], index) => (
						<>
							{value && chestPocketMessages[`chestPocket_${key}_${value}`]}
							{index !== Object.entries(chestPocketInfo).length - 1 &&
								value &&
								" | "}
						</>
					))}
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
					{Object.entries(jabzoorInfo).map(([key, value], index) => (
						<>
							{value && jabzoorMessages[`jabzoor_${key}_${value}`]}
							{index !== Object.entries(jabzoorInfo).length - 1 &&
								value &&
								" | "}
						</>
					))}
				</Text>
			</View>
		</View>
	);
};
