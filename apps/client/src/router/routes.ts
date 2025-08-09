import { Route } from './classes/Route';
import { requireAuth } from '@/router/guards';

import { globalRoutes } from './routes/globalRoutes';
import CommonPathsConst from './CommonPathsConst';
import { EnumUserRole } from '@/common/enums/EnumUserRolels';
import { userRoutes } from './routes/userRoutes';

export const routes = [

    /* Global routes such as Login, Dashboard */
    ...globalRoutes,

    /* USER ROUTES */
    ...userRoutes,

    /* SALES PAGES */
    new Route({
        showInMenu: true,
        path: '/',
        label: 'Home',
        name: CommonPathsConst.HOME,
        component: () => import('@/pages/SalesPages/Home/Home.vue'),
    }),
    new Route({
        showInMenu: true,
        label: 'About',
        name: 'about',
        path: '/about',
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

    /* COURSES */
    new Route({
        showInMenu: true,
        label: 'Courses',
        name: 'courses',
        path: '/courses',
        minRole: EnumUserRole.STUDENT,
        component: () => import("@/pages/Courses/Courses.vue"),
        beforeEnter: requireAuth,
    }),
    new Route({
        name: 'courses-view',
        path: '/courses/view/:id',
        minRole: EnumUserRole.STUDENT,
        component: () => import("@/pages/Courses/~Actions/View/CourseView.vue"),
    }),
    new Route({
        name: 'courses-edit',
        path: '/courses/edit/:id',
        minRole: EnumUserRole.TEACHER,
        component: () => import("@/pages/Courses/~Actions/Edit/CourseEdit.vue"),
    }),
    new Route({
        name: 'courses-participants',
        path: '/courses/participants/:id',
        minRole: EnumUserRole.TEACHER,
        component: () => import("@/pages/Courses/~Actions/Participants/Participants.vue"),
    }),
    new Route({
        label: 'Definitions',
        name: 'course-definitions',
        path: '/courses/:id/definitions',
        minRole: EnumUserRole.TEACHER,
        component: () => import('@/pages/Courses/~Actions/Definitions/Definitions.vue'),
    }),
    new Route({
        showInMenu: true,
        label: 'Create',
        name: 'course-create',
        path: '/create-course',
        icon: 'pi pi-plus-circle',
        minRole: EnumUserRole.TEACHER,
        component: () => import('@/pages/Courses/~Actions/Create/CourseCreate.vue'),
    }),
]