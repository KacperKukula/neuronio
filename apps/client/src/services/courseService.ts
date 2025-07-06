import type { Block } from "@/common/models/Block";
import type { Course } from "@/common/models/Course";
import type { Module } from "@/common/models/Module";
import { HttpService } from "@/modules/httpService/httpService";
import type { User } from "@/stores/userStore/model/User";
import type { CourseDto, CreateCourseDto } from "shared";

class CourseService extends HttpService {

    async createCourse(course: CreateCourseDto): Promise<string> {
        return await this.authorizedReq(false).post('courses/create', { json: course }).json();
    }

    async searchForUsers(searchPhrase: string): Promise<string> {
        return await this.authorizedReq(false).post('users/searchForUsers', { json: { search: searchPhrase } }).json();
    }

    async getUserCourses(): Promise<CourseDto[]> {
        return await this.authorizedReq(false).get('courses/userCourses').json();
    }

    async getCourse(id: number): Promise<Course> {
        return await this.authorizedReq(true).get(`courses/get/${id}`).json<Course>();
    }

    async getCourseBlocks(id: number): Promise<Block[]> {
        return await this.authorizedReq(true).get(`courses/blocks/${id}`).json<Block[]>()
    }

    /* UPLOAD */
    async uploadBackground(formData: FormData, courseId: string): Promise<string> {
        return await this.authorizedReq(true).post(`courses/upload?courseId=${courseId}`, { body: formData }).text();
    }
}

export const courseService = new CourseService();