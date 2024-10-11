import axios from "axios";

const API_BASE_URL = "/api/photos";

export interface Photo {
  name: string;
  tags?: string;
  description?: string;
  url: string;
  id: number;
  user_id: number;
  folder_id: number;
  created_at: string;
  updated_at: string;
}

// Create Photo
export const createPhoto = async (
  name: string,
  folder_id: number,
  file: File
): Promise<Photo> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("folder_id", folder_id.toString());
  formData.append("file", file);

  try {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error creating photo: ${error}`);
  }
};

// Get Photos
export const getPhotos = async (
  skip: number = 0,
  limit: number = 10
): Promise<Photo[]> => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: { skip, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching photos: ${error}`);
  }
};

// Get Photo by ID
export const getPhotoById = async (photo_id: number): Promise<Photo> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${photo_id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching photo by ID: ${error}`);
  }
};

// Delete Photo by ID
export const deletePhoto = async (photo_id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${photo_id}`);
  } catch (error) {
    throw new Error(`Error deleting photo: ${error}`);
  }
};

// Get Photos by Folder ID
export const getPhotosByFolder = async (
  folder_id: number,
  skip: number = 0,
  limit: number = 10
): Promise<Photo[]> => {
  try {
    const response = await axios.get(`/api/folders/${folder_id}/photos`, {
      params: { skip, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching photos by folder ID: ${error}`);
  }
};
