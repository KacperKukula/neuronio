import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import CourseCreate from '@/pages/Courses/Create/CourseCreate.vue'
import Register from '@/pages/Register/Register.vue'
import Login from '@/pages/Login/Login.vue'
import { requireAuth } from '@/router/guards';

import PATH_CONST from './CommonPathsConst';

export const routes = [
    { path: '/', component: Dashboard },
    { path: PATH_CONST.LOGIN, component: Login },
    { path: PATH_CONST.REGISTER, component: Register },

    // Required auth paths
    {
        path: '/courses',
        component: CourseCreate,
        beforeEnter: requireAuth,
        children: [
            {
                path: 'create',
                component: () => import('@/pages/Courses/Create/CourseCreate.vue')
            }
        ]
    },
    {
        path: '/dashboard',
        requiredAuth: true,
        component: () => import('@/pages/Dashboard/Dashboard.vue'),
        beforeEnter: requireAuth,
    },
    {
        path: '/profile',
        requiredAuth: true,
        component: () => import('@/pages/User/Profile.vue'),
        beforeEnter: requireAuth,
    },
]