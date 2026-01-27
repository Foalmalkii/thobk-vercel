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
		generalThobeLength: z.coerce.number().nonnegative().nullable(),
		generalThobeBackLength: z.coerce.number().nonnegative().nullable(),
		generalShoulderWidth: z.coerce.number().nonnegative().nullable(),

		generalShoulderRight: z.coerce.number().nonnegative().nullable(),
		generalShoulderLeft: z.coerce.number().nonnegative().nullable(),

		generalShoulderRotation: z.coerce.number().nonnegative().nullable(),
		generalSleeveLength: z.coerce.number().nonnegative().nullable(),
		generalUpperSleeveWidth: z.coerce.number().nonnegative().nullable(),
		generalMiddleSleeveWidth: z.coerce.number().nonnegative().nullable(),
		generalWristWidth: z.coerce.number().nonnegative().nullable(),
		generalChestFront: z.coerce.number().nonnegative().nullable(),
		generalChestBack: z.coerce.number().nonnegative().nullable(),
		generalChestFull: z.coerce.number().nonnegative().nullable(),
		generalBottomWidth: z.coerce.number().nonnegative().nullable(),
		generalCuffBottomWidth: z.coerce.number().nonnegative().nullable(),
		generalAddedInfo: z.coerce.number().nonnegative().nullable(),
		generalSidePocket: z.coerce.number().nonnegative().nullable(),
		generalWaistWidth: z.coerce.number().nonnegative().nullable(),
		generalHipWidth: z.coerce.number().nonnegative().nullable(),
		generalTakaleesLength: z.coerce.number().nonnegative().nullable(),
		generalTakaleesWidth: z.coerce.number().nonnegative().nullable(),
	}),

	neck: z.object({
		neckLength: z.coerce.number().nonnegative().nullable(),
		neckBackLength: z.coerce.number().nonnegative().nullable(),
		neckWidth: z.coerce.number().nonnegative().nullable(),
		neckFill: z.coerce.number().nonnegative().nullable(),
		neckNotes: z.string().nullable(),
	}),

	wrist: z.object({
		wristCuffType: z.enum(["normal", "cufflinks"]).nullable(),
		wristCuffLength: z.coerce.number().nonnegative().nullable(),
		wristCuffWidth: z.coerce.number().nonnegative().nullable(),
		wristNotes: z.string().nullable(),
	}),

	chestPocket: z.object({
		chestPocketLength: z.coerce.number().nonnegative().nullable(),
		chestPocketWidth: z.coerce.number().nonnegative().nullable(),
		betweenChestPocketShoulder: z.coerce.number().nonnegative().nullable(),
		chestPocketNotes: z.string().nullable(),
	}),

	sidePockets: z.object({
		sidePhonePocketLength: z.coerce.number().nonnegative().nullable(),
		sidePhonePocketWidth: z.coerce.number().nonnegative().nullable(),
		sideWalletPocketLength: z.coerce.number().nonnegative().nullable(),
		sideWalletPocketWidth: z.coerce.number().nonnegative().nullable(),
	}),

	jabzoor: z.object({
		jabzoorLength: z.coerce.number().nonnegative().nullable(),
		jabzoorWidth: z.coerce.number().nonnegative().nullable(),

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
