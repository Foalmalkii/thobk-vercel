import React from "react";
import useSWR from "swr";
import { useAuth } from "./auth";
import axios from "@/lib/axios";
import { useBranches } from "./branches";

export const useMeasurements = ({ customerId }: { customerId?: number }) => {
  const isInBranch = useAuth({ middleware: "auth" });
  const { getCurrentBranch } = useBranches();
  const branchId = getCurrentBranch()?.id;
  const {
    data: measurements,
    isLoading: isLoadingMeasurements,
    mutate: mutateMeasurements,
  } = useSWR(
    isInBranch && branchId && customerId ? `list_measurements` : null,
    () =>
      axios
        .get(`/api/v1/branch/${branchId}/customer/${customerId}/measurement`)
        .then((res) => res.data.data)
        .catch((e) => console.log(e))
  );

  return { measurements, isLoadingMeasurements, mutateMeasurements };
};
