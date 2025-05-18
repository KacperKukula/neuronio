import type { ModuleType } from "@/common/enums/courses/ModuleTypes";
import type { Course } from "../Course";

export class Module {
    id?: number
    order?: number = 1;
    name?: string;
    type: ModuleType;

    course?: Course

    constructor(type: ModuleType, course: Course) {
        this.type = type; 
        this.course = course;
    }
}