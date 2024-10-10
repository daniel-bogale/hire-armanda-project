import axios from "axios";
import { AuthResponse } from "../types/api";
import { API_URL } from "@/config";
import { signUpFormInputs } from "@/routes/auth/register";
import { fromInputs } from "@/routes/auth/forgot-password";

export const register = async (
  userData: signUpFormInputs
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/register`,
    userData
  );
  return response.data;
};

export const login = async (credentials: fromInputs): Promise<AuthResponse> => {
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
