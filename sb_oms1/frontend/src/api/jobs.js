import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const jobsApi = {
  getAll: () => api.get("/api/jobs").then((r) => r.data),
  getOne: (id) => api.get(`/api/jobs/${id}`).then((r) => r.data),
};
