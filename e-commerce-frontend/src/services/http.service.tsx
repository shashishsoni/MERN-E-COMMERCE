import axiosInstance from "./axios";
import { T_SignInBody } from "../@types/Types";

export const getInventory = async () => {
     const response = await axiosInstance.get("/inventory");
     return response;
};

export const postLogin = async (body: T_SignInBody) => {
     const response = await axiosInstance.post("/Users/sign-in", body);
     return response;}