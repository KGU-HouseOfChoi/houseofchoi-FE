import axios from "axios";

const axiosMainInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_API_URL,
  timeout: 5000,
  withCredentials: true,
});

export default axiosMainInstance;
