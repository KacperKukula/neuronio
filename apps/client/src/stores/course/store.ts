import { defineStore } from 'pinia'
import { CourseMode } from './mode'
import { courseService } from '@/services/courseService'
import type { Course } from '@/common/models/Course'

const COURSESTORE_NAME = 'courseStore'

export const useCourseStore = defineStore(COURSESTORE_NAME, {
    state: () => ({
        /* Current user courses map <id, Course> */
        courses: new Map<number, Course>(),
        /* Current course witch is selected */
        selectedCourse: null as object | null,
        /* Mode of current course */
        mode: CourseMode.VIEW as CourseMode,
    }),
    actions: {
        editAction() {
            this.mode = CourseMode.EDIT
        },
        viewAction() {
            this.mode = CourseMode.VIEW
        },
        async retriveCourses() {
            if (this.courses.size !== 0)
                return Array.from(this.courses.values());
            
            const coursesArr = await courseService.getUserCourses()
            this.courses = new Map(coursesArr.map(course => [course.id, course]));

            return this.courses;
        },
        async retriveCourse(courseId: number) {
            if(this.courses.has(courseId)) return this.courses.get(courseId);

            const course = courseService.getCourse(courseId);
            this.courses.set(courseId, course);
        }
    },
    getters: {
        getSelectedCourse(state) {
            return state.selectedCourse;
        }
    },
})