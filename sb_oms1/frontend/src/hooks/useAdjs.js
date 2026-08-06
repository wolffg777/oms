import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adjsApi } from "../api/adjs";

export function useCreateAdj() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adjsApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adjs"] }),
  });
}

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
