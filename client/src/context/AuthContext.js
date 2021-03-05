import React, { useContext, useState, useEffect } from "react"
import { handleError } from '../services/ErrorHandler'
import { auth, googleProvider, facebookProvider } from "../utils/firebase"
import { createUser, createSession, getToken, getUserForInint, logOutUser } from '../services/ApiCalls'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signUp = async (email, password, displayName) => {
        try {
            let { user } = await auth.createUserWithEmailAndPassword(email, password)
            let idToken = await user.getIdToken();
            await createSession(idToken);
            user.profile = await createUser({ name: displayName, email: email });
            setCurrentUser(user.profile)
            await auth.signOut();
            return user;
        } catch (err) {
            console.log(err);
            throw handleError(err)
        }
    }

    const logIn = async (email, password) => {
        try {
            let { user } = await auth.signInWithEmailAndPassword(email, password)
            let idToken = await user.getIdToken();
            await createSession(idToken);
            await getUserInfoFromDb()
        } catch (err) {
            console.log(err);
            throw handleError(err)
        }
    }

    const logOut = async () => {
        try {
            await logOutUser();
            setCurrentUser(null)
        } catch (err) {
            console.log(err);
            throw handleError(err)
        }
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    const updateEmail = (email) => {
        return currentUser.updateEmail(email)
    }

    const updatePassword = (password) => {
        return currentUser.updatePassword(password)
    }


    const signInWithGoogle = async () => {
        try {
            let { user } = await auth.signInWithPopup(googleProvider.setCustomParameters({
                prompt: 'select_account'
            }));
            let idToken = await user.getIdToken();
            await createSession(idToken);
            await getUserInfoFromDb()
        } catch (err) {
            console.log(err);
            throw handleError(err)
        }
    }

    const signInWithFacebook = async () => {
        try {
            let { user } = await auth.signInWithPopup(facebookProvider.setCustomParameters({
                'display': 'popup'
            }));
            let idToken = await user.getIdToken();
            await createSession(idToken);
            await getUserInfoFromDb()
        } catch (err) {
            console.log(err);
            throw handleError(err)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                await getToken()
                await getUserInfoFromDb()
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        })()
    }, [])

    const getUserInfoFromDb = async () => {
        let userProfile = await getUserForInint()
        setCurrentUser(userProfile);
    }

    const value = {
        currentUser,
        logIn,
        signUp,
        logOut,
        signInWithGoogle,
        signInWithFacebook,
        resetPassword,
        updateEmail,
        updatePassword,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}