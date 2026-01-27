import z from "zod";

export const measurementSchema = z.object({
	name: z.string().nullable(),
	thobeType: z.enum(["saudi", "kuwaiti", "qatari", "emirati"]).nullable(),
	chestPocketImg: z
		.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"])
		.nullable(),
	jabzoorImg: z.enum(["1", "2", "3", "4", "5", "6", "7", "8"]).nullable(),
	neckImg: z
		.enum([
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
		])
		.nullable(),

	wristImg: z
		.enum([
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
		])
		.nullable(),

	general: z.object({
		generalThobeLength: z.string().nullable(),
		generalThobeBackLength: z.string().nullable(),
		generalShoulderWidth: z.string().nullable(),

		generalShoulderRight: z.string().nullable(),
		generalShoulderLeft: z.string().nullable(),

		generalSleeveLength: z.string().nullable(),
		generalUpperSleeveWidth: z.string().nullable(),
		generalMiddleSleeveWidth: z.string().nullable(),
		generalWristWidth: z.string().nullable(),
		generalChestFront: z.string().nullable(),
		generalChestFull: z.string().nullable(),
		generalBottomWidth: z.string().nullable(),
		generalCuffBottomWidth: z.string().nullable(),
		generalWaistWidth: z.string().nullable(),
		generalHipWidth: z.string().nullable(),
		generalTakaleesLength: z.string().nullable(),
		generalTakaleesWidth: z.string().nullable(),
	}),

	neck: z.object({
		neckLength: z.string().nullable(),
		neckBackLength: z.string().nullable(),
		neckWidth: z.string().nullable(),
		neckFill: z.string().nullable(),
		neckNotes: z.string().nullable(),
	}),

	wrist: z.object({
		wristCuffType: z.enum(["normal", "cufflinks"]).nullable(),
		wristCuffLength: z.string().nullable(),
		wristCuffWidth: z.string().nullable(),
		wristNotes: z.string().nullable(),
	}),

	chestPocket: z.object({
		chestPocketLength: z.string().nullable(),
		chestPocketWidth: z.string().nullable(),
		betweenChestPocketShoulder: z.string().nullable(),
		chestPocketNotes: z.string().nullable(),
	}),

	sidePockets: z.object({
		sidePhonePocketLength: z.string().nullable(),
		sidePhonePocketWidth: z.string().nullable(),
		sideWalletPocketLength: z.string().nullable(),
		sideWalletPocketWidth: z.string().nullable(),
	}),

	jabzoor: z.object({
		jabzoorLength: z.string().nullable(),
		jabzoorWidth: z.string().nullable(),

		jabzoorNotes: z.string().nullable(),
	}),
});
export const defaultValues = {
	name: null,
	thobeType: null,
	neckImg: null,
	chestPocketImg: null,
	jabzoorImg: null,
	wristImg: null,
	general: {
		generalThobeLength: null,
		generalThobeBackLength: null,
		generalShoulderWidth: null,
		generalShoulderRotation: null,
		generalSleeveLength: null,
		generalUpperSleeveWidth: null,
		generalMiddleSleeveWidth: null,
		generalWristWidth: null,
		generalChestFront: null,
		generalChestBack: null,
		generalChestFull: null,
		generalBottomWidth: null,
		generalCuffBottomWidth: null,
		generalAddedInfo: null,
		generalSidePocket: null,
		generalWaistWidth: null,
		generalHipWidth: null,
	},

	neck: {
		neckLength: null,
		neckBackLength: null,
		neckWidth: null,
		neckButtonCount: null,
		neckDesign: null,
		neckShape: null,
		neckFill: null,
		neckButtonType: null,
		neckButtonholeType: null,
		neckButtonMaterial: null,
		neckButtonVisibility: null,
	},

	wrist: {
		wristCuffType: null,
		wristCuffLength: null,
		wristCuffWidth: null,
		wristDesign: null,
		wristButtonNumber: null,
		wristMaterialLayers: null,
		wristSleeveCrumbNumber: null,
	},

	chestPocket: {
		chestPocketLength: null,
		chestPocketWidth: null,
		betweenChestPocketShoulder: null,
		chestPocketPenType: null,
		chestPocketDesign: null,
		chestPocketShape: null,
		chestPocketVisibility: null,
	},

	sidePockets: {
		sidePhonePocketLength: null,
		sidePhonePocketWidth: null,
		sideWalletPocketLength: null,
		sideWalletPocketWidth: null,
	},

	jabzoor: {
		jabzoorHoleType: null,
		jabzoorLength: null,
		jabzoorWidth: null,
		jabzoorDesign: null,
		jabzoorVisibility: null,
		jabzoorShape: null,
		jabzoorPushMaterial: null,
	},
};
