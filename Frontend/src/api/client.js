import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const tenant = JSON.parse(localStorage.getItem("tenant"));

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (tenant) {
    config.headers["x-tenant-id"] = tenant.id_tenant;
  }

  return config;
});

export default axiosClient;
