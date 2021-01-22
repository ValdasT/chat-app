import { createContext, useContext } from 'react';

export const AuthContext = createContext({
    token: null,
    user: null,
    logIn: () => { },
    logOut: () => { }
})

export const useUserSession = () => {
    const { token, user, setUser, logIn, logOut } = useContext(AuthContext)
    return { token, user, setUser, logIn, logOut }
};
