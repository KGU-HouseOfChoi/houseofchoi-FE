import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const axiosMainInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_API_URL,
  timeout: 5000,
});

axiosMainInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosMainInstance;
