import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? "https://mern-e-commerce-ct2v.onrender.com" 
        : "http://localhost:8000",
});

axiosInstance.interceptors.request.use(
     (config) => {
          const routerRequringAuth = [
               "/orders/get-user-order-by-id", 
               "/orders/get-user-order",
               "/orders/get-user-order",
               "/address/get-user-address",
               "/address/create-user-address",
               "/address//update-address/:id",
               "/inventory/Search",
          ];

          if(routerRequringAuth.some((route) => config.url?.includes(route))) {
               const token = localStorage.getItem("accessToken");
               
               if(token) {
                    config.headers.Authorization = `Bearer ${token}`;
               }     
          }
          return config;
     },
     (error) => {
          return Promise.reject(error);
     }
);

export default axiosInstance;