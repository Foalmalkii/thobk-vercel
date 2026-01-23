import { locales } from "@/middleware";

export type User = {
	id: number;
	name: string;
	email: string;
	phone: string;
	role: string;
	preferences: {
		activeBranchId: number | null;
	};
};

export type Order = {
	id: number;
	phone: number;
	customerName: string;
	customerId?: number;
	thobeNumber: number;
};

export type customer = {
	id: number;
	name: string;
	phone: string;
	notes?: string;
};

export type branch = {
	id: number;
	name: string;
	address: string;
	email: string;
	phone: string;
};

export type orderItem = {
	fabricType: string;
	color: string;
	unitPrice: number;
	measurementId: number;
	quantity: number;
};

type Locale = (typeof locales)[number];

const localeDirection: Record<Locale, "ltr" | "rtl"> = {
	en: "ltr",
	fr: "ltr",
	ar: "rtl",
	he: "rtl",
};

// Helper function
export function getDirection(locale: Locale): "ltr" | "rtl" {
	return localeDirection[locale] ?? "rtl"; // fallback if needed
}
export interface OrderItem {
	id: number;
	name: string;

	// General measurements
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
	neckDesign: "v-neck" | "round" | "square" | string | null;
	neckShape: "square" | "round" | string | null;
	neckFill: string | null;
	neckButtonType: string | null;
	neckButtonholeType: string | null;
	neckButtonMaterial: string | null;
	neckButtonVisibility: string | null;

	// Wrist / cuff
	wristCuffType: string | null;
	wristCuffLength: string | null;
	wristCuffWidth: string | null;
	wristDesign: string | null;
	wristButtonNumber: number | null;
	wristMaterialLayers: number | null;
	wristSleeveCrumbNumber: number | null;

	// Chest pocket
	chestPocketLength: string | null;
	chestPocketWidth: string | null;
	betweenChestPocketShoulder: string | null;
	chestPocketPenType: string | null;
	chestPocketDesign: string | null;
	chestPocketShape: string | null;
	chestPocketVisibility: string | null;

	// Side pockets
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

	// Pricing & meta
	quantity: number;
	price: string; // "100.00"
	fabricType: string;
	color: string;
}
export interface CustomerInOrder {
	id: number;
	name: string;
	phone: string;
}
export interface GetOrder {
	id: number;
	customer: CustomerInOrder;
	dueDate: string; // ISO date string (YYYY-MM-DD)
	status: "received" | "in_progress" | "ready" | "delivered" | "canceled";
	notes: string | null;
	items: OrderItem[];
}

export type ListMeasurementItem = {
	id: number;
	name: string;
};

export type ListMeasurementResponse = ListMeasurementItem[];

export type GetBranch = {
	id: number;
	name: string;
	phone: string;
	email: string;
	address: {
		buildingNumber: string;
		additionalNumber: string;
		streetAddress: string;
		postalCode: string;
		district: string;
		city: string;
		country: string;
	};
};
