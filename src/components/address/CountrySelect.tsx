"use client";

import { useLocale, useTranslations } from "next-intl";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useListCountries } from "@/hooks/address/listCountries";

interface CountrySelectProps {
	value: number | null;
	onChange: (value: number) => void;
	disabled?: boolean;
}

export const CountrySelect = ({ value, onChange, disabled }: CountrySelectProps) => {
	const t = useTranslations("messages");
	const locale = useLocale();
	const { countries, loadingCountries } = useListCountries();

	return (
		<Select
			value={value ? String(value) : ""}
			onValueChange={(val) => onChange(Number(val))}
			disabled={disabled || loadingCountries}
		>
			<SelectTrigger>
				<SelectValue placeholder={t("select_country")} />
			</SelectTrigger>
			<SelectContent>
				{countries?.map((country) => (
					<SelectItem key={country.id} value={String(country.id)}>
						{locale === "ar" ? country.ar : country.en}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
