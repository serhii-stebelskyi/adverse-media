import axios from "axios";
import { roles } from "./data";

const userStr = localStorage.getItem("user");
const user = userStr ? JSON.parse(userStr) : {};
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    function (data, headers) {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        headers["Authorization"] = `Bearer ${access_token}`;
      }
      return JSON.stringify(data);
    },
  ],
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, type: roles.GUEST })
      );
      window.location.replace("/login");
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
