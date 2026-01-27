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
	const {
		data: customers,
		isLoading: isLoadingCustomers,
		mutate: mutateCustomers,
	} = useSWR<customer[]>(isInBranch && branchId ? "list_customers" : null, () =>
		axios
			.get(`/api/v1/branch/${branchId}/customer`)
			.then((res) => res.data.data)
			.catch((e) => console.log(e)),
	);

	return { customers, isLoadingCustomers, mutateCustomers };
};
