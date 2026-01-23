"use client";
import axios from "@/lib/axios";
import { GetBranch } from "@/lib/types";
import React from "react";
import useSWR from "swr";

export const useGetBranch = ({ branchId }: { branchId: number | null }) => {
	const { data: branch, isLoading: loadingBranches } = useSWR<GetBranch>(
		["get_branch", branchId],
		() =>
			axios
				.get(`/api/v1/branch/${branchId}`)
				.then((res) => res.data.data)
				.catch((e) => console.error(e)),
	);

	return { branch };
};
