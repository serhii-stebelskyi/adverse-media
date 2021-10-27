import axios from "axios";

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

export default instance;
