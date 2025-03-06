import Login from '@/pages/Login/Login.vue'
import { logedInGuard } from './guards'
import Dashboard from '@/pages/Dashboard/Dashboard.vue'

export const routes = [
    { path: '/', component: Dashboard },
    { path: '/login', component: Login },
    {
        path: '/dashboard', 
        component: () => import('@/pages/Dashboard/Dashboard.vue'),
        // beforeEnter: logedInGuard
    },
]