import LocalStorageService from "@/services/LocalStorageService";
import axios from "axios";

export const url = "https://551d-2a03-32c0-3003-c5db-36a2-fbb-e2fd-127d.ngrok-free.app/";

export const http = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});
export const httpAuth = axios.create({
  baseURL: url,
  timeout: 1000,
});

httpAuth.interceptors.request.use(async function (config) {
  config.headers.Authorization =
    "Bearer " + (await LocalStorageService.getItem("TOKEN"));
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);
httpAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);
