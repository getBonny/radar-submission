import { TransactionType } from "@/src/types/schema/transaction";
import axiosInstance from "../config/axiosConfig";

const TRANSACTION_USER_URL = "transaction/user";
const TRANSACTION_URL = "transaction";

// GET request
export const getTransaction = async (id: string): Promise<TransactionType> => {
  try {
    const response = await axiosInstance.get<TransactionType>(`${TRANSACTION_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error;
  }
};

// MARK: - USER TRANSACTIONS

// GET request
export const getUserTransactions = async (): Promise<TransactionType[]> => {
    console.log("Fetching user transactions");
  try {
    const response = await axiosInstance.get<TransactionType[]>(TRANSACTION_USER_URL);
    console.log("User transactions:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    throw error;
  }
};
