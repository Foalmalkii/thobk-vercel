import axios from "@/lib/axios";
import { GetOrder } from "@/lib/types";
import React from "react";
import useSWR from "swr";

export const useGetOrder = ({
	branchId,
	orderId,
}: {
	branchId: number | null;
	orderId: number;
}) => {
	const {
		data: order,
		isLoading: loadingOrder,
		isValidating: validatingOrder,
		mutate: mutateOrder,
		error: errorOrder,
	} = useSWR<GetOrder>([`get_order`, branchId, orderId], () =>
		axios
			.get(`/api/v1/branch/${branchId}/order/${orderId}`)
			.then((res) => res.data.data)
			.catch((e) => console.error(e)),
	);

	return { order, loadingOrder, validatingOrder, mutateOrder, errorOrder };
};
