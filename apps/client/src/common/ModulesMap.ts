import { ModuleType } from "@/common/enums/courses/ModuleTypes";

export class ModuleProfile {
    label?: string;
    image?: string;

    constructor(label?: string, image?: string) {
        this.label = label;
        this.image = image;
    }
}

export const ModulesMap = new Map<ModuleType, ModuleProfile>([
    [ModuleType.TEXT, new ModuleProfile(
        'Text Module',  '/mods/text-miniature.png'
    )],
    // [ModuleType.PHOTO, new ModuleProfile()],
    // [ModuleType.VIDEO, new ModuleProfile()],
]);

export const modulesArray = Array.from(ModulesMap.entries()).map(([type, profile]) => ({
    type, ...profile
}))