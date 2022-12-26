import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json"
  }
});

api.interceptors.response.use(
  function (response) {
    return {
      statusCode: response.status,
      data: response.data,
      status : true
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
