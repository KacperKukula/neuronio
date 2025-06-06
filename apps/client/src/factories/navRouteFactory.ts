import type { Route } from "@/router/classes/Route";
import CommonPathsConst from "@/router/CommonPathsConst";

const EXCLUDED_ROUTES_PATHS = [
    CommonPathsConst.HOME,
    CommonPathsConst.LOGIN,
    CommonPathsConst.REGISTER,
    '/profile'
]

export function navRouteFactory(routesArr: Route[]): Route[] {
    return routesArr.filter(route => !EXCLUDED_ROUTES_PATHS.includes(route.path))
}