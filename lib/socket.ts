import { url } from "@/utils/http";
import { io } from "Socket.IO-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = url + "results";

export const socket = io(URL, {
  transports: ["polling"],
});
