"use client";

import useSWR from "swr";
import axios from "@/lib/axios";

export interface District {
	id: number;
	ar: string;
	en: string;
}

export const useListDistricts = (
	countryId: number | null,
	stateId: number | null,
	cityId: number | null,
) => {
	const { data: districts, isLoading: loadingDistricts } = useSWR<District[]>(
		countryId && stateId && cityId ? ["list_districts", countryId, stateId, cityId] : null,
		() =>
			axios
				.get(`/api/v1/country/${countryId}/state/${stateId}/city/${cityId}/district`)
				.then((res) => res.data.data),
	);

	return { districts, loadingDistricts };
};
