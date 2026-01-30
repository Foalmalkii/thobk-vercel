import useSWR from "swr";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";

export interface SavedMeasurement {
	id: number;
	name: string;
	displayName: string;
	orderId: number;
}

export interface MeasurementDetails {
	id: number;
	quantity: number;
	price: number;
	fabricId: number | null;
	notes: string | null;
	name: string;
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
	generalWaistWidth: string | null;
	generalHipWidth: string | null;
	generalShoulderRight: string | null;
	generalShoulderLeft: string | null;
	generalTakaleesLength: string | null;
	generalTakaleesWidth: string | null;
	neckLength: string | null;
	neckBackLength: string | null;
	neckWidth: string | null;
	neckFill: string | null;
	neckNotes: string | null;
	wristCuffType: string | null;
	wristCuffLength: string | null;
	wristCuffWidth: string | null;
	wristNotes: string | null;
	chestPocketLength: string | null;
	chestPocketWidth: string | null;
	betweenChestPocketShoulder: string | null;
	chestPocketPenType: string | null;
	chestPocketNotes: string | null;
	sidePhonePocketLength: string | null;
	sidePhonePocketWidth: string | null;
	sideWalletPocketLength: string | null;
	sideWalletPocketWidth: string | null;
	jabzoorLength: string | null;
	jabzoorWidth: string | null;
	jabzoorNotes: string | null;
	thobeType: string | null;
	chestPocketImg: string | null;
	jabzoorImg: string | null;
	neckImg: string | null;
	wristImg: string | null;
}

export const useCustomerMeasurements = (customerId: number) => {
	const { isInBranch } = useAuth({ middleware: "auth" });

	const { data, error, isLoading, mutate } = useSWR<SavedMeasurement[]>(
		customerId && isInBranch
			? `/api/v1/branch/${isInBranch}/customer/${customerId}/measurement`
			: null,
		() =>
			axios
				.get(`/api/v1/branch/${isInBranch}/customer/${customerId}/measurement`)
				.then((res) => res.data.data),
		{
			revalidateOnFocus: false,
		},
	);

	return {
		measurements: data || [],
		isLoadingMeasurements: isLoading,
		errorMeasurements: error,
		mutateMeasurements: mutate,
	};
};

export const useMeasurementDetails = (
	orderId: number | null,
	itemId: number | null,
) => {
	const { isInBranch } = useAuth({ middleware: "auth" });

	const { data, error, isLoading } = useSWR<MeasurementDetails>(
		orderId && itemId && isInBranch
			? `/api/v1/branch/${isInBranch}/order/${orderId}/items/${itemId}`
			: null,
		() =>
			axios
				.get(`/api/v1/branch/${isInBranch}/order/${orderId}/items/${itemId}`)
				.then((res) => res.data.data),
		{
			revalidateOnFocus: false,
		},
	);

	return {
		measurementDetails: data,
		isLoadingDetails: isLoading,
		errorDetails: error,
	};
};
