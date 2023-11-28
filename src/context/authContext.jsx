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
            createSuccessNotif({ title: "Déconnexion", message: "Vous avez été déconnecté avec succès" });
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
                    favorites: [],
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
            // Vérifier si la musique est déjà dans la playlist
            if (playlist.some(item => item.info.id === info.id)) {
                console.log("Musique déjà présente dans la playlist");
                return;
            }
            else {
                // Ajouter la nouvelle playlist avec la musique
                const newPlaylist = { info };
                playlist.push(newPlaylist);

                // Mettre à jour le document utilisateur avec la nouvelle liste de playlists
                const userDocRef = doc(db, 'users', userData.uid);
                await updateDoc(userDocRef, { playlist });

                console.log("Musique ajoutée à la playlist avec succès");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la musique à la nouvelle playlist:", error);
        }
    };

    const deleteMusic = async (playlist, musicId) => {
        try {

            const updatedPlaylist = [...playlist]; // On clone la playlist pour ne pas modifier l'originale

            const indexToDelete = updatedPlaylist.findIndex(item => item.info.id === musicId); // On cherche l'index de la musique à supprimer, l'index est l'id de la musique

            if (indexToDelete !== -1) { // Si la musique est trouvée dans la playlist
                updatedPlaylist.splice(indexToDelete, 1); // On supprime la musique de la playlist

                const userDocRef = doc(db, 'users', userData.uid); // On récupère le document utilisateur
                await updateDoc(userDocRef, { playlist: updatedPlaylist }); // On met à jour la playlist de l'utilisateur

                console.log("Musique retirée de la playlist avec succès");
            } else {
                console.log("Musique non trouvée dans la playlist");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la musique à la nouvelle playlist:", error);
        }
    };

    const addToFav = async (favorites, info) => {
        try {
            // Vérifier si la musique est déjà dans la playlist
            if (favorites.some(item => item.info.id === info.id)) {
                console.log("Musique déjà présente dans vos favoris");
                return;
            }
            else {
                // Ajouter la nouvelle playlist avec la musique
                const newFav = { info };
                favorites.push(newFav);

                // Mettre à jour le document utilisateur avec la nouvelle liste de playlists
                const userDocRef = doc(db, 'users', userData.uid);
                await updateDoc(userDocRef, { favorites });

                const favDocRef = doc(db, 'favoris' , String(info.id));
                const querySnapshot = await getDoc(favDocRef);
                if (!querySnapshot.exists()) {
                    console.log('[IS EMPTY SITE FAVORITE]');
                    const objMusic = {
                        music: info,
                        nbFavorites: 1,
                    }
                    await setDoc(favDocRef, objMusic);

                    console.log("Musique ajoutée à la playlist avec succès");
                } else {
                    // Handle case where user with the given uid already exists
                    console.log('La musique est déja dans les favoris du site');
                }


                console.log("Musique ajoutée à vos favoris avec succès");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la musique dans vos favoris:", error);
        }
    };

    const removeFromFav = async (favorites, musicId) => {
        try {

            const updatedFavorites = [...favorites]; // On clone la playlist pour ne pas modifier l'originale

            const indexToDelete = updatedFavorites.findIndex(item => item.info.id === musicId); // On cherche l'index de la musique à supprimer, l'index est l'id de la musique

            if (indexToDelete !== -1) { // Si la musique est trouvée dans la playlist
                updatedFavorites.splice(indexToDelete, 1); // On supprime la musique de la playlist

                const userDocRef = doc(db, 'users', userData.uid); // On récupère le document utilisateur
                await updateDoc(userDocRef, { favorites: updatedFavorites }); // On met à jour la playlist de l'utilisateur

                console.log("Musique retirée de vos favoris avec succès");
            } else {
                console.log("Musique non trouvée dans vos favoris");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la musique de vos favoris:", error);
        }
    };





    return (
        <Provider value={{ playlist: userData?.playlist, googleLogin, logout, user, addMusicToUser, addDocHandler, userData, deleteMusic, setUserData, addToFav, removeFromFav }}>
            {children}
        </Provider>
    );

};
const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export { authContext, AuthProvider, useAuth };