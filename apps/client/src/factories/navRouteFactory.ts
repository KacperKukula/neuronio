import type { EnumUserRole } from "@/common/enums/EnumUserRolels";
import type { Route } from "@/router/classes/Route";
import CommonPathsConst from "@/router/CommonPathsConst";

const EXCLUDED_ROUTES_PATHS = [
    CommonPathsConst.LOGIN,
    CommonPathsConst.REGISTER,
    '/profile'
]

export function navRouteFactory(routesArr: Route[], role: EnumUserRole): Route[] {
    return routesArr.filter(route => 

        // If route is in EXCLUDED_ROUTES_PATHS
        !EXCLUDED_ROUTES_PATHS.includes(route.path) &&

        // If route has setted false in showInMenu prop
        route.showInMenu !== false &&

        // TODO: Permissions
        // If route has setted role in allowedRoles prop
        (!route.minRole || role <= route.minRole)
    )
}