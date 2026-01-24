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

export const EditThobeImage = ({
	orderItemIndexNumber,
}: {
	orderItemIndexNumber: number;
}) => {
	const { watch } = useFormContext();
	const neckInfo = {
		neckDesign: watch(
			`items.${orderItemIndexNumber}.measurement.neck.neckDesign`,
		),
		neckShape: watch(
			`items.${orderItemIndexNumber}.measurement.neck.neckShape`,
		),
		neckFill: watch(`items.${orderItemIndexNumber}.measurement.neck.neckFill`),
		neckButtonType: watch(
			`items.${orderItemIndexNumber}.measurement.neck.neckButtonType`,
		),
		neckButtonMaterial: watch(
			`items.${orderItemIndexNumber}.measurement.neck.neckButtonMaterial`,
		),
		neckButtonVisibility: watch(
			`items.${orderItemIndexNumber}.measurement.neck.neckButtonVisibility`,
		),
	};

	const wristInfo = {
		wristCuffType: watch(
			`items.${orderItemIndexNumber}.measurement.wrist.wristCuffType`,
		),
		wristDesign: watch(
			`items.${orderItemIndexNumber}.measurement.wrist.wristDesign`,
		),
		wristMaterialLayers: watch(
			`items.${orderItemIndexNumber}.measurement.wrist.wristMaterialLayers`,
		),
		wristSleeveCrumbNumber: watch(
			`items.${orderItemIndexNumber}.measurement.wrist.wristSleeveCrumbNumber`,
		),
	};

	const chestPocketInfo = {
		chestPocketPenType: watch(
			`items.${orderItemIndexNumber}.measurement.chestPocket.chestPocketPenType`,
		),
		chestPocketDesign: watch(
			`items.${orderItemIndexNumber}.measurement.chestPocket.chestPocketDesign`,
		),
		chestPocketShape: watch(
			`items.${orderItemIndexNumber}.measurement.chestPocket.chestPocketShape`,
		),
		chestPocketVisibility: watch(
			`items.${orderItemIndexNumber}.measurement.chestPocket.chestPocketVisibility`,
		),
	};

	const jabzoorInfo = {
		jabzoorHoleType: watch(
			`items.${orderItemIndexNumber}.measurement.jabzoor.jabzoorHoleType`,
		),
		jabzoorDesign: watch(
			`items.${orderItemIndexNumber}.measurement.jabzoor.jabzoorDesign`,
		),
		jabzoorVisibility: watch(
			`items.${orderItemIndexNumber}.measurement.jabzoor.jabzoorVisibility`,
		),
		jabzoorShape: watch(
			`items.${orderItemIndexNumber}.measurement.jabzoor.jabzoorShape`,
		),
		jabzoorPushMaterial: watch(
			`items.${orderItemIndexNumber}.measurement.jabzoor.jabzoorPushMaterial`,
		),
	};

	console.log(neckInfo);

	const t = useTranslations("measurements");

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
			Number.isNaN(value) // 🔥 hide NaN!
		) {
			return null;
		}
		return value;
	};

	return (
		<div className="inline-block relative top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 w-full">
			{/* FRONT LENGTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalThobeLength`,
				),
			) && (
				<div className="absolute top-[51.3%] w-auto -translate-y-1/2 right-[3.7%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalThobeLength`,
					)}
				</div>
			)}

			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.neckImg`),
			) && (
				<div className="absolute top-[6.5%] w-auto z-20 -translate-y-1/2 right-[25.7%] font-bold translate-x-1/2 w-[10%]">
					<img
						src={`/images/measurements/NECK_${watch(`items.${orderItemIndexNumber}.measurement.neckImg`)}.png`}
						className="w-full"
					/>
				</div>
			)}
			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.neckImg`),
			) && (
				<div className="absolute top-[11.5%] w-auto -translate-y-1/2 right-[91.7%] font-bold translate-x-1/2 w-[10%]">
					<img
						src={`/images/measurements/NECK_${watch(`items.${orderItemIndexNumber}.measurement.neckImg`)}.png`}
						className="w-full"
					/>
				</div>
			)}
			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.chestPocketImg`),
			) && (
				<div className="absolute top-[22.3%]  -translate-y-1/2 right-[21.4%] font-bold translate-x-1/2 w-[7%] opacity-80">
					<img
						src={`/images/measurements/CHEST_POCKET_${watch(`items.${orderItemIndexNumber}.measurement.chestPocketImg`)}.png`}
						className="w-full"
					/>
				</div>
			)}

			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.chestPocketImg`),
			) && (
				<div className="absolute top-[52.3%]  -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 w-[7%] opacity-80">
					<img
						src={`/images/measurements/CHEST_POCKET_${watch(`items.${orderItemIndexNumber}.measurement.chestPocketImg`)}.png`}
						className="w-full"
					/>
				</div>
			)}
			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.jabzoorImg`),
			) && (
				<div className="absolute top-[17%] z-10  -translate-y-1/2 right-[25.7%] font-bold translate-x-1/2 w-[15%] opacity-80">
					<img
						src={`/images/measurements/ZIPPER_${watch(`items.${orderItemIndexNumber}.measurement.jabzoorImg`)}.png`}
						className="w-full"
					/>
				</div>
			)}

			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.jabzoorImg`),
			) && (
				<div className="absolute top-[73.5%]  -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 w-[10%] opacity-80">
					<img
						src={`/images/measurements/ZIPPER_${watch(`items.${orderItemIndexNumber}.measurement.jabzoorImg`)}.png`}
						className="w-full"
					/>
				</div>
			)}
			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.wristImg`),
			) && (
				<div className="absolute top-[34%]  -translate-y-1/2 right-[34%] font-bold translate-x-1/2 w-[10.5%]">
					<img
						src={`/images/measurements/CUFF_${watch(`items.${orderItemIndexNumber}.measurement.wristImg`)}.png`}
						className="w-full"
					/>
				</div>
			)}
			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.wristImg`),
			) && (
				<div className="absolute top-[31%]  -translate-y-1/2 right-[92%] font-bold translate-x-1/2 w-[10.5%]">
					<img
						src={`/images/measurements/CUFF_${watch(`items.${orderItemIndexNumber}.measurement.wristImg`)}.png`}
						className="w-full"
					/>
				</div>
			)}
			{/* SLEEVE LENGTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalSleeveLength`,
				),
			) && (
				<div className="absolute top-[29%] w-auto -translate-y-1/2 right-[8.9%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalSleeveLength`,
					)}
				</div>
			)}

			{/* UPPER SLEEVE WIDTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalUpperSleeveWidth`,
				),
			) && (
				<div className="absolute top-[23%] w-auto -translate-y-1/2 right-[14.3%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalUpperSleeveWidth`,
					)}
				</div>
			)}

			{/* BACK LENGTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalThobeBackLength`,
				),
			) && (
				<div className="absolute top-[51.3%] w-auto -translate-y-1/2 right-[47.3%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalThobeBackLength`,
					)}
				</div>
			)}

			{/* SHOULDER WIDTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalShoulderWidth`,
				),
			) && (
				<div className="absolute top-[11.3%] w-auto -translate-y-1/2 right-[62.9%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalShoulderWidth`,
					)}
				</div>
			)}

			{/* SHOULDER ROTATION */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalShoulderRotation`,
				),
			) && (
				<div className="absolute top-[8.8%] w-auto -translate-y-1/2 right-[34.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalShoulderRotation`,
					)}
				</div>
			)}

			{/* MIDDLE SLEEVE WIDTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalMiddleSleeveWidth`,
				),
			) && (
				<div className="absolute top-[23.3%] w-auto -translate-y-1/2 right-[40.8%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalMiddleSleeveWidth`,
					)}
				</div>
			)}

			{/* WRIST WIDTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalWristWidth`,
				),
			) && (
				<div className="absolute top-[39.8%] w-auto -translate-y-1/2 right-[13.5%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalWristWidth`,
					)}
				</div>
			)}

			{/* CHEST FRONT */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalChestFront`,
				),
			) && (
				<div className="absolute top-[15.8%] w-auto -translate-y-1/2 right-[29.5%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalChestFront`,
					)}
				</div>
			)}

			{/* CHEST BACK */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalChestBack`,
				),
			) && (
				<div className="absolute top-[15.8%] w-auto -translate-y-1/2 right-[62.9%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalChestBack`,
					)}
				</div>
			)}

			{/* CHEST FULL */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalChestFull`,
				),
			) && (
				<div className="absolute top-[20.5%] w-auto -translate-y-1/2 right-[29.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalChestFull`,
					)}
				</div>
			)}

			{/* BOTTOM WIDTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalBottomWidth`,
				),
			) && (
				<div className="absolute top-[95%] w-auto -translate-y-1/2 right-[26%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalBottomWidth`,
					)}
				</div>
			)}

			{/* CUFF BOTTOM WIDTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalCuffBottomWidth`,
				),
			) && (
				<div className="absolute top-[89%] w-auto -translate-y-1/2 right-[39.9%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalCuffBottomWidth`,
					)}
				</div>
			)}

			{/* WAIST WIDTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalWaistWidth`,
				),
			) && (
				<div className="absolute top-[35%] w-auto -translate-y-1/2 right-[25.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalWaistWidth`,
					)}
				</div>
			)}

			{/* HIP WIDTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.general.generalHipWidth`,
				),
			) && (
				<div className="absolute top-[54.3%] w-auto -translate-y-1/2 right-[25.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.general.generalHipWidth`,
					)}
				</div>
			)}

			{/* NECK LENGTH */}
			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.neck.neckLength`),
			) && (
				<div className="absolute top-[12%] w-auto -translate-y-1/2 right-[83.5%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(`items.${orderItemIndexNumber}.measurement.neck.neckLength`)}
				</div>
			)}

			{/* NECK BACK LENGTH */}
			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.neck.neckBackLength`),
			) && (
				<div className="absolute top-[4.2%] w-auto -translate-y-1/2 right-[66.3%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.neck.neckBackLength`,
					)}
				</div>
			)}

			{/* NECK WIDTH */}
			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.neck.neckWidth`),
			) && (
				<div className="absolute top-[4.1%] w-auto -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(`items.${orderItemIndexNumber}.measurement.neck.neckWidth`)}
				</div>
			)}

			{/* NECK INFO ENUMS */}
			{Object.values(neckInfo).some((v) => renderValue(v)) && (
				<div className="absolute top-[20%] w-[24.5%] -translate-y-1/2 right-[87.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{Object.entries(neckInfo).map(([key, value], index) => (
						<span className="text-[10px] 2xl:text-sm font-normal" key={key}>
							{value && t(`neck_${key}_${value}`)}
							{index !== Object.entries(neckInfo).length - 1 && value && " | "}
						</span>
					))}
				</div>
			)}

			{/* CUFF LENGTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.wrist.wristCuffLength`,
				),
			) && (
				<div className="absolute top-[24.9%] w-auto -translate-y-1/2 right-[86.1%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.wrist.wristCuffLength`,
					)}
				</div>
			)}

			{/* CUFF WIDTH */}
			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.wrist.wristCuffWidth`),
			) && (
				<div className="absolute top-[33.8%] w-auto -translate-y-1/2 right-[85.2%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.wrist.wristCuffWidth`,
					)}
				</div>
			)}

			{/* WRIST INFO ENUMS */}
			{Object.values(wristInfo).some((v) => renderValue(v)) && (
				<div className="absolute top-[39.1%] w-[24.5%] -translate-y-1/2 right-[87.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{Object.entries(wristInfo).map(([key, value], index) => (
						<span className="text-[10px] 2xl:text-sm font-normal" key={key}>
							{value && t(`wrist_${key}_${value}`)}
							{index !== Object.entries(wristInfo).length - 1 && value && " | "}
						</span>
					))}
				</div>
			)}

			{/* CHEST POCKET INFO ENUMS */}
			{Object.values(chestPocketInfo).some((v) => renderValue(v)) && (
				<div className="absolute top-[60%] w-[24.5%] -translate-y-1/2 right-[87.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{Object.entries(chestPocketInfo).map(([key, value], index) => (
						<span className="text-[10px] 2xl:text-sm font-normal" key={key}>
							{value && t(`chestPocket_${key}_${value}`)}
							{index !== Object.entries(chestPocketInfo).length - 1 &&
								value &&
								" | "}
						</span>
					))}
				</div>
			)}

			{/* CHEST POCKET LENGTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.chestPocket.chestPocketLength`,
				),
			) && (
				<div className="absolute top-[52.5%] w-auto -translate-y-1/2 right-[84.2%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.chestPocket.chestPocketLength`,
					)}
				</div>
			)}

			{/* CHEST POCKET WIDTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.chestPocket.chestPocketWidth`,
				),
			) && (
				<div className="absolute top-[44.2%] w-auto -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.chestPocket.chestPocketWidth`,
					)}
				</div>
			)}

			{/* BETWEEN CHEST POCKET SHOULDER */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.chestPocket.betweenChestPocketShoulder`,
				),
			) && (
				<div className="absolute top-[11.4%] w-auto -translate-y-1/2 right-[21.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.chestPocket.betweenChestPocketShoulder`,
					)}
				</div>
			)}

			{/* JABZOOR INFO ENUMS */}
			{Object.values(jabzoorInfo).some((v) => renderValue(v)) && (
				<div className="absolute top-[82.3%] w-[24.5%] -translate-y-1/2 right-[87.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{Object.entries(jabzoorInfo).map(([key, value], index) => (
						<span className="text-[10px] 2xl:text-sm font-normal" key={key}>
							{value && t(`jabzoor_${key}_${value}`)}
							{index !== Object.entries(jabzoorInfo).length - 1 &&
								value &&
								" | "}
						</span>
					))}
				</div>
			)}

			{/* JABZOOR LENGTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.jabzoor.jabzoorLength`,
				),
			) && (
				<div className="absolute top-[73%] w-auto -translate-y-1/2 right-[86.1%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.jabzoor.jabzoorLength`,
					)}
				</div>
			)}

			{/* JABZOOR WIDTH */}
			{renderValue(
				watch(`items.${orderItemIndexNumber}.measurement.jabzoor.jabzoorWidth`),
			) && (
				<div className="absolute top-[65%] w-auto -translate-y-1/2 right-[91.4%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.jabzoor.jabzoorWidth`,
					)}
				</div>
			)}

			{/* PHONE POCKET LENGTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.sidePockets.sidePhonePocketLength`,
				),
			) && (
				<div className="absolute top-[92.4%] w-auto -translate-y-1/2 right-[76.3%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.sidePockets.sidePhonePocketLength`,
					)}
				</div>
			)}

			{/* PHONE POCKET WIDTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.sidePockets.sidePhonePocketWidth`,
				),
			) && (
				<div className="absolute top-[87.4%] w-auto -translate-y-1/2 right-[81.6%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.sidePockets.sidePhonePocketWidth`,
					)}
				</div>
			)}

			{/* WALLET POCKET LENGTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.sidePockets.sideWalletPocketLength`,
				),
			) && (
				<div className="absolute top-[92.3%] w-auto -translate-y-1/2 right-[88.6%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.sidePockets.sideWalletPocketLength`,
					)}
				</div>
			)}

			{/* WALLET POCKET WIDTH */}
			{renderValue(
				watch(
					`items.${orderItemIndexNumber}.measurement.sidePockets.sideWalletPocketWidth`,
				),
			) && (
				<div className="absolute top-[87.4%] w-auto -translate-y-1/2 right-[94%] font-bold translate-x-1/2 text-xs 2xl:text-sm text-center">
					{watch(
						`items.${orderItemIndexNumber}.measurement.sidePockets.sideWalletPocketWidth`,
					)}
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
