import { User } from "@/state";

// src/types/api.ts
export interface AuthResponse {
  token: {
    access_token: string;
    token_type: string;
  };
  user: User;
}

export interface ImageUploadResponse {
  success: boolean;
  message: string;
  imageUrl: string;
}

export interface Image {
  id: number;
  filename: string;
  uploadDate: string;
  imageUrl: string;
}
