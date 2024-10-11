import axios from "axios";
import { API_URL } from "@/config";

// User types
interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface UserResponse extends User {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
}

const handleApiError = (error: any, action: string) => {
  console.error(
    `Error during ${action}:`,
    error?.response?.data || error.message
  );
  throw new Error(`${action} failed`);
};

export const updateUser = async (
  userId: number,
  userData: User
): Promise<UserResponse> => {
  try {
    const response = await axios.put<UserResponse>(
      `${API_URL}/api/users/${userId}`,
      userData
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "updating user");
    return Promise.reject(undefined);
  }
};

export const deleteUser = async (userId: number): Promise<UserResponse> => {
  try {
    const response = await axios.delete<UserResponse>(
      `${API_URL}/api/users/${userId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "deleting user");
    return Promise.reject(undefined);
  }
};
