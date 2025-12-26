import { useAuth } from "@/hooks/auth";
import { useBranches } from "@/hooks/branches";
import axios from "@/lib/axios";
import { customer } from "@/lib/types";
import React from "react";
import useSWR from "swr";

export const useCustomer = ({ id }: { id?: number }) => {
  const { isInBranch } = useAuth({ middleware: "auth" });
  const { getCurrentBranch } = useBranches();
  const branchId = getCurrentBranch()?.id;
  const {
    data: customer,
    isLoading: isLoadingCustomer,
    mutate: mutateCustomer,
  } = useSWR(isInBranch && branchId ? "get_customer" : null, () =>
    axios
      .get(`/api/v1/branch/${branchId}/customer/${id}`)
      .then((res) => res?.data?.data)
      .catch((e) => console.log(e))
  );

  return { customer, isLoadingCustomer, mutateCustomer };
};
