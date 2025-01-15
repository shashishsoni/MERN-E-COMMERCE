import axiosInstance from "./axios";
import { T_SignInBody, T_SignUpBody } from "../@types/Types";

const API_URL = "https://mern-e-commerce-ct2v.onrender.com"; // Set your backend URL

export const getInventory = async () => {
     const response = await axiosInstance.get(`${API_URL}/inventory`); // Use the backend URL
     return response;
};

export const postLogin = async (body: T_SignInBody) => {
     const response = await axiosInstance.post(`${API_URL}/Users/sign-in`, body); // Use the backend URL
     return response;}

export const SearchInventory = async (keyword: string) => {
     const response = await axiosInstance.get(`${API_URL}/inventory/Search/${keyword}`); // Use the backend URL
     return response;}

export const PostSignUp = async (body: T_SignUpBody) => {
     const response = await axiosInstance.post(`${API_URL}/Users/sign-up`, body); // Use the backend URL
     return response;
}