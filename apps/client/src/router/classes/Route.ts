export class Route {
    path: string;
    name: string;
    component: any;
    children?: Route[] | null = null;
    beforeEnter?: (to: any, from: any, next: any) => void;

    label?: string;
    icon?: string;
    badge?: string;

    /* Pointer to childrens - Prime Vue syntax for navbar */
    items?: Route[] | null = this.children;

    constructor(params: RouteParams) {
        this.path = params.path;
        this.name = params.name;
        this.component = params.component;
        this.children = params.children || null;
        this.beforeEnter = params.beforeEnter;

        this.label = params.label;
        this.icon = params.icon;
        this.badge = params.badge;
        
        this.items = this.children;
    }    
}

interface RouteParams {
    path: string;
    name: string;
    component: any;
    children?: Route[];
    beforeEnter?: (to: any, from: any, next: any) => void;
    label?: string;
    icon?: string;
    badge?: string;
}