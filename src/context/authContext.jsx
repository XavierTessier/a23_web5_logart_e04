import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';





const authContext = React.createContext({
    googleLogin: async (googleProvider) => { },
    logout: () => { },
    user: null,
    _v: 0
});

const { Provider } = authContext;

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unConnectApp = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unConnectApp();
    }, []);

    useEffect(() => {
        if(!user) return;
        const userRef = doc(db, 'users', user.uid);
        const unsub = onSnapshot(userRef, (snapshot) => {
            const data = snapshot.data();
            console.log('TRIGGERED', data);
            setUserData(data);
        });
        return () => unsub();
    }, [user]);
    
    const googleLogin = async (googleProvider) => {
        try {
            googleProvider.setCustomParameters({ prompt: 'select_account' });
            const creds = await signInWithPopup(auth, googleProvider);
            // console.log(creds.user);
            setUser(creds.user);
            return creds;
        } catch (error) {
            return { success: false, message: "connection non établie" }
        }
    }
    const logout = async () => {
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
            console.log(uid);
            // Check if the user with the given uid already exists
            const docRef = doc(db, 'users', uid);
            const querySnapshot = await getDoc(docRef);

            if (!querySnapshot.exists()) {
                console.log('[IS EMPTY]');
                const objUser = {
                    uid: uid,
                    displayName: displayName,
                    playlist: [],
                };
                // If no user with the given uid exists, add a new user to the database
                await setDoc(docRef, objUser);
            } else {
                // Handle case where user with the given uid already exists
                console.log('User with this UID already exists');
            }
        } catch (error) {
            console.error('Error adding/checking user: ', error);
        }
    };

    const addMusicToUser = async (uid, info) => {
        const userQuery = query(userData);
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
            console.error("Utilisateur non trouvé");
            return;
        }
        const userDocRef = userSnapshot.docs[0].ref;
        try {
            const userData = (await getDoc(userDocRef)).data();

            // Vérifier si le champ "playlists" existe dans les données de l'utilisateur
            const playlist = userData.playlist || [];

            // Ajouter la nouvelle playlist avec la musique
            const newPlaylist = { info };
            playlist.push(newPlaylist);
            // Mettre à jour le document utilisateur avec la nouvelle liste de playlists
            await updateDoc(userDocRef, { playlist });

            console.log("Musique ajoutée à une nouvelle playlist avec succès");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la musique à la nouvelle playlist:", error);
        }
    };

    return (
        <Provider value={{ /*{playlist: userData?.playlist}*/ googleLogin, logout, user, addMusicToUser, addDocHandler, setUser}}>
            {children}
        </Provider>
    );

};
const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export { authContext, AuthProvider, useAuth };