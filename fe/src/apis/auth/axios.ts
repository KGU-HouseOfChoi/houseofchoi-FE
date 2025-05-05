import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  const isAuthApi = config.url?.startsWith("/v1/auth/");
  if (token && !isAuthApi) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
