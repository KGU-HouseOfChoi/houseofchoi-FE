import axios from "axios";

const axiosAiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_API_URL,
  timeout: 5000,
});

export default axiosAiInstance;

export const axiosMainInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_API_URL,
  timeout: 5000,
  withCredentials: true,
});
