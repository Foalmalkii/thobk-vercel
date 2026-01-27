"use client";
import React from "react";
import useSWR from "swr";
import axios from "@/lib/axios";
import type { GetBranch } from "@/lib/types";

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
