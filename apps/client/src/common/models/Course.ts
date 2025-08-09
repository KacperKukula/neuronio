import type { Module } from "./Module";

export class Course {
    id: number
    name!: string;
    description!: string;
    modules?: Module[];

    background?: string;
    
    constructor(id: number, modules: Module[] = [], ) {
        this.id = id;
        this.modules = modules;
    }
}