import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";


const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.userSlice)?.currentUser?.token;
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.userSlice)?.currentUser?.token;
console.log("TOKEN", JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.userSlice)?.currentUser?.user.isAdmin);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

