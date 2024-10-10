// src/types/api.ts
export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
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
