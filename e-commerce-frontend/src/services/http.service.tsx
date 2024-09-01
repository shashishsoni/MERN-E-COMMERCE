import axiosInstance from "./axios";

export const getAllItems = async () => {
     const response = await axiosInstance.get("/inventory");
     return response;
};

