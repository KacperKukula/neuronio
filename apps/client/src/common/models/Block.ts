import type { ModuleType } from "../enums/courses/ModuleTypes";

export class Block {
    id?: number;
    order?: number;
    name?: string;
    data?: string;
    type?: ModuleType;
}