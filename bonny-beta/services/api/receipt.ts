import { ReceiptType } from "@/src/types/schema/receipt";
import axiosInstance from "../config/axiosConfig";

const RECEIPT_URL = "receipt";

// GET request
export const getReceipt = async (id: string): Promise<ReceiptType> => {
  try {
    const response = await axiosInstance.get<ReceiptType>(`${RECEIPT_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching receipt:", error);
    throw error;
  }
};

// MARK: - USER TRANSACTIONS

