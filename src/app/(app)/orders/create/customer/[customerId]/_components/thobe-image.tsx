import React from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { useAtom } from "jotai";
import {
	chestPocketInfoAtom,
	jabzoorInfoAtom,
	neckInfoAtom,
	wristInfoAtom,
} from "@/lib/atoms";
import { useTranslations } from "next-intl";

export const ThobeImage = ({ orderItemIndex }: { orderItemIndex: number }) => {
	const { watch } = useFormContext();
	const [neckInfo] = useAtom(neckInfoAtom);
	const [wristInfo] = useAtom(wristInfoAtom);
	const [chestPocketInfo] = useAtom(chestPocketInfoAtom);
	const [jabzoorInfo] = useAtom(jabzoorInfoAtom);
	const t = useTranslations("measurements");

	// Helper to watch values from the specific order item
	const watchItem = (path: string) => watch(`items.${orderItemIndex}.${path}`);

	/**
	 * Hide fields when default or empty.
	 * Returns null if value is 0, undefined, null, or empty string.
	 */
	const renderValue = (value: any) => {
		if (
			value === 0 ||
			value === undefined ||
			value === null ||
			value === "" ||
			Number.isNaN(value)
		) {
			return null;
		}
		return value;
	};

	return (
		<div className="inline-block relative top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 w-full">
			{/* FRONT LENGTH */}
			{renderValue(watchItem("general.generalThobeLength")) && (
				<div className="absolute top-[50.5%] w-auto -translate-y-1/2 right-[21.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalThobeLength")}
				</div>
			)}

			{renderValue(watchItem("neckImg")) && (
				<div className="absolute top-[11.5%]  -translate-y-1/2 right-[91.7%] font-bold translate-x-1/2 w-[10%]">
					<img
						src={`/images/measurements/NECK_${watchItem("neckImg")}.png`}
						className="w-full"
					/>
				</div>
			)}

			{renderValue(watchItem("chestPocketImg")) && (
				<div className="absolute top-[52.3%] -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 w-[7%] opacity-80">
					<img
						src={`/images/measurements/CHEST_POCKET_${watchItem("chestPocketImg")}.png`}
						className="w-full"
					/>
				</div>
			)}

			{renderValue(watchItem("jabzoorImg")) && (
				<div className="absolute top-[73.5%]  -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 w-[10%] opacity-80">
					<img
						src={`/images/measurements/ZIPPER_${watchItem("jabzoorImg")}.png`}
						className="w-full"
					/>
				</div>
			)}

			{renderValue(watchItem("wristImg")) && (
				<div className="absolute top-[31%] -translate-y-1/2 right-[92%] font-bold translate-x-1/2 w-[10.5%]">
					<img
						src={`/images/measurements/CUFF_${watchItem("wristImg")}.png`}
						className="w-full"
					/>
				</div>
			)}
			{/* SLEEVE LENGTH */}
			{renderValue(watchItem("general.generalSleeveLength")) && (
				<div className="absolute top-[28.4%] w-auto -translate-y-1/2 right-[26.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalSleeveLength")}
				</div>
			)}

			{/* UPPER SLEEVE WIDTH */}
			{renderValue(watchItem("general.generalUpperSleeveWidth")) && (
				<div className="absolute top-[22.4%] w-auto -translate-y-1/2 right-[31.8%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalUpperSleeveWidth")}
				</div>
			)}

			{/* BACK LENGTH done */}
			{renderValue(watchItem("general.generalThobeBackLength")) && (
				<div className="absolute top-[50.8%] w-auto -translate-y-1/2 right-[64.8%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalThobeBackLength")}
				</div>
			)}

			{/* SHOULDER WIDTH */}
			{renderValue(watchItem("general.generalShoulderWidth")) && (
				<div className="absolute top-[3.8%] w-auto -translate-y-1/2 right-[37.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalShoulderWidth")}
				</div>
			)}
			{renderValue(watchItem("general.generalShoulderLeft")) && (
				<div className="absolute top-[7.3%] w-auto -translate-y-1/2 right-[28.9%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalShoulderLeft")}
				</div>
			)}
			{renderValue(watchItem("general.generalShoulderRight")) && (
				<div className="absolute top-[6%] w-auto -translate-y-1/2 right-[56.8%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalShoulderRight")}
				</div>
			)}

			{/* SHOULDER ROTATION */}
			{renderValue(watchItem("general.generalShoulderRotation")) && (
				<div className="absolute top-[8.8%] w-auto -translate-y-1/2 right-[34.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalShoulderRotation")}
				</div>
			)}

			{/* MIDDLE SLEEVE WIDTH */}
			{renderValue(watchItem("general.generalMiddleSleeveWidth")) && (
				<div className="absolute top-[22.8%] w-auto -translate-y-1/2 right-[58.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalMiddleSleeveWidth")}
				</div>
			)}

			{/* WRIST WIDTH */}
			{renderValue(watchItem("general.generalWristWidth")) && (
				<div className="absolute top-[39.2%] w-auto -translate-y-1/2 right-[31%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalWristWidth")}
				</div>
			)}

			{/* CHEST FRONT */}
			{renderValue(watchItem("general.generalChestFront")) && (
				<div className="absolute top-[19.8%] w-auto -translate-y-1/2 right-[46.9%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalChestFront")}
				</div>
			)}

			{/* CHEST BACK */}
			{renderValue(watchItem("general.generalChestBack")) && (
				<div className="absolute top-[15.8%] w-auto -translate-y-1/2 right-[62.9%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalChestBack")}
				</div>
			)}

			{/* CHEST FULL */}
			{renderValue(watchItem("general.generalChestFull")) && (
				<div className="absolute top-[13%] w-auto -translate-y-1/2 right-[48%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalChestFull")}
				</div>
			)}

			{/* BOTTOM WIDTH */}
			{renderValue(watchItem("general.generalBottomWidth")) && (
				<div className="absolute top-[94.4%] w-auto -translate-y-1/2 right-[43.6%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalBottomWidth")}
				</div>
			)}

			{/* CUFF BOTTOM WIDTH */}
			{renderValue(watchItem("general.generalCuffBottomWidth")) && (
				<div className="absolute top-[88.5%] w-auto -translate-y-1/2 right-[57.5%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalCuffBottomWidth")}
				</div>
			)}

			{/* WAIST WIDTH */}
			{renderValue(watchItem("general.generalWaistWidth")) && (
				<div className="absolute top-[34.2%] w-auto -translate-y-1/2 right-[43%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalWaistWidth")}
				</div>
			)}

			{/* HIP WIDTH */}
			{renderValue(watchItem("general.generalHipWidth")) && (
				<div className="absolute top-[53.6%] w-auto -translate-y-1/2 right-[43%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("general.generalHipWidth")}
				</div>
			)}

			{/* NECK LENGTH */}
			{renderValue(watchItem("neck.neckLength")) && (
				<div className="absolute top-[12%] w-auto -translate-y-1/2 right-[83.5%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("neck.neckLength")}
				</div>
			)}

			{/* NECK BACK LENGTH */}
			{renderValue(watchItem("neck.neckBackLength")) && (
				<div className="absolute top-[7.2%] w-auto -translate-y-1/2 right-[80.3%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					Back Neck {watchItem("neck.neckBackLength")}
				</div>
			)}

			{/* NECK WIDTH */}
			{renderValue(watchItem("neck.neckWidth")) && (
				<div className="absolute top-[4.1%] w-auto -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("neck.neckWidth")}
				</div>
			)}

			{/* CUFF LENGTH */}
			{renderValue(watchItem("wrist.wristCuffLength")) && (
				<div className="absolute top-[24.9%] w-auto -translate-y-1/2 right-[86.1%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("wrist.wristCuffLength")}
				</div>
			)}

			{/* CUFF WIDTH */}
			{renderValue(watchItem("wrist.wristCuffWidth")) && (
				<div className="absolute top-[33.8%] w-auto -translate-y-1/2 right-[85.2%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("wrist.wristCuffWidth")}
				</div>
			)}

			{/* CHEST POCKET LENGTH */}
			{renderValue(watchItem("chestPocket.chestPocketLength")) && (
				<div className="absolute top-[52.5%] w-auto -translate-y-1/2 right-[84.2%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("chestPocket.chestPocketLength")}
				</div>
			)}

			{/* CHEST POCKET WIDTH */}
			{renderValue(watchItem("chestPocket.chestPocketWidth")) && (
				<div className="absolute top-[44.2%] w-auto -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("chestPocket.chestPocketWidth")}
				</div>
			)}

			{/* BETWEEN CHEST POCKET SHOULDER */}
			{renderValue(watchItem("chestPocket.betweenChestPocketShoulder")) && (
				<div className="absolute top-[47.6%] w-auto -translate-y-1/2 right-[78.9%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					Pocket down {watchItem("chestPocket.betweenChestPocketShoulder")}
				</div>
			)}

			{/* JABZOOR LENGTH */}
			{renderValue(watchItem("jabzoor.jabzoorLength")) && (
				<div className="absolute top-[73%] w-auto -translate-y-1/2 right-[86.1%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("jabzoor.jabzoorLength")}
				</div>
			)}

			{/* JABZOOR WIDTH */}
			{renderValue(watchItem("jabzoor.jabzoorWidth")) && (
				<div className="absolute top-[65%] w-auto -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("jabzoor.jabzoorWidth")}
				</div>
			)}

			{/* PHONE POCKET LENGTH */}
			{renderValue(watchItem("sidePockets.sidePhonePocketLength")) && (
				<div className="absolute top-[92.4%] w-auto -translate-y-1/2 right-[76.3%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("sidePockets.sidePhonePocketLength")}
				</div>
			)}

			{/* PHONE POCKET WIDTH */}
			{renderValue(watchItem("sidePockets.sidePhonePocketWidth")) && (
				<div className="absolute top-[87.4%] w-auto -translate-y-1/2 right-[81.6%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("sidePockets.sidePhonePocketWidth")}
				</div>
			)}

			{/* WALLET POCKET LENGTH */}
			{renderValue(watchItem("sidePockets.sideWalletPocketLength")) && (
				<div className="absolute top-[65%] w-auto -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("sidePockets.sideWalletPocketLength")}
				</div>
			)}

			{/* WALLET POCKET WIDTH */}
			{renderValue(watchItem("sidePockets.sideWalletPocketWidth")) && (
				<div className="absolute top-[65%] w-auto -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watchItem("sidePockets.sideWalletPocketWidth")}
				</div>
			)}

			{/* IMAGE */}
			<Image
				alt="thobe"
				width={987.18}
				height={1278.5}
				src="/images/thobe.svg"
				className="w-full"
			/>
		</div>
	);
};
