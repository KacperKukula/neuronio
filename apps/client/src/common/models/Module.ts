import type { ModuleType } from "@/common/enums/courses/ModuleTypes";
import type { Course } from "./Course";

export class Module {
    id?: number
    order?: number;
    name?: string;
    type: ModuleType;
    data?: object;

    course?: number|string;

    constructor(type: ModuleType) {
        this.type = type;
    }
}