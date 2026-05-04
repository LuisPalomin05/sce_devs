import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const tenantRaw = localStorage.getItem("tenant");
  const tenant = tenantRaw ? JSON.parse(tenantRaw) : null;

  if (tenant?.id_tenant) {

  }

  return config;
});

export default axiosClient;
