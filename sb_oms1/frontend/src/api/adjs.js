import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const adjsApi = {
  create: (data) => api.post("/api/adjs", data).then((r) => r.data),
  getAll: () => api.get("/api/adjs").then((r) => r.data),
  getOne: (id) => api.get(`/api/adjs/${id}`).then((r) => r.data),
  delete: (id) => api.delete(`/api/adjs/${id}`).then((r) => r.data),
};
