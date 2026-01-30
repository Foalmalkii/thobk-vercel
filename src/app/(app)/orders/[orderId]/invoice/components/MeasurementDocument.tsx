import { Document } from "@react-pdf/renderer";
import React from "react";
import type { GetBranch, GetOrder, GetStockResponse } from "@/lib/types";
import { MeasurementPage } from "./MeasurementPage";

export const MeasurementDocument = ({
	order,
	branch,
}: {
	order: GetOrder;
	branch: GetBranch;
}) => {
	return (
		<Document>
			{order?.items.map((item) => (
				<MeasurementPage
					key={item.id}
					order={order}
					item={item}
					branch={branch}
				/>
			))}
		</Document>
	);
};
