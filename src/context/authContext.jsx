import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, onSnapshot, query, where, getDocs } from "firebase/firestore";


const authContext = React.createContext({
    googleLogin: async (googleProvider) => { },
    logout: () => {},
    user:null,
    _v: 0
});

const { Provider } = authContext;

const AuthProvider = ({children}) => {
    [user, setUser] = useState(null);
    useEffect(() => {
        const unConnectApp = onAuthStateChanged(auth, (user) => {
            if(user) setUser(user);
            else setUser(null);
        });
        return () => unConnectApp();
    });
    return () => unConnectApp();
    const googleLogin = async(googleProvider) => {
        try {
            const creds = await signInWithPopup(googleProvider)
        } catch (error) {
            return {success: false, message:"connection non établie"}
        }
    }
    const logout = async() => {
        try {
            await signOut(auth);
            console.log("unconnection successful");
        } catch (error) {
            console.log("Oops: " + error);
        } 
        setUser(null);
    }
    return (
        <Provider value = {{googleLogin, logout, user}}>
            {children}         
        </Provider>
    );
}