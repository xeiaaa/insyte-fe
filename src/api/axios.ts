import axios from "axios";

const INSYTE_API_URL = import.meta.env.VITE_INSYTE_API_URL;

const getCookie = (cname: string) => {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const axiosClient = axios.create({
  baseURL: INSYTE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Clerk token before each request
axiosClient.interceptors.request.use(async (config) => {
  // TODO: how to get token the correct way from clerk
  const token = getCookie("__session");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
