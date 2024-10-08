import { LevelType } from "@/src/types/schema/levels";
import axiosInstance from "../config/axiosConfig";

const LEVEL_URL = "level";

// GET request
export const getLevels = async (): Promise<LevelType[]> => {
  try {
    const response = await axiosInstance.get<LevelType[]>(`${LEVEL_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching level:", error);
    throw error;
  }
};

// MARK: - USER TRANSACTIONS

