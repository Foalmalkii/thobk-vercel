// hooks/stock/listStock.ts
"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";

export type StockItem = {
	id: number;
	name: string;
	type: string;
	color: string;
	colorCode: string | null;
	supplier: string;
	remainingMeters: number | null;
};

export type ListStockResponse = StockItem[];

export const useListStock = () => {
	const { isInBranch } = useAuth({ middleware: "auth" });
	const searchParams = useSearchParams();
	const page = parseInt(searchParams.get("page") || "1");

	const {
		data: stock,
		isLoading: loadingStock,
		isValidating: validatingStock,
		error: errorStock,
		mutate: mutateStock,
	} = useSWR<ListStockResponse>(
		isInBranch ? [`list_stock`, isInBranch, page] : null,
		() =>
			axios
				.get(`/api/v1/branch/${isInBranch}/stock?page=${page}`)
				.then((res) => res.data.data)
				.catch((e) => {
					console.error(e);
					return [];
				}),
	);

	return {
		stock: stock || [],
		currentPage: page,
		totalItems: stock?.length || 0,
		loadingStock,
		validatingStock,
		errorStock,
		mutateStock,
	};
};
