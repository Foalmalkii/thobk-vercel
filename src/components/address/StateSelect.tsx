"use client";

import { useLocale, useTranslations } from "next-intl";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useListStates } from "@/hooks/address/listStates";

interface StateSelectProps {
	value: number | null;
	onChange: (value: number) => void;
	countryId: number | null;
	disabled?: boolean;
}

export const StateSelect = ({ value, onChange, countryId, disabled }: StateSelectProps) => {
	const t = useTranslations("messages");
	const locale = useLocale();
	const { states, loadingStates } = useListStates(countryId);

	return (
		<Select
			value={value ? String(value) : ""}
			onValueChange={(val) => onChange(Number(val))}
			disabled={disabled || !countryId || loadingStates}
		>
			<SelectTrigger>
				<SelectValue placeholder={t("select_state")} />
			</SelectTrigger>
			<SelectContent>
				{states?.map((state) => (
					<SelectItem key={state.id} value={String(state.id)}>
						{locale === "ar" ? state.ar : state.en}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
