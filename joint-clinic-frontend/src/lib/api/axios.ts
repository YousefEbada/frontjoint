import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// api.interceptors.request.use((config): any => {
//     const token = localStorage.getItem("accessToken");
//     if(token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return token
// })

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {console.log("ERROR From the reponse interceptor:", error)}
// )

export default api;
