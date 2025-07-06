import { Route } from '../classes/Route';
import { requireAuth } from '../guards';

export const userRoutes = [
    new Route({
        name: 'profile',
        path: '/profile',
        component: () => import('@/pages/User/Profile.vue'),
        beforeEnter: requireAuth,
    }),
    new Route({
        name: 'preferences',
        path: '/preferences',
        component: () => import('@/pages/User/Preferences.vue')
    })
]
