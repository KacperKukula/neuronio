import { ModuleType } from "@/common/enums/courses/ModuleTypes";
import { useI18n } from "vue-i18n";

// const { t } = useI18n()

export class ModuleProfile {
    label?: string;
    image?: string;

    constructor(label?: string, image?: string) {
        this.label = label;
        this.image = image;
    }
}

export const ModulesMap = new Map<string, ModuleProfile>([
    [ModuleType.TEXT, new ModuleProfile(
        'Text Module',  '/mods/text-miniature.png'
    )],
    [ModuleType.VIDEO, new ModuleProfile(
        'Video Module',  '/mods/video-miniature.png'
    )],
    [ModuleType.DEFINITIONS, new ModuleProfile(
        'blocks.definitions',  '/mods/text-miniature.png'
    )],
    // ['aaaaa', new ModuleProfile(
    //     'Video Module',  '/mods/video-miniature.png'
    // )],
    // ['aegaegaeaegea', new ModuleProfile(
    //     'Text Module',  '/mods/text-miniature.png'
    // )],
    // ['aegaegae', new ModuleProfile(
    //     'Video Module',  '/mods/video-miniature.png'
    // )],
    // ['srhsrhsrjh', new ModuleProfile(
    //     'Video Module',  '/mods/video-miniature.png'
    // )],
    // // [ModuleType.VIDEO, new ModuleProfile()],
]);

export const blocksArray = Array.from(ModulesMap.entries())
    .map(([type, profile]) => ({ type, ...profile }))