// hooks/customers.ts

import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { useAuth } from "@/hooks/auth";
import { useBranches } from "@/hooks/branches";
import axios from "@/lib/axios";
import type { customer } from "@/lib/types";

export const useCustomers = () => {
	const { isInBranch } = useAuth({ middleware: "auth" });
	const { getCurrentBranch } = useBranches();
	const branchId = getCurrentBranch()?.id;

	const searchParams = useSearchParams();
	const page = parseInt(searchParams.get("page") || "1");
	const phones = searchParams.getAll("phone[]");
	const names = searchParams.getAll("name[]");

	// Build query string
	const buildQueryString = () => {
		const params = new URLSearchParams();
		params.set("page", page.toString());

		phones.forEach((phone) => {
			params.append("phone[]", phone);
		});

		names.forEach((name) => {
			params.append("name[]", name);
		});

		return params.toString();
	};

	const {
		data: customers,
		isLoading: isLoadingCustomers,
		mutate: mutateCustomers,
	} = useSWR<customer[]>(
		isInBranch && branchId
			? ["list_customers", branchId, page, phones, names]
			: null,
		() =>
			axios
				.get(`/api/v1/branch/${branchId}/customer?${buildQueryString()}`)
				.then((res) => res.data.data)
				.catch((e) => {
					console.log(e);
					return [];
				}),
	);

	return {
		customers: customers || [],
		currentPage: page,
		totalItems: customers?.length || 0,
		isLoadingCustomers,
		mutateCustomers,
	};
};
