import COMMON_PATH_CONST from './CommonPathsConst';
import { sessionManager } from "@modules/session/SessionManager";

export function requireAuth( to, from, next) {

    sessionManager.getAccessToken() ? next() : next({ path: COMMON_PATH_CONST.LOGIN });       
}