import LocalStorageService from "@/services/LocalStorageService";
import axios from "axios";

export const url = "https://4014-2-75-189-245.ngrok-free.app/api";

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
    return Promise.reject(error.message);
  }
);
httpAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error.message);
  }
);