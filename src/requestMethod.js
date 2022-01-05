import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";


const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGI3MmVkNjY4MDE0ZWFkODY4MmJmMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNzkxNDYxNSwiZXhwIjoxNjM4MTczODE1fQ.10KViBtp410yGZP6cmh9AlG1DUF_tryZYReAmFnhAec';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// const setAuthToken = token => {
//     if (token) {
//         axios.defaults.headers.common['x-auth-token'] = token;
//     } else {
//         delete axios.defaults.headers.common['x-auth-token'];
//     }
// };
// setAuthToken(TOKEN);
export const userRequest = axios.create({
  baseURL: BASE_URL,
});

