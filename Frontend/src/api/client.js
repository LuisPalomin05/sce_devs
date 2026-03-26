import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const empresa = JSON.parse(localStorage.getItem("empresa"));

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (empresa) {
    config.headers["x-empresa-id"] = empresa.id_empresa;
  }

  return config;
});

export default axiosClient;