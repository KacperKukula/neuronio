import { courseService } from "@/services/courseService";
import { useUserStore } from "@/stores/userStore/UserStore";
import { Utils } from "@/utils";
import { CreateCourseDto } from "shared";

export function useCreateCourseForm() {

    const userStore = useUserStore();
    
    function createCourseForm(name: string, description: string, participants: any[]) {

        const courseDto = new CreateCourseDto();
        courseDto.name = name;
        courseDto.description = description
        courseDto.owner = 1
        
        courseDto.participants = participants.map((p) => p.id)

        return courseDto;
    }

    async function sendForm(courseDto: CreateCourseDto) {

        return await Utils.catchError( courseService.createCourse(courseDto) );
    }

    return {
        createCourseForm,
        sendForm
    }
}