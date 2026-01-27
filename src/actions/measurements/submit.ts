import React from "react";
import type z from "zod";
import type { measurementSchema } from "@/app/(app)/customers/[customerId]/measurements/create/_components/measurements/schema";

export const useActionSubmitMeasurement = () => {
	type measurementData = z.infer<typeof measurementSchema>;
	const handleSubmitMeasurement = async (data: measurementData) => {};
};
