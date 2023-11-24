import LocalStorageService from "@/services/LocalStorageService";
import axios from "axios";

export const url = "http://localhost:3000/";

export const http = axios.create({
  baseURL: url,
  timeout: 10000,
  // headers: {
  //   "ngrok-skip-browser-warning": true,
  // },
  withCredentials: true,
});
export const httpAuth = axios.create({
  baseURL: url,
  timeout: 10000,
  // headers: {
  //   "ngrok-skip-browser-warning": true,
  // },
  withCredentials: true,
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
