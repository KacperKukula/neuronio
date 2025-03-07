import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as firebaseJsonConfig from './firebaseConfig.json';
import * as firebase from 'firebase-admin';

const firebaseConf = {
    type: firebaseJsonConfig.type,
    projectId: firebaseJsonConfig.project_id,
    privateKeyId: firebaseJsonConfig.private_key_id,
    privateKey: firebaseJsonConfig.private_key,
    clientEmail: firebaseJsonConfig.client_email,
    clientId: firebaseJsonConfig.client_id,
    authUri: firebaseJsonConfig.auth_uri,
    tokenUri: firebaseJsonConfig.token_uri,
    authProviderX509CertUrl: firebaseJsonConfig.auth_provider_x509_cert_url,
    clientX509CertUrl: firebaseJsonConfig.client_x509_cert_url
};

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    private firebaseApp: any;

    constructor() {
        this.firebaseApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebaseConf),
            databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
        });

        console.log("🔥 firebase initialized")
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = await this.firebaseApp.auth().verifyIdToken(token);
            request.user = decodedToken;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
