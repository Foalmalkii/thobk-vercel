"use client";

import { useLocale, useTranslations } from "next-intl";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useListDistricts } from "@/hooks/address/listDistricts";

interface DistrictSelectProps {
	value: number | null;
	onChange: (value: number) => void;
	countryId: number | null;
	stateId: number | null;
	cityId: number | null;
	disabled?: boolean;
}

export const DistrictSelect = ({
	value,
	onChange,
	countryId,
	stateId,
	cityId,
	disabled,
}: DistrictSelectProps) => {
	const t = useTranslations("messages");
	const locale = useLocale();
	const { districts, loadingDistricts } = useListDistricts(countryId, stateId, cityId);

	return (
		<Select
			value={value ? String(value) : ""}
			onValueChange={(val) => onChange(Number(val))}
			disabled={disabled || !cityId || loadingDistricts}
		>
			<SelectTrigger>
				<SelectValue placeholder={t("select_district")} />
			</SelectTrigger>
			<SelectContent>
				{districts?.map((district) => (
					<SelectItem key={district.id} value={String(district.id)}>
						{locale === "ar" ? district.ar : district.en}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
