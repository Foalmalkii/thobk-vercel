"use client";

import useSWR from "swr";
import axios from "@/lib/axios";

export interface Country {
	id: number;
	ar: string;
	en: string;
	currency: string;
}

export const useListCountries = () => {
	const { data: countries, isLoading: loadingCountries } = useSWR<Country[]>(
		"list_countries",
		() =>
			axios
				.get("/api/v1/country")
				.then((res) => res.data.data),
	);

	return { countries, loadingCountries };
};
