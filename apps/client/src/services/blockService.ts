import type { Course } from "@/common/models/Course";
import type { Module } from "@/common/models/Module";
import { HttpService } from "@/modules/httpService/httpService";
import type { CourseDto, CreateCourseDto } from "shared";

class BlockService extends HttpService {

    async addBlock(module: Module): Promise<string> {
        return await this.authorizedReq(false).post('blocks/', { json: module }).json();
    }
}

export const blockService = new BlockService();