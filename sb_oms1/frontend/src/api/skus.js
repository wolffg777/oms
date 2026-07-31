import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const skusApi = {
  create: (data) => api.post("/api/skus", data).then((r) => r.data),
  getAll: () => api.get("/api/skus").then((r) => r.data),
  getOne: (id) => api.get(`/api/skus/${id}`).then((r) => r.data),
  delete: (id) => api.delete(`/api/skus/${id}`).then((r) => r.data),
};
