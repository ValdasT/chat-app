import React, { useContext, useState, useEffect } from "react"
import { auth, googleProvider, facebookProvider } from "../utils/firebase"
import { createUser, getUser } from '../services/ApiCalls'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const  AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [currentUserProfile, setCurrentUserProfile] = useState()
    const [loading, setLoading] = useState(true)

    const signUp = async (email, password, displayName) => {
        try {
            console.log('start');
            let user = await auth.createUserWithEmailAndPassword(email, password)
            console.log(user);
            user.profile = await createUser({ name: displayName, email: email });
            setCurrentUserProfile(user.profile)
            return user;
        } catch (err) {
            console.log(err);
            throw err
        }
    }

    const getUserProfile = async (email) => {
        let userProfile = await getUser(email);
        return userProfile;
    }

    const logIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logOut = () => {
        return auth.signOut()
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


    const signInWithGoogle = () => {
        return auth.signInWithPopup(googleProvider.setCustomParameters({
            prompt: 'select_account'
        }));
    }

    const signInWithFacebook = () => {
        return auth.signInWithPopup(facebookProvider.setCustomParameters({
            'display': 'popup'
        }));
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log(user);
            if (!currentUserProfile && user) {
                let userProfile = await getUserProfile(user.email)
                setCurrentUserProfile(userProfile)
                console.log(userProfile);
            }
            if (!user) {
                setCurrentUserProfile(user)
            }
            setCurrentUser(user)
            console.log(user);
            setLoading(false)
        })

        return unsubscribe

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = {
        currentUser,
        logIn,
        signUp,
        logOut,
        signInWithGoogle,
        signInWithFacebook,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}