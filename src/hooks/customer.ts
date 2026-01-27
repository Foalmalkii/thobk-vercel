import React from "react";
import useSWR from "swr";
import { useAuth } from "@/hooks/auth";
import { useBranches } from "@/hooks/branches";
import axios from "@/lib/axios";
import { customer } from "@/lib/types";

export const useCustomer = ({ id }: { id?: number }) => {
	const { isInBranch } = useAuth({ middleware: "auth" });

	const {
		data: customer,
		isLoading: isLoadingCustomer,
		mutate: mutateCustomer,
		isValidating: isValidatingCustomer,
	} = useSWR(isInBranch && id ? ["get_customer", id] : null, () =>
		axios
			.get(`/api/v1/branch/${isInBranch}/customer/${id}`)
			.then((res) => res.data.data)
			.catch((e) => console.log(e)),
	);

	return { customer, isLoadingCustomer, mutateCustomer, isValidatingCustomer };
};
