import type { CreateCourseDto } from "shared";
import { beApiClient } from "./abstract/beApiClient";
import { CourseDto } from "shared"
import ky from "ky";

export class courseApi extends beApiClient {

    // static createCourse(course: CreateCourseDto): Promise<Course> {
    //     return ky.post( this.apiUrl + 'courses', { json: course }).json();
    // }
    static async createCourse(course: CreateCourseDto): Promise<string> {
        return await ky.post(this.apiUrl + 'courses/create', { json: course });
    }

    static async getCourses(): Promise<string> {
        return await ky.get(this.apiUrl + 'courses');
    }

    static async getUserCourses(userId: number): Promise<CourseDto[]> {
        const options = { searchParams: { id: userId } };

        return await ky.get(this.apiUrl + 'courses/userCourses', options).json<CourseDto[]>();
    }
}