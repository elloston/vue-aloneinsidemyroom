/**
 * /src/api/index.ts
 */

import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_LARAVEL_URL}/api/`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

await api.get(`${import.meta.env.VITE_LARAVEL_URL}/sanctum/csrf-cookie`);

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();

    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
);

export default api;
