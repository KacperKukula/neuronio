import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import CourseCreate from '@/pages/Courses/Create/CourseCreate.vue'
import Register from '@/pages/Register/Register.vue'
import Login from '@/pages/Login/Login.vue'

export const routes = [
    { path: '/', component: Dashboard },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
        path: '/courses',
        component: CourseCreate,
        children: [
            {
                path: 'create',
                component: () => import('@/pages/Courses/Create/CourseCreate.vue')
            }
        ]
    },
    {
        path: '/dashboard', 
        component: () => import('@/pages/Dashboard/Dashboard.vue'),
        // beforeEnter: logedInGuard
    },
]