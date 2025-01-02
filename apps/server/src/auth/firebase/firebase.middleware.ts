import { Injectable, NestMiddleware } from "@nestjs/common";
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
    clientC509CertUrl: firebaseJsonConfig.client_x509_cert_url
};

@Injectable()
export class FirebaseMiddleware implements NestMiddleware {

    private firebaseApp: any;
    
    constructor() {
        this.firebaseApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebaseConf),
            databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
        });
    }

    use(req: any, res: any, next: () => void) {
        next();
    }
}