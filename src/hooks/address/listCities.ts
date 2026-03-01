"use client";

import useSWR from "swr";
import axios from "@/lib/axios";

export interface City {
	id: number;
	ar: string;
	en: string;
}

export const useListCities = (countryId: number | null, stateId: number | null) => {
	const { data: cities, isLoading: loadingCities } = useSWR<City[]>(
		countryId && stateId ? ["list_cities", countryId, stateId] : null,
		() =>
			axios
				.get(`/api/v1/country/${countryId}/state/${stateId}/city`)
				.then((res) => res.data.data),
	);

	return { cities, loadingCities };
};
