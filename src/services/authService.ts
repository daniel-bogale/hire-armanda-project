import axios from "axios";
import { AuthResponse } from "../types/api";
import { API_URL } from "@/config";
import { signUpFormInputs } from "@/routes/auth/register";
import { LoginFormInputs } from "@/routes/auth/login";
import { User } from "@/state";

const generateUsername = (firstName: string, lastName: string): string => {
  return `${firstName}${lastName}${Math.floor(Math.random() * 100000)}`;
};

export const register = async (userData: signUpFormInputs): Promise<User> => {
  const formattedData = {
    first_name: userData.firstName,
    last_name: userData.lastName,
    username: generateUsername(userData.firstName, userData.lastName),
    email: userData.email,
    password: userData.password,
  };

  try {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/api/users`,
      formattedData
    );
    console.log("response from user registration:", response);
    return response.data as unknown as User;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw new Error("Registration failed");
  }
};

export const login = async (
  credentials: LoginFormInputs
): Promise<AuthResponse> => {
  const loginData = new URLSearchParams({
    grant_type: "password",
    username: credentials.userName,
    password: credentials.password,
  });

  try {
    console.log("Logging in with credentials:", loginData.toString());
    const response = await axios.post<AuthResponse>(
      `${API_URL}/login`,
      loginData,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
};

export const logout = async (): Promise<string> => {
  try {
    const response = await axios.post<string>(`${API_URL}/logout`);
    return response.data; // Assuming the response is just a string message
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("Logout failed");
  }
};

export const forgetPassword = async (email: string): Promise<string> => {
  try {
    const response = await axios.post<string>(
      `${API_URL}/forget-password`,
      null,
      {
        params: { email },
      }
    );
    return response.data; // Assuming the response is just a string message
  } catch (error) {
    console.error("Forget password failed:", error);
    throw new Error("Forget password failed");
  }
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<string> => {
  try {
    const response = await axios.post<string>(
      `${API_URL}/reset-password`,
      null,
      {
        params: { token, new_password: newPassword },
      }
    );
    return response.data; // Assuming the response is just a string message
  } catch (error) {
    console.error("Reset password failed:", error);
    throw new Error("Reset password failed");
  }
};
