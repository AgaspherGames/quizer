import LocalStorageService from "@/services/LocalStorageService";
import axios from "axios";

export const url = "https://apiquizmaster.swedencentral.cloudapp.azure.com/";

export const http = axios.create({
  baseURL: url,
  timeout: 10000,
  withCredentials: true,
});
export const httpAuth = axios.create({
  baseURL: url,
  timeout: 10000,
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
