import { UserType } from "@/src/types";
import axiosInstance from "../config/axiosConfig";

const USER_URL = "user";

// GET request
export const getUser = async (): Promise<UserType> => {
  try {
    const response = await axiosInstance.get<UserType>(`${USER_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
