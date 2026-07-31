import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adjsApi } from "../api/adjs";

// export function useCreateAdj() {
// return useMutation
// }

export function useAdjs() {
  return useQuery({ queryKey: ["adjs"], queryFn: adjsApi.getAll });
}

export function useAdj(id) {
  return useQuery({
    queryKey: ["adj", id],
    queryFn: () => adjsApi.getOne(id),
    // only run if id exists
    enabled: !!id,
  });
}

// export function useDeleteAdj(id) {
// return useMutation
// }
