import type { Block } from "@/common/models/Block";
import type { Course } from "@/common/models/Course";
import type { Module } from "@/common/models/Module";
import { HttpService } from "@/modules/httpService/httpService";
import type { CourseDto, CreateCourseDto } from "shared";

class BlockService extends HttpService {

    async addBlock(module: Module): Promise<string> {
        return await this.authorizedReq(false).post('blocks/', { json: module }).json();
    }

    async updateBlockOrder(block: Block): Promise<void> {
        await this.authorizedReq(false).put(`blocks/${block.id}/order`, { json: { order: block.order } });
    }
}

export const blockService = new BlockService();