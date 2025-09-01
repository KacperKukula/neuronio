import type { Component } from "vue";

export class Background {
    name: string;
    component: Component;

    thumbnailPath?: string;

    constructor(name: string, component: Component) {
        this.name = name;
        this.component = component;
    }

    setThumbnail(tnPath: string) {
        this.thumbnailPath = tnPath;
    }
}