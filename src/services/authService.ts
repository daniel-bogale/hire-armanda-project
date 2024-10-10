// src/services/authService.ts
import axios from "axios";
import { UserData, Credentials } from "../types/auth";
import { AuthResponse, ImageUploadResponse, Image } from "../types/api";

const API_URL = "http://localhost:8000"; // Adjust this to your backend's URL

// Register a new user
export const register = async (userData: UserData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/register`,
    userData
  );
  return response.data;
};

// Login a user
export const login = async (
  credentials: Credentials
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/login`,
    credentials
  );
  return response.data;
};

// Upload an image
export const uploadImage = async (
  imageData: FormData,
  token: string
): Promise<ImageUploadResponse> => {
  const response = await axios.post<ImageUploadResponse>(
    `${API_URL}/images/upload`,
    imageData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Fetch all images for the logged-in user
export const fetchImages = async (token: string): Promise<Image[]> => {
  const response = await axios.get<Image[]>(`${API_URL}/images`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
