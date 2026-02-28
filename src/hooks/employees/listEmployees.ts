"use client";
import useSWR from "swr";
import axios from "@/lib/axios";

export interface Employee {
	name: string;
	address: string;
	phone: string;
	email: string;
}

export const useListEmployees = ({ branchId }: { branchId: number }) => {
	const {
		data: employees,
		isLoading: loadingEmployees,
		mutate: mutateEmployees,
	} = useSWR<Employee[]>(
		["list_employees", branchId],
		() =>
			axios
				.get(`/api/v1/branch/${branchId}/employee`)
				.then((res) => res.data.data)
				.catch((e) => console.error(e)),
	);

	return { employees, loadingEmployees, mutateEmployees };
};
