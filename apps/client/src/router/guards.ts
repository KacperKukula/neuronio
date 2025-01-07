import { firebaseAuth } from "@/modules/firebase/firebaseAuth"

export const logedInGuard = () => {
    console.log(!firebaseAuth.currentUser)

    if ( !firebaseAuth.currentUser )
        return '/login'
}