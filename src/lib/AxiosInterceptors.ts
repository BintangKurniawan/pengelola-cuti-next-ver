import axios from "axios";
import { redirect } from "next/navigation";
const api = axios.create({
  baseURL: "https://197.162.100.2:8080/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function refreshToken() {
  try {
    const newToken = await api.get("/auth/refresh", { withCredentials: true });

    localStorage.setItem("token", newToken.data.data.accessToken);
    return newToken.data.data.accessToken;
  } catch (error) {
    console.error("Token refresh invalid");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    redirect("/");
    throw error;
  }
}
let isRefreshing = false;
let refreshPromise: Promise<unknown> | null = null;

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 408 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newAccessToken = await refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        if (!refreshPromise) {
          refreshPromise = new Promise((resolve) => {
            setTimeout(() => {
              resolve(api(originalRequest));
            }, 1000);
          }).finally(() => {
            refreshPromise = null;
          });
        }

        return refreshPromise;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
