import { getFolders } from "@/services/folderService";
import { LoaderFunctionArgs } from "react-router-dom";

export const mainLoader = async ({ }: LoaderFunctionArgs) => {
    const folders = await getFolders()

    return {
        folders
    }
};
