import type { EnumUserRole } from "@/common/enums/EnumUserRolels";

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

    /* Show in menu navbar */
    showInMenu?: boolean;

    minRole?: EnumUserRole;

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
        this.showInMenu = params.showInMenu ?? true;
        this.minRole = params.minRole;
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
    showInMenu?: boolean;
    minRole?: EnumUserRole;
}