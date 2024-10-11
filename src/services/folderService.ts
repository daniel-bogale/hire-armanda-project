import axios from "axios";
import { API_URL } from "@/config";

interface Folder {
  name: string;
  description: string;
  folder_id: number;
}

export interface FolderResponse extends Folder {
  id: number;
  user_id: number;
  sub_folders: Folder[];
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

export const createFolder = async (
  folderData: Folder
): Promise<FolderResponse> => {
  try {
    const response = await axios.post<FolderResponse>(
      `${API_URL}/api/folders`,
      folderData
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "folder creation");
    return Promise.reject(undefined);
  }
};

export const getFolders = async (
  skip = 0,
  limit = 100
): Promise<FolderResponse[]> => {
  try {
    const response = await axios.get<FolderResponse[]>(
      `${API_URL}/api/folders`,
      {
        params: { skip, limit },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "retrieving folders");
    return Promise.reject(undefined);
  }
};

export const getFolderById = async (
  folderId: number
): Promise<FolderResponse> => {
  try {
    const response = await axios.get<FolderResponse>(
      `${API_URL}/api/folders/${folderId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "retrieving folder");
    return Promise.reject(undefined);
  }
};

export const updateFolder = async (
  folderId: number,
  folderData: Folder
): Promise<FolderResponse> => {
  try {
    const response = await axios.put<FolderResponse>(
      `${API_URL}/api/folders/${folderId}`,
      folderData
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "updating folder");
    return Promise.reject(undefined);
  }
};

export const deleteFolder = async (folderId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/api/folders/${folderId}`);
    return;
  } catch (error) {
    handleApiError(error, "deleting folder");
    return Promise.reject(undefined);
  }
};
