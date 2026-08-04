import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skusApi } from "../api/skus";

export function useCreateSku() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: skusApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skus"] }),
  });
}

export function useSkus() {
  return useQuery({ queryKey: ["skus"], queryFn: skusApi.getAll });
}

export function useSku(id) {
  return useQuery({
    queryKey: ["sku", id],
    queryFn: () => skusApi.getOne(id),
    // only run if id exists
    enabled: !!id,
  });
}

// export function useDeleteSku(id) {
// return useMutation
// }
