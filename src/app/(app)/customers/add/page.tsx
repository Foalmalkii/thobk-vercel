import { useTranslations } from "next-intl";
import React from "react";

export default function CustomersAddPage() {
	const t = useTranslations();
	return (
		<div className="">
			<h1 className="text-2xl font-semibold">{t("customers.add_customer")}</h1>
		</div>
	);
}
