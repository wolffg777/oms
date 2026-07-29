import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsApi } from "../api/jobs";

export function useJobs() {
  return useQuery({ queryKey: ["jobs"], queryFn: jobsApi.getAll });
}

export function useJob(id) {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => jobsApi.getOne(id),
    // only run if id exists
    enabled: !!id,
  });
}
