import { auth, googleProvider } from 'firebase/auth';
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';
const Login = () => {
    const [user, setUser] = useState(null);
    const signInWithGoogle = async() => {
        try {
            googleProvider.setCustomParameters({ prompt: 'select_account' });
            setUser(await signInWithPopup(auth,googleProvider)); 
            console.log("Ce test fonctionne");
            // name
            
        } catch(error){
            console.log(error);
            console.log("Ce test ne fonctionne pas");
        }
    }
    const logout = async() => {
        try {
            await signOut(auth);
            setUser(null); 

            console.log("log outted");
        } catch(error){
            console.log(error);
            console.log("Oops");
        }
    }
    return (
        <div className='authentification_lite'>
            {user?
                <button onClick={logout}>LogOut</button>
                : <button onClick={signInWithGoogle}>Sign In with Google</button>
            }
        </div>
    );
}   
export default Login;