import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/auth"
});

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);