import React from "react";
import useSWR from "swr";
import axios from "@/lib/axios";
import type { GetStockResponse } from "@/lib/types";

export const useGetStock = ({
	branchId,
	stockId,
}: {
	branchId: number;
	stockId: number;
}) => {
	const {
		data: stock,
		isLoading: loadingStock,
		error: errorLoadingStock,
	} = useSWR<GetStockResponse>(["get_stock", branchId, stockId], () =>
		axios
			.get(`/api/v1/branch/${branchId}/stock/${stockId}`)
			.then((res) => res.data.data),
	);

	return { stock, loadingStock, errorLoadingStock };
};
