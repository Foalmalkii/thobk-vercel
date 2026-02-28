"use client";
import useSWR from "swr";
import axios from "@/lib/axios";
import type { GetBranch } from "@/lib/types";

interface UseListBranchesParams {
	type: "store" | "factory";
	factory?: number;
	notFactory?: number;
}

export const useListBranches = ({ type, factory, notFactory }: UseListBranchesParams) => {
	const {
		data: branches,
		isLoading: loadingBranches,
		mutate: mutateBranches,
	} = useSWR<GetBranch[]>(
		["list_branches", type, factory, notFactory],
		() =>
			axios
				.get("/api/v1/branch", { params: { type, factory, notFactory } })
				.then((res) => res.data.data)
				.catch((e) => console.error(e)),
	);

	return { branches, loadingBranches, mutateBranches };
};
