import CookieService from "@/services/CookieService";
import LocalStorageService from "@/services/LocalStorageService";
import axios, { Axios, isAxiosError } from "axios";

export const url = "https://apiquizmaster.swedencentral.cloudapp.azure.com/";

export const http = axios.create({
  baseURL: url,
  timeout: 10000,
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    if (isAxiosError(error) && error.response?.status == 401) {
      CookieService.deleteAuthCookie()
    }
    return Promise.reject(error);
  }
);
