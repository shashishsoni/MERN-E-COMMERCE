import axios from "axios";

const axiosInstance = axios.create({
     baseURL: "http://localhost:8000",
});


axiosInstance.interceptors.request.use(
     (config) => {
          const routerRequringAuth = [
               "/orders/get-user-order-by-id", 
               "/orders/get-user-order",
               "/orders/get-user-order",
               "/address/get-user-address",
               "/address/create-user-address",
               "/address//update-address/:id"
          ];

          if(routerRequringAuth.some((route) => config.url.includes(route))) {
               const token = localStorage.getItem("token");
               
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