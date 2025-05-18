import type { Module } from "@/common/models/courses/Module";
import { HttpService } from "@/modules/httpService/httpService";
import type { CourseDto, CreateCourseDto } from "shared";

class CourseService extends HttpService {

    async createCourse(course: CreateCourseDto): Promise<string> {
        return await this.authorizedReq(false).post('courses/create', { json: course }).json();
    }

    async searchForUsers(searchPhrase: string): Promise<string> {
        return await this.authorizedReq(false).post('users/searchForUsers', { json: { search: searchPhrase } }).json();
    }

    async getUserCourses(): Promise<CourseDto[]> {
        return await this.authorizedReq(false).get('courses/userCourses').json<CourseDto[]>();
    }

    // Modules
    async createModule(module: Module): Promise<string> {
        return await this.authorizedReq(false).post('courses/module', { json: module }).json();
    }
}

export const courseService = new CourseService();