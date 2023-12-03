import { io } from "Socket.IO-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:3000/results";

export const socket = io(URL, {
  transports: ["polling"],
});
