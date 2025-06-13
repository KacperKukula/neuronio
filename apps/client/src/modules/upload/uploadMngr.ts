import { courseService } from "@/services/courseService";
import { userService } from "@/services/userService";

export class UploadManager {

    static readonly API_URL = import.meta.env.VITE_API_URL;

    static pathToUrl(path: string): string {

        console.log(path)
        
        if (path.startsWith('http') || path.startsWith('http'))
            return path;

        if(path.startsWith('/')) return UploadManager.API_URL + path;
        else
            return UploadManager.API_URL + '/' + path;
    }

    static async uploadAvatar(file: File): Promise<string> {
        if (!file) throw new Error("No file provided for upload.");

        const formData = new FormData();
            formData.append("file", file);

        const srvPath = await userService.uploadAvatar(formData);
        return this.pathToUrl(srvPath);
    }

    static async uploadCourseBackground(file: File, courseId: number) {
        if (!file) throw new Error("No file provided for upload.");
        if (!courseId) throw new Error("No courseId provided.");

        const formData = new FormData();
            formData.append("file", file);

        const srvPath = await courseService.uploadBackground(formData, courseId.toString());

        return this.pathToUrl(srvPath);
    }
}