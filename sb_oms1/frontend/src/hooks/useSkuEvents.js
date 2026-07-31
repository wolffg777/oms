import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skueventsApi } from "../api/skuevents";

export function useGetAllInvSkus() {
  return useQuery({
    queryKey: ["skuevents"],
    queryFn: skueventsApi.getAllInvSkus,
  });
}

export function useGetAllInvAdjs() {
  return useQuery({
    queryKey: ["skuevents"],
    queryFn: skueventsApi.getAllInvAdjs,
  });
}
