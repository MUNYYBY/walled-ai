import baseUrl, { aiUrl } from "@/utils/baseUrl";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/`, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
    const userInfo: any = localStorage.getItem("userInfo");
    const token = JSON.parse(userInfo)?.access_token;
      if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
