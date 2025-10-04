import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5551/api", // ✅ backend port
});

export default API;
