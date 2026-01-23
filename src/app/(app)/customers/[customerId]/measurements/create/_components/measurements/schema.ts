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

	general: z.object({
		generalThobeLength: z.coerce.number().nonnegative().nullable(),
		generalThobeBackLength: z.coerce.number().nonnegative().nullable(),
		generalShoulderWidth: z.coerce.number().nonnegative().nullable(),
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
	}),

	neck: z.object({
		neckLength: z.coerce.number().nonnegative().nullable(),
		neckBackLength: z.coerce.number().nonnegative().nullable(),
		neckWidth: z.coerce.number().nonnegative().nullable(),
		neckButtonCount: z.coerce.number().nonnegative().nullable(),

		neckDesign: z
			.enum(["plain", "v-neck", "french", "chinese", "royal"])
			.nullable(),

		neckShape: z.enum(["square", "rounded"]).nullable(),
		neckFill: z.enum(["1", "2"]).nullable(),
		neckButtonType: z.enum(["normal", "opposite"]).nullable(),
		neckButtonholeType: z.enum(["normal", "arawi"]).nullable(),
		neckButtonMaterial: z.enum(["plastic", "steel"]).nullable(),
		neckButtonVisibility: z.enum(["visible", "invisibile"]).nullable(),
	}),

	wrist: z.object({
		wristCuffType: z.enum(["normal", "cufflinks"]).nullable(),
		wristCuffLength: z.coerce.number().nonnegative().nullable(),
		wristCuffWidth: z.coerce.number().nonnegative().nullable(),

		wristDesign: z
			.enum(["plain", "on", "minced", "rounded", "square", "french", "double"])
			.nullable(),

		wristButtonNumber: z.coerce.number().nonnegative().nullable(),
		wristMaterialLayers: z.enum(["1", "2"]).nullable(),
		wristSleeveCrumbNumber: z.enum(["0", "1", "2"]).nullable(),
	}),

	chestPocket: z.object({
		chestPocketLength: z.coerce.number().nonnegative().nullable(),
		chestPocketWidth: z.coerce.number().nonnegative().nullable(),
		betweenChestPocketShoulder: z.coerce.number().nonnegative().nullable(),

		chestPocketPenType: z.enum(["no", "halfLength", "fullLength"]).nullable(),

		chestPocketDesign: z.enum(["official", "kuwaiti", "model"]).nullable(),

		chestPocketShape: z.enum(["rounded", "square"]).nullable(),
		chestPocketVisibility: z.enum(["visible", "invisible"]).nullable(),
	}),

	sidePockets: z.object({
		sidePhonePocketLength: z.coerce.number().nonnegative().nullable(),
		sidePhonePocketWidth: z.coerce.number().nonnegative().nullable(),
		sideWalletPocketLength: z.coerce.number().nonnegative().nullable(),
		sideWalletPocketWidth: z.coerce.number().nonnegative().nullable(),
	}),

	jabzoor: z.object({
		jabzoorHoleType: z.enum(["push", "buttons", "zip"]).nullable(),
		jabzoorLength: z.coerce.number().nonnegative().nullable(),
		jabzoorWidth: z.coerce.number().nonnegative().nullable(),

		jabzoorDesign: z
			.enum(["normal", "combination", "supportedStitch", "fill", "fullPush"])
			.nullable(),

		jabzoorVisibility: z.enum(["visible", "invisible"]).nullable(),
		jabzoorShape: z.enum(["square", "rounded", "minced"]).nullable(),
		jabzoorPushMaterial: z.enum(["plastic", "steel"]).nullable(),
	}),
});
export const defaultValues = {
	name: null,
	thobeType: null,
	neckImg: null,
	chestPocketImg: null,
	jabzoorImg: null,
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
