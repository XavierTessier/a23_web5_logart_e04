import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from '../context/authContext';
import { useState } from 'react';
const Login = () => {
    const { googleLogin, logout, user } = useAuth();

    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin(googleProvider); // assuming googleProvider is defined somewhere
            console.log(result); // Optional: Log the result of Google login
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };
    return (
        <div className='authentification_lite'>
                <button onClick={handleGoogleLogin}>Sign In with Google</button>
        </div>
    );
}   
export default Login;