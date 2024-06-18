// axiosInstance.js
import _ from "axios";

const axios = _.create({
  baseURL: "http://localhost:5000"
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
