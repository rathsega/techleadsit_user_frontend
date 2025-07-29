import axios from "axios";
import React from "react";

// Check if running in browser (Next.js runs on both server & client)
const isBrowser = typeof window !== "undefined";

// Create an Axios instance
const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120000
});

// Add a request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // //console.log("API Base URL:", process.env.NEXT_PUBLIC_API_URL);
    // //console.log("Request Config:", config);

    if (isBrowser) {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (config.data?.isFile) {
      const formData = new FormData();
      formData.append("folder", config.data.folder);
      formData.append("file", config.data.file);
      config.data = formData;
      config.headers["Content-Type"] = "multipart/form-data";
    }

    if (config.data?.type === "video") {
      config.responseType = "blob";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) {
      error.customMessage = data?.message || "Unauthorized access. Please login.";
    } else if (status === 404) {
      error.customMessage = data?.message || "Requested resource not found.";
    } else if (status === 409) {
      error.customMessage = data?.message || "User already exists or data conflict occurred.";
    } else if (status >= 500) {
      error.customMessage = "A server error occurred. Please try again later.";
    } else {
      error.customMessage = data?.message || "An unexpected error occurred.";
    }

    return Promise.reject(error);
  }
);


// Export helper methods
const httpService = {
  get: (url, config) => httpClient.get(url, config),
  post: (url, data, config) => httpClient.post(url, data, config),
  put: (url, data, config) => httpClient.put(url, data, config),
  delete: (url, config) => httpClient.delete(url, config),
};

export default httpService;
