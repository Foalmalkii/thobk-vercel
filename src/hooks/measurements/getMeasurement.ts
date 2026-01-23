import axios from "@/lib/axios";
import React from "react";
import useSWR from "swr";

export const useGetMeasurement = ({
	customerId,
	branchId,
	measurementId,
}: {
	branchId: number | null;
	customerId: number;
	measurementId: number;
}) => {
	const {
		data: measurement,
		isLoading: loadingMeasurement,
		isValidating: validatingMeasurement,
		error: errorMeasurement,
		mutate: mutateMeasurement,
	} = useSWR(["get_measurement", customerId, measurementId], () =>
		axios
			.get(
				`/api/v1/branch/${branchId}/customer/${customerId}/measurement/${measurementId}`,
			)
			.then((res) => res.data.data)
			.catch((e) => console.error(e)),
	);

	return {
		measurement,
		loadingMeasurement,
		validatingMeasurement,
		mutateMeasurement,
		errorMeasurement,
	};
};
