import { userService } from "@/services/userService";

export class UploadManager {

    static readonly API_URL = import.meta.env.VITE_API_URL;

    static async uploadAvatar(file: File): Promise<string> {

        if (!file)
            throw new Error("No file provided for upload.");

        const formData = new FormData();
            formData.append("file", file);

        const srvPath = await userService.uploadAvatar(formData);

        return UploadManager.API_URL + srvPath;
    }
}