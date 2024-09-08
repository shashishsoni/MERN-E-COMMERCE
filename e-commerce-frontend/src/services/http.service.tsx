import axiosInstance from "./axios";
import { T_SignInBody, T_SignUpBody } from "../@types/Types";

export const getInventory = async () => {
     const response = await axiosInstance.get("/inventory");
     return response;
};

export const postLogin = async (body: T_SignInBody) => {
     const response = await axiosInstance.post("/Users/sign-in", body);
     return response;}

export const SearchInventory = async (keyword: string) => {
     const response = await axiosInstance.get(`/inventory/Search/${keyword}`);
     return response;}

export const PostSignUp = async (body: T_SignUpBody) => {
     const response = await axiosInstance.post("/Users/sign-up", body);
     return response;
}