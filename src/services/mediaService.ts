import { AuthResponse, ImageUploadResponse, Image } from "../types/api";

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
