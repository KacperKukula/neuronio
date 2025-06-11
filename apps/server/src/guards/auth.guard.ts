import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "@modules/auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly AuthService: AuthService,
        private readonly jwtService: JwtService,
    ) {}

    private readonly allowedRoutes: string[] = [
        '/auth/signin',
        '/auth/register',
        '/auth/refresh',
    ]
    
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest()
        
        // -- 1 Check if is public path
        const route = request.route.path;
        if(this.allowedRoutes.includes(route)) return true;

        // -- 2 Check token
        const token = this.extractTokenFromHeader(request)
        if(!token) throw new UnauthorizedException();
        try {
            const payload = await this.jwtService.verifyAsync(
                token, { secret: 'i(kcewqibM78)PJ' }
            );
            request.user = { userId: payload.sub };

        } catch(e) { throw new UnauthorizedException() }

        return true;
    }

    extractTokenFromHeader(request: any) {
       const [type, token] = request.headers?.authorization?.split(' ') ?? [];
       return type === 'Bearer' ? token : undefined;
    }
}