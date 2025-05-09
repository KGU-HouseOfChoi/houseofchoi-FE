import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const axiosAiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_API_URL,
  timeout: 5000,
});

axiosAiInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  console.log("✅ axiosAiInstance 토큰:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosAiInstance;
