"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import axios from "@/lib/axios";
import { useAuth } from "../auth";

type listOrderItem = {
	id: number;
	customer: {
		id: number;
		name: string;
		phone: number;
	};
	dueDate: string;
	status: string;
	createdAt: string;
	updatedAt: string;
};

export type listOrderResponse = listOrderItem[];

export const useListOrders = () => {
	const { isInBranch } = useAuth({ middleware: "auth" });
	const searchParams = useSearchParams();

	const page = parseInt(searchParams.get("page") || "1");
	const phones = searchParams.getAll("phone[]");
	const statuses = searchParams.getAll("status[]");

	// Build query string
	const buildQueryString = () => {
		const params = new URLSearchParams();
		params.set("page", page.toString());

		phones.forEach((phone) => {
			params.append("phone[]", phone);
		});

		statuses.forEach((status) => {
			params.append("status[]", status);
		});

		return params.toString();
	};

	const {
		data: orders,
		isLoading: loadingOrders,
		isValidating: validatingOrders,
		error: errorOrders,
		mutate: mutateOrders,
	} = useSWR<listOrderResponse>(
		isInBranch ? [`list_orders`, isInBranch, page, phones, statuses] : null,
		() =>
			axios
				.get(`/api/v1/branch/${isInBranch}/order?${buildQueryString()}`)
				.then((res) => res.data.data)
				.catch((e) => {
					console.error(e);
					return [];
				}),
	);

	const emptyOrders = orders?.length === 0;

	return {
		orders: orders || [],
		currentPage: page,
		totalItems: orders?.length || 0,
		loadingOrders,
		validatingOrders,
		errorOrders,
		emptyOrders,
		mutateOrders,
	};
};
