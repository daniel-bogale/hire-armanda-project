import axios from "axios";
import { UserData, Credentials } from "../types/auth";
import { AuthResponse } from "../types/api";
import { API_URL } from "@/config";

export const register = async (userData: UserData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/register`,
    userData
  );
  return response.data;
};

export const login = async (
  credentials: Credentials
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/login`,
    credentials
  );
  return response.data;
};

export const logout = async () => {
  await axios.post(`${API_URL}/auth/logout`);
};

export const deleteAccount = async () => {
  await axios.post(`${API_URL}/auth/delete`);
};
