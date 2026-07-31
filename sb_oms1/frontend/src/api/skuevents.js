import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const skueventsApi = {
  getAllInv: () => api.get("/api/skuevents/allinv").then((r) => r.data),
};
