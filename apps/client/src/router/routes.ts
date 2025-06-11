import { Route } from './classes/Route';
import { requireAuth } from '@/router/guards';

import { globalRoutes } from './routes/globalRoutes';
import CommonPathsConst from './CommonPathsConst';
import { EnumUserRole } from '@/common/enums/EnumUserRolels';

export const routes = [

    /* Global routes such as Login, Dashboard */
    ...globalRoutes.map(route => {
        route.showInMenu = false; // Hide global routes from the main menu,

        return route;
    }),

    /* SALES PAGES */
    new Route({
        path: '/',
        label: 'Home',
        showInMenu: true,
        name: CommonPathsConst.HOME,
        component: () => import('@/pages/SalesPages/Home/Home.vue'),
    }),
    new Route({
        label: 'About',
        name: 'about',
        path: '/about',
        showInMenu: true,
        component: () => import('@/pages/SalesPages/About/About.vue'),
    }),

    /* SHARED */
    new Route({
        label: 'Dashboard',
        name: 'dashboard',
        path: '/dashboard',
        icon: 'pi pi-palette',
        minRole: EnumUserRole.STUDENT,
        component: () => import('@/pages/Dashboard/Dashboard.vue'),
        beforeEnter: requireAuth,
    }),
    new Route({
        name: 'profile',
        path: '/profile',
        component: () => import('@/pages/User/Profile.vue'),
        beforeEnter: requireAuth,
    }),

    /* COURSES */
    new Route({
        label: 'Courses',
        name: 'courses',
        path: '/courses',
        showInMenu: true,
        minRole: EnumUserRole.STUDENT,
        component: () => import("@/pages/Courses/Courses.vue"),
        beforeEnter: requireAuth,
    }),
    new Route({
        name: 'courses-view',
        path: '/courses/view/:id',
        showInMenu: false,
        minRole: EnumUserRole.STUDENT,
        component: () => import("@/pages/Courses/Actions/View/CourseView.vue"),
    }),
    new Route({
        name: 'courses-edit',
        path: '/courses/edit/:id',
        showInMenu: false,
         minRole: EnumUserRole.TEACHER,
        component: () => import("@/pages/Courses/Actions/Edit/CourseEdit.vue"),
    }),
    new Route({
        label: 'Create',
        name: 'course-create',
        path: '/create-course',
        minRole: EnumUserRole.TEACHER,
        component: () => import('@/pages/Courses/Actions/Create/CourseCreate.vue'),
    })
]