import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = "https://server-up.sintecha.site";
// export const BASE_URL = "http://localhost:8000";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm token vào header mỗi lần request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Bắt lỗi token hết hạn
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/"; // redirect về login
    }
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error?.response.data.error);
    }
    return Promise.reject(error);
  }
);

const handleError = (error) => {
  console.error("API Error:", error);
  throw error;
};

const request = {
  get: async (url, params = {}, config = {}) => {
    try {
      const res = await instance.get(url, { params, ...config });
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const res = await instance.post(url, data, config);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const res = await instance.put(url, data, config);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (url, config = {}) => {
    try {
      const res = await instance.delete(url, config);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  // SSG + ISR
  getWithRevalidate: async (url: string, revalidate: number) => {
    try {
      const res = await fetch(`${BASE_URL}${url}`, {
        next: { revalidate },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage?.getItem("token") || ""}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
        const err = await res.json();
        toast.error(err.error || "Có lỗi xảy ra");
        throw new Error(err.error || "Request failed");
      }

      return res.json();
    } catch (error) {
      handleError(error);
    }
  },
};

export default request;
