import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skueventsApi } from "../api/skuevents";

export function useGetAllInv() {
  return useQuery({ queryKey: ["skuevents"], queryFn: skueventsApi.getAllInv });
}
