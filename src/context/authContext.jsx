import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";





const authContext = React.createContext({
    googleLogin: async (googleProvider) => { },
    logout: () => {},
    user:null,
    _v: 0
});

const { Provider } = authContext;

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unConnectApp = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user);
            }else{
                setUser(null);
            }
        });
        return () => unConnectApp();
    }, []);
    
    const googleLogin = async(googleProvider) => {
        try {
            googleProvider.setCustomParameters({ prompt: 'select_account' });
            const creds = await signInWithPopup(auth,googleProvider);
            setUser(creds.user);
            return creds;
        } catch (error) {
            return {success: false, message:"connection non établie"}
        }
    }
    const logout = async() => {
        try {
            await signOut(auth);
            setUser(null);
            console.log("unconnection successful");
        } catch (error) {
            console.log("Oops: " + error);
        } 
        
    }
    return (
        <Provider value = {{googleLogin, logout, user}}>
            {children}         
        </Provider>
    );

    
};
const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export { authContext, AuthProvider, useAuth };