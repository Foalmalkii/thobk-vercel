import { measurementSchema } from "@/app/(app)/customers/[customerId]/measurements/create/_components/measurements/schema";
import React from "react";
import z from "zod";

export const useActionSubmitMeasurement = () => {
  type measurementData = z.infer<typeof measurementSchema>;
  const handleSubmitMeasurement = async (data: measurementData) => {};
};
