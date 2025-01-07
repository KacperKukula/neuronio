import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/Login/Login.vue'
import { logedInGuard } from './guards'

export const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    {
        path: '/dashboard', 
        component: () => import('@/pages/Dashboard/Dashboard.vue'),
        beforeEnter: logedInGuard
    },
]