import type { CreateCourseDto } from "shared";
import { beApiClient } from "./abstract/beApiClient";
import ky from "ky";

export class courseApi extends beApiClient {

    // static createCourse(course: CreateCourseDto): Promise<Course> {
    //     return ky.post( this.apiUrl + 'courses', { json: course }).json();
    // }
    static async createCourse(course: CreateCourseDto): Promise<string> {
        return await ky.post(this.apiUrl + 'courses', { json: course });
    }

    static async getCourses(): Promise<string> {
        return await ky.get(this.apiUrl + 'courses');
    }
}