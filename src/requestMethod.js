import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

var TOKEN = '';
if (localStorage.getItem("persist:root")) {
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.userSlice)?.currentUser?.token;
}
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: TOKEN },
});

