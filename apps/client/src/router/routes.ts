import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import CourseCreate from '@/pages/Courses/Create/CourseCreate.vue'

import { Route } from './classes/Route';
import { requireAuth } from '@/router/guards';

import { globalRoutes } from './routes/globalRoutes';

export const routes = [

    /* Global routes such as Login, Dashboard */
    ...globalRoutes,

    new Route({
        label: 'Dashboard',
        name: 'dashboard',
        path: '/dashboard',
        icon: 'pi pi-palette',
        component: Dashboard,
        beforeEnter: requireAuth,
    }),
    new Route({
        name: 'profile',
        path: '/profile',
        component: () => import('@/pages/User/Profile.vue'),
        beforeEnter: requireAuth,
    }),
    new Route({
        label: 'Courses',
        name: 'courses',
        path: '/courses',
        component: CourseCreate,
        beforeEnter: requireAuth,
        children: [
            new Route({
                path: '/create',
                name: 'course-create',
                component: () => import('@/pages/Courses/Create/CourseCreate.vue'),
            })
        ]
    }),
]