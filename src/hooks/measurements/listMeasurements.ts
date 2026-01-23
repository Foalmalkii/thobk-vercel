import axios from "@/lib/axios";
import { ListMeasurementResponse } from "@/lib/types";
import React from "react";
import useSWR from "swr";

export const useListMeasurements = ({
	branchId,
	customerId,
}: {
	branchId: number | null;
	customerId: number;
}) => {
	const {
		data: measurements,
		isLoading: loadingMeasurements,
		isValidating: validatingMeasurements,
		error: errorMeasurements,
		mutate: mutateMeasurements,
	} = useSWR<ListMeasurementResponse>(["list_measurements", customerId], () =>
		axios
			.get(`/api/v1/branch/${branchId}/customer/${customerId}/measurement`)
			.then((res) => res.data.data)
			.catch((e) => console.error(e)),
	);

	const emptyMeasurements = measurements?.length === 0;
	return {
		measurements,
		loadingMeasurements,
		validatingMeasurements,
		emptyMeasurements,
		mutateMeasurements,
		errorMeasurements,
	};
};
