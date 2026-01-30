import React from "react";
import useSWR from "swr";

export const listOrderItems = ({
	branchId,
	customerId,
}: {
	branchId: number;
	customerId: number;
}) => {
	const { data: orderItems, isLoading: loadingOrderItems } = useSWR();
};
