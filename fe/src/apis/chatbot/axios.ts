import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_API_URL,
  
});

export default axiosInstance;