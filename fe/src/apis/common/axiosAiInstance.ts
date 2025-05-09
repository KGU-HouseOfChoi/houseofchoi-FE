import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const axiosAiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_API_URL,
});

axiosAiInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosAiInstance;
