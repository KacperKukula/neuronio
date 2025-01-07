import { service as fbService } from '@/modules/firebase/firebase';
import { getAuth } from "firebase/auth";

export const firebaseAuth = getAuth(fbService);