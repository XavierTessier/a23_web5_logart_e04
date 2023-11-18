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
        if (!user) return;
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

    const addMusicToUser = async (playlist, info) => {
        try {
            // Vérifier si le champ "playlist" existe dans les données de l'utilisateur
            // const playlist = userData.playlist || [];

            // Ajouter la nouvelle playlist avec la musique
            const newPlaylist = { info };
            playlist.push(newPlaylist);

            // Mettre à jour le document utilisateur avec la nouvelle liste de playlists
            const userDocRef = doc(db, 'users', userData.uid);
            await updateDoc(userDocRef, { playlist });

            console.log("Musique ajoutée à la playlist avec succès");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la musique à la nouvelle playlist:", error);
        }
    };

    const deleteMusic = async (playlist, musicId) => {
        try {
            // Clone the original playlist to avoid modifying it directly
            const updatedPlaylist = [...playlist];
    
            // Find the index of the music to be removed
            const indexToDelete = updatedPlaylist.findIndex(item => item.info.id === musicId);
    
            if (indexToDelete !== -1) {
                // Remove the music from the cloned playlist array
                updatedPlaylist.splice(indexToDelete, 1);
    
                // Mettre à jour le document utilisateur avec la nouvelle liste de playlists
                const userDocRef = doc(db, 'users', userData.uid);
                await updateDoc(userDocRef, { playlist: updatedPlaylist });
    
                console.log("Musique retirée de la playlist avec succès");
            } else {
                console.log("Musique non trouvée dans la playlist");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la musique à la nouvelle playlist:", error);
        }
    };
    

    return (
        <Provider value={{ playlist: userData?.playlist, googleLogin, logout, user, addMusicToUser, addDocHandler, userData, deleteMusic, setUserData }}>
            {children}
        </Provider>
    );

};
const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export { authContext, AuthProvider, useAuth };