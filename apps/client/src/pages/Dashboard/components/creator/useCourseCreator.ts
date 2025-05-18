import type { ModuleType } from "@/common/enums/courses/ModuleTypes";
import type { Course } from "@/common/models/Course";
import { Module } from "@/common/models/courses/Module";
import { courseService } from "@/services/courseService";

export function useCourseCreator() {

    function copyCourse() {
        console.log('Creating course...');
    }

    function createModule(type: ModuleType, course: Course): Module {
        return new Module(type, course)
    }

    async function sendModule(module: Module) {
        return await courseService.createModule(module)
    }

    return {
        createModule,
        copyCourse,
        sendModule
    }
}