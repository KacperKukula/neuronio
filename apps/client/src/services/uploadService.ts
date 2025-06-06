import { HttpService } from "@/modules/httpService/httpService";
import type { CourseDto, CreateCourseDto } from "shared";

class UploadService extends HttpService {

    async uploadAvatar(file: File) {
        return await this.fileUploadReq(false).post('courses/create', { body: file }).json();
    }
}

export const uploadService = new UploadService();