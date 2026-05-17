import axios from "axios";

// Set the base URL for all requests
const api = axios.create({
  baseURL: "http://192.168.2.47:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
