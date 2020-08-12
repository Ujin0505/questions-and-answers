import React, {FC, useState, useEffect, useContext, createContext} from 'react';
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";


const authSettings ={
    domain: "dev-u9daq4bk.eu.auth0.com",
    client_id: "OE6gSNXmDHi7kQg3x2L42W98ZFBFvjmH",
    redirect_uri: window.location.origin + '/signin-callback',
    scope: 'openid profile QandAAPI email',
    audience: 'https://qanda'
}



interface  AuthUser {
    name: string,
    email: string
}

interface  IAuth0Context {
    isAuth: boolean,
    user?: AuthUser,
    signIn: () => void /*() => {}*/,
    signOut: () => void /*() => {}*/,
    loading: boolean
}

export const Auth0Context = createContext<IAuth0Context>(
    {
        isAuth: false,
        signIn: () => {
        },
        signOut: () => {
        },
        loading: true
    } as IAuth0Context);

export const useAuth = () => useContext(Auth0Context);


export const getAccessToken = async () =>{
    const authFromHook = await createAuth0Client(authSettings);
    const accessToken = await authFromHook.getTokenSilently();
    return accessToken;
}


export const AuthProvider: FC = ({children}) =>{
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<AuthUser| undefined>(undefined);
    const [auth0Client, setAuth0Client] = useState<Auth0Client>();
    const [loading, setLoading] = useState(true);

    const getAuth0ClientFromState = () =>{
        if (auth0Client === undefined) {
            throw new Error('Auth0 client not set');
        }
        return auth0Client;
    }

    useEffect(() =>{

        const initAuth = async () =>{
            setLoading(true);
            const authFromHook = await createAuth0Client(authSettings);
            setAuth0Client(authFromHook);

            // без вызова getTokenSilently не работает isAuthenticated и getUser;
            try {
                await authFromHook.getTokenSilently();
            }
            catch (e) {}

            if(window.location.pathname == 'signin-callback' && window.location.search.indexOf('code=') > -1){
                await authFromHook.handleRedirectCallback();
                window.location.replace(window.location.origin);
            }

            const isAuthFromHook = await authFromHook.isAuthenticated();
            if(isAuthFromHook){
                const user = await authFromHook.getUser();
                setUser(user);
            }
            setIsAuth(isAuthFromHook);
            setLoading(false);
        }

        initAuth();

    }, [])


    return(
        <Auth0Context.Provider
            value ={{
                isAuth,
                user,
                signIn: () => { getAuth0ClientFromState().loginWithRedirect()},
                signOut: () => { getAuth0ClientFromState().logout(
                    { client_id: authSettings.client_id,
                        returnTo: window.location.origin + '/signout-callback'
                    })},
                loading
            }}
        >
            {children}
        </Auth0Context.Provider>
    )


}

