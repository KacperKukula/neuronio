import { ModuleType } from '@/common/enums/courses/ModuleTypes';

export class CourseModulesEntries {
    [ModuleType.TEXT] = {
        name: 'Tekst'
    };
    [ModuleType.PHOTO] = {
        name: 'Zdjęcie'
    };
    [ModuleType.VIDEO] = {
        name: 'Wideo'
    };
}

export const courseModulesEntriesArr = Object.entries(new CourseModulesEntries()).map(([key, value]) => ({
    key, value
}));