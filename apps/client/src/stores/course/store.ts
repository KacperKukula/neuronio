import { defineStore } from 'pinia'
import { CourseMode } from './mode'
import { courseService } from '@/services/courseService'
import type { Course } from '@/common/models/Course'

const COURSESTORE_NAME = 'courseStore'

export const useCourseStore = defineStore(COURSESTORE_NAME, {
    state: () => ({
        /* Current user courses */
        courses: [] as object[],
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
            if (this.courses.length === 0)
                this.courses = courseService.getUserCourses()
            return this.courses
        },
        setSelectedCourse(course: object) {
            this.selectedCourse = course;
        }
    },
    getters: {
        getSelectedCourse(state) {
            return state.selectedCourse;
        }
    },
})