import ky from "ky";
import { StaticModule } from "../abstract/StaticModule";
import { sessionManager } from "../session/SessionManager";
import type { RefreshedToken } from "./interfaces/RefreshedToken";

export class HttpService extends StaticModule {

    static readonly API_URL = import.meta.env.VITE_API_URL;

    static readonly REFRESH_TOKEN_PATH = '/auth/refresh'
    
    authorizedReq(throwErr: boolean = true): typeof ky {
        const token: string | null = sessionManager.getAccessToken();

        if (!token) throw new Error('No token found');
 
        return ky.create({
            prefixUrl: HttpService.API_URL,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            throwHttpErrors: throwErr,

            hooks: {

                afterResponse: [
                    
                    //Token refreshing
                    async (request, options, response) => {
                        if(response.status !== 401) return;
                        
                        const refreshResp = await this.refreshTokenReq()

                        if (refreshResp && refreshResp.ok) {
                            const { token } = await refreshResp.json();
                            sessionManager.setAccessToken(token);

                            // @ts-ignore - Repeat oryginal request
                            options.headers.set('Authorization', `Bearer ${token}`);
                            return ky(request, options);
                        }
                    }
                ]
            }
        });
    }

    private async refreshTokenReq(throwErr: boolean = true): Promise<Response|null> {
        const refreshToken: string | null = sessionManager.getRefreshToken();

        if(!refreshToken) return null;

        return await ky.post<RefreshedToken>(`${HttpService.API_URL}/auth/refresh`, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
    }

    fileUploadReq(throwErr: boolean = true) {
        return this.authorizedReq(throwErr).extend({
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}