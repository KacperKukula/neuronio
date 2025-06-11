import PATH_CONST from '../CommonPathsConst';
import { Route } from "../classes/Route";

import Login from '@/pages/Login/Login.vue'
import Register from '@/pages/Register/Register.vue'
import Dashboard from '@/pages/Dashboard/Dashboard.vue'

export const globalRoutes = [
        new Route({ path: PATH_CONST.LOGIN, name: 'login', component: Login }),
        new Route({ path: PATH_CONST.REGISTER, name: 'register', component: Register }),
]