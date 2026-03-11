"use client";

import { useLocale, useTranslations } from "next-intl";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useListCities } from "@/hooks/address/listCities";

interface CitySelectProps {
	value: number | null;
	onChange: (value: number) => void;
	countryId: number | null;
	stateId: number | null;
	disabled?: boolean;
}

export const CitySelect = ({ value, onChange, countryId, stateId, disabled }: CitySelectProps) => {
	const t = useTranslations("messages");
	const locale = useLocale();
	const { cities, loadingCities } = useListCities(countryId, stateId);

	return (
		<Select
			value={value ? String(value) : ""}
			onValueChange={(val) => onChange(Number(val))}
			disabled={disabled || !stateId || loadingCities}
		>
			<SelectTrigger>
				<SelectValue placeholder={t("select_city")} />
			</SelectTrigger>
			<SelectContent>
				{cities?.map((city) => (
					<SelectItem key={city.id} value={String(city.id)}>
						{locale === "ar" ? city.ar : city.en}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
