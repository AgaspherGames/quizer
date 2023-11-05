import { url } from "./http";

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const getFileLink = (file: string | undefined): string => {
  return file ? `${url}public/${file}` : "/images/_default.png";
};
