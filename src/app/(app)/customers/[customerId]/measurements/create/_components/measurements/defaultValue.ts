export type MeasurementRequest = {
	id: number;
	name: string;
	thobeType: string | null;
	neckImg: string | null;
	chestPocketImg: string | null;
	jabzoorImg: string | null;
	// General
	generalThobeLength: string | null;
	generalThobeBackLength: string | null;
	generalShoulderWidth: string | null;
	generalShoulderRotation: string | null;
	generalSleeveLength: string | null;
	generalUpperSleeveWidth: string | null;
	generalMiddleSleeveWidth: string | null;
	generalWristWidth: string | null;
	generalChestFront: string | null;
	generalChestBack: string | null;
	generalChestFull: string | null;
	generalBottomWidth: string | null;
	generalCuffBottomWidth: string | null;
	generalAddedInfo: string | null;
	generalSidePocket: string | null;
	generalWaistWidth: string | null;
	generalHipWidth: string | null;

	// Neck
	neckLength: string | null;
	neckBackLength: string | null;
	neckWidth: string | null;
	neckButtonCount: number | null;
	neckDesign: string | null;
	neckShape: string | null;
	neckFill: string | null;
	neckButtonType: string | null;
	neckButtonholeType: string | null;
	neckButtonMaterial: string | null;
	neckButtonVisibility: string | null;

	// Wrist / Cuff
	wristCuffType: string | null;
	wristCuffLength: string | null;
	wristCuffWidth: string | null;
	wristDesign: string | null;
	wristButtonNumber: number | null;
	wristMaterialLayers: number | null;
	wristSleeveCrumbNumber: number | null;

	// Chest Pocket
	chestPocketLength: string | null;
	chestPocketWidth: string | null;
	betweenChestPocketShoulder: string | null;
	chestPocketPenType: string | null;
	chestPocketDesign: string | null;
	chestPocketShape: string | null;
	chestPocketVisibility: string | null;

	// Side Pockets
	sidePhonePocketLength: string | null;
	sidePhonePocketWidth: string | null;
	sideWalletPocketLength: string | null;
	sideWalletPocketWidth: string | null;

	// Jabzoor
	jabzoorHoleType: string | null;
	jabzoorLength: string | null;
	jabzoorWidth: string | null;
	jabzoorDesign: string | null;
	jabzoorVisibility: string | null;
	jabzoorShape: string | null;
	jabzoorPushMaterial: string | null;
};

export const defaultValue = (measurement: MeasurementRequest) => {
	return {
		name: measurement?.name,
		thobeType: measurement?.thobeType,
		neckImg: measurement?.neckImg,
		chestPocketImg: measurement?.chestPocketImg,
		jabzoorImg: measurement?.jabzoorImg,
		general: {
			generalThobeLength: measurement?.generalThobeLength,
			generalThobeBackLength: measurement?.generalThobeBackLength,
			generalShoulderWidth: measurement?.generalShoulderWidth,
			generalShoulderRotation: measurement?.generalShoulderRotation,
			generalSleeveLength: measurement?.generalSleeveLength,
			generalUpperSleeveWidth: measurement?.generalUpperSleeveWidth,
			generalMiddleSleeveWidth: measurement?.generalMiddleSleeveWidth,
			generalWristWidth: measurement?.generalWristWidth,
			generalChestFront: measurement?.generalChestFront,
			generalChestBack: measurement?.generalChestBack,
			generalChestFull: measurement?.generalChestFull,
			generalBottomWidth: measurement?.generalBottomWidth,
			generalCuffBottomWidth: measurement?.generalCuffBottomWidth,
			generalAddedInfo: measurement?.generalAddedInfo,
			generalSidePocket: measurement?.generalSidePocket,
			generalWaistWidth: measurement?.generalWaistWidth,
			generalHipWidth: measurement?.generalHipWidth,
		},

		neck: {
			neckLength: measurement?.neckLength,
			neckBackLength: measurement?.neckBackLength,
			neckWidth: measurement?.neckWidth,
			neckButtonCount: measurement?.neckButtonCount,
			neckDesign: measurement?.neckDesign,
			neckShape: measurement?.neckShape,
			neckFill: measurement?.neckFill,
			neckButtonType: measurement?.neckButtonType,
			neckButtonholeType: measurement?.neckButtonholeType,
			neckButtonMaterial: measurement?.neckButtonMaterial,
			neckButtonVisibility: measurement?.neckButtonVisibility,
		},

		wrist: {
			wristCuffType: measurement?.wristCuffType,
			wristCuffLength: measurement?.wristCuffLength,
			wristCuffWidth: measurement?.wristCuffWidth,
			wristDesign: measurement?.wristDesign,
			wristButtonNumber: measurement?.wristButtonNumber,
			wristMaterialLayers: measurement?.wristMaterialLayers,
			wristSleeveCrumbNumber: measurement?.wristSleeveCrumbNumber,
		},

		chestPocket: {
			chestPocketLength: measurement?.chestPocketLength,
			chestPocketWidth: measurement?.chestPocketWidth,
			betweenChestPocketShoulder: measurement?.betweenChestPocketShoulder,
			chestPocketPenType: measurement?.chestPocketPenType,
			chestPocketDesign: measurement?.chestPocketDesign,
			chestPocketShape: measurement?.chestPocketShape,
			chestPocketVisibility: measurement?.chestPocketVisibility,
		},

		sidePockets: {
			sidePhonePocketLength: measurement?.sidePhonePocketLength,
			sidePhonePocketWidth: measurement?.sidePhonePocketWidth,
			sideWalletPocketLength: measurement?.sideWalletPocketLength,
			sideWalletPocketWidth: measurement?.sideWalletPocketWidth,
		},

		jabzoor: {
			jabzoorHoleType: measurement?.jabzoorHoleType,
			jabzoorLength: measurement?.jabzoorLength,
			jabzoorWidth: measurement?.jabzoorWidth,
			jabzoorDesign: measurement?.jabzoorDesign,
			jabzoorVisibility: measurement?.jabzoorVisibility,
			jabzoorShape: measurement?.jabzoorShape,
			jabzoorPushMaterial: measurement?.jabzoorPushMaterial,
		},
	};
};
