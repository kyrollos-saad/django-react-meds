import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

API.interceptors.request.use((config) => {
  // add token to the header of all requests if it is available
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

API.interceptors.response.use(
  // intercepting all responses to handle the 403 case where the token is rejected by the backend -> redirect to /login
  (response) => {
    return response;
  },
  (error) => {
    try {
      if (
        error.response.status === 403 &&
        error.response.data.detail === "token authenticaiton failed"
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }
    } catch (err) {}
    return Promise.reject(error);
  },
);

export default API;
