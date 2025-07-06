import type { Block } from "@/common/models/Block";
import type { Course } from "@/common/models/Course";
import type { Module } from "@/common/models/Module";
import { HttpService } from "@/modules/httpService/httpService";
import type { User } from "@/stores/userStore/model/User";
import type { CourseDto, CreateCourseDto } from "shared";

class ParticipantsService extends HttpService {
    async getParticipants(courseId: number): Promise<User[]> {
        return await this.authorizedReq(true).get(`courses/participants/${courseId}`).json<User[]>()
    }

    async addParticipant(courseId: number, userId: number) {
        return await this.authorizedReq(true).put(`courses/participants/${courseId}`, { json: { userId } })
    }

    async removeParticipant(courseId: number, userId: number) {
        return await this.authorizedReq(true).delete(`courses/participants/${courseId}`, { json: { userId } })
    }
}

export const participantsService = new ParticipantsService();