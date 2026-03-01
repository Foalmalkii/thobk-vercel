"use client";

import useSWR from "swr";
import axios from "@/lib/axios";

export interface State {
	id: number;
	ar: string;
	en: string;
}

export const useListStates = (countryId: number | null) => {
	const { data: states, isLoading: loadingStates } = useSWR<State[]>(
		countryId ? ["list_states", countryId] : null,
		() =>
			axios
				.get(`/api/v1/country/${countryId}/state`)
				.then((res) => res.data.data),
	);

	return { states, loadingStates };
};
