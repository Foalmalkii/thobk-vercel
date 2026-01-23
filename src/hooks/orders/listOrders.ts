"use client";
import React from "react";
import useSWR from "swr";
import { useAuth } from "../auth";
import axios from "@/lib/axios";

type listOrderItem = {
	id: number;
	customer: {
		id: number;
		name: string;
		phone: number;
	};
	dueDate: string;
	status: string;
};

export type listOrderResponse = listOrderItem[];

export const useListOrders = () => {
	const { isInBranch } = useAuth({ middleware: "auth" });
	const {
		data: orders,
		isLoading: loadingOrders,
		isValidating: validatingOrders,
		error: errorOrders,
	} = useSWR<listOrderResponse>([`list_orders`, isInBranch], () =>
		axios
			.get(`/api/v1/branch/${isInBranch}/order`)
			.then((res) => res.data.data)
			.catch((e) => console.error(e)),
	);

	const emptyOrders = orders?.length === 0;
	return { orders, loadingOrders, validatingOrders, errorOrders, emptyOrders };
};
