"use client";
import useSWR from "swr";
import axios from "@/lib/axios";

export interface AccountingReport {
	id: number;
	startDate: string;
	endDate: string;
	status: "pending" | "completed" | "failed" | "ready";
	path: string | null;
}

export const useListAccounting = () => {
	const {
		data: reports,
		isLoading: loadingReports,
		mutate: mutateReports,
	} = useSWR<AccountingReport[]>("list_accounting", () =>
		axios
			.get("/api/v1/accounting")
			.then((res) => res.data.data)
			.catch((e) => console.error(e)),
	);

	return { reports, loadingReports, mutateReports };
};
