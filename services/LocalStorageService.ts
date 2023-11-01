type keys = "TOKEN" | "USERNAME";

function setItem<T extends string | object>(key: keys, value: T) {
  if (typeof window === "undefined") return;

  if (typeof value == "object") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
}
function removeItem(key: keys) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}
function getItem<T extends string | object>(key: keys): T {
  if (typeof window === "undefined") return "" as T;

  const item = localStorage.getItem(key);
  
  try {
    return JSON.parse(item || "") as T;
  } catch (error) {
    return (item || "") as T;
  }
}

export default {
  setItem,
  getItem,
  removeItem,
};