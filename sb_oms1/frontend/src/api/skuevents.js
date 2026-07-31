import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const skueventsApi = {
  getAllInvSkus: () =>
    api.get("/api/skuevents/allinv-skus").then((r) => r.data),
  getAllInvAdjs: () =>
    api.get("/api/skuevents/allinv-adjs").then((r) => r.data),
};
