import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from '../context/authContext';
import { useState } from 'react';
import '../css/Login.css';
const Login = () => {
    const { googleLogin, logout, user, addDocHandler} = useAuth();

    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin(googleProvider); // assuming googleProvider is defined somewhere
            console.log(result); // Optional: Log the result of Google login
            addDocHandler(result.user.uid, result.user.displayName);
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };
    return (
        <div className='authentification_lite'>
            <div className='cercle'></div>
            <button onClick={handleGoogleLogin} className='connexion'>Sign In with Google</button>
            <img src="src\img\png\Fichier 3.png" alt="forme" className='forme1'/>
            <img src="src/img/png/Fichier 1.png" alt="forme" className='ligne1'/>
            <img src="src\img\png\Fichier 4.png" alt="forme" className='forme2'/>
            <img src="src/img/png/Fichier 2.png" alt="forme" className='ligne2'/>
        </div>
    );
}   
export default Login;