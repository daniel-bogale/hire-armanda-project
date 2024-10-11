import { getFolders } from "@/services/folderService";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

export const mainLoader = async ({ request }: LoaderFunctionArgs) => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    const currentUser = parsedUser;

    const url = new URL(request.url);

    if (!currentUser) {
        return redirect(
            `/login?redirect_back=${encodeURIComponent(url.pathname + url.search)}`,
        );
    }

    const folders = await getFolders()
    return {
        folders
    }
};
