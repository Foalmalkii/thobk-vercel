import axios from "@/lib/axios";
import { branch } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import z from "zod";
import { useAuth } from "./auth";

const branchSchema = z.object({
	name: z.string().nonempty(),
	address: z.string().nonempty(),
	phone: z
		.string()
		.nonempty()
		.regex(/^05\d{8}$/, { message: "Invalid phone" }),
	email: z.email(),
});
type branchRequest = z.infer<typeof branchSchema>;

export const useBranches = () => {
	const { mutateUser, isInBranch } = useAuth({ middleware: "auth" });
	const {
		data: branches,
		error: errorBranches,
		isLoading: isLoadingBranches,
		mutate: mutateBranches,
	} = useSWR("list_branches", () =>
		axios
			.get("/api/v1/branch")
			.then((res) => res.data?.data)
			.catch((e) => console.log(e)),
	);

	const setCurrentBranch = async (id: string) => {
		await axios
			.post(`/api/v1/branch/activate/${id}`)
			.then((res) => {
				if (res.status >= 200 && res.status < 300) {
					console.log("Successful branch change");
				} else {
					throw Error;
				}
			})
			.catch((e) => console.log(e));

		mutateUser();
	};

	const getCurrentBranch = (): branch | null => {
		// Use the reliable source of truth (isInBranch from useAuth)
		if (!branches || !isInBranch) return null;

		return (
			branches.find((b: branch) => String(b.id) === String(isInBranch)) || null
		);
	};

	return {
		branches,
		isLoadingBranches,
		mutateBranches,
		setCurrentBranch,
		getCurrentBranch,
	};
};
