import COMMON_PATH_CONST from './CommonPathsConst';
import { sessionManager } from "@modules/session/SessionManager";

export function requireAuth( to: any, from: any, next: (arg?: any) => void) {

    if (sessionManager.getRefreshToken()) next()
    else next({ path: COMMON_PATH_CONST.LOGIN })
}