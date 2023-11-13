import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, query, where } from 'firebase/firestore';





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

    const addDocHandler = async (uid, displayName) => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                uid: uid,
                displayName: displayName,
                playlist: [],
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const addMusicToUser = async (uid, title, link) => {
        const userQuery = query(collection(db, "users"), where("uid", "==", uid));
        const userSnapshot = await getDocs(userQuery);
    
        if (userSnapshot.empty) {
            console.error("Utilisateur non trouvé");
            return;
        }
        const userDocRef = userSnapshot.docs[0].ref;
        try {
            const userData = (await getDoc(userDocRef)).data();
    
            // Vérifier si le champ "playlists" existe dans les données de l'utilisateur
            const playlists = userData.playlists || [];
    
            // Ajouter la nouvelle playlist avec la musique
            const newPlaylist = { timestamp: new Date().toISOString(), songs: [{ title, link }] };
            playlists.push(newPlaylist);
            // Mettre à jour le document utilisateur avec la nouvelle liste de playlists
            await updateDoc(userDocRef, { playlists });
    
            console.log("Musique ajoutée à une nouvelle playlist avec succès");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la musique à la nouvelle playlist:", error);
        }
    };


    return (
        <Provider value = {{googleLogin, logout, user, addMusicToUser, addDocHandler}}>
            {children}         
        </Provider>
    );

    
};
const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export { authContext, AuthProvider, useAuth };