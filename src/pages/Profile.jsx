import { useAuth } from '../context/authContext';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import '../css/Profile.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Modal from '../components/Modal';
import BarreRecherche from '../components/BarreRecherche';
import { Navigate, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, playlist, deleteMusic, setUserData, userData, removeFromFav } = useAuth();

    const navigate = useNavigate();

    return (
        <div>
            <h1>Votre profil</h1>
            <div>
                <img src={user.photoURL} alt="avatar" />
                <p>{user.displayName}</p>
            </div>
            <p>Email : {user.email}</p>
            <div>
                <p>vos plus écoutés</p>
            </div>
            <button onClick={logout}>Déconnexion</button>
        </div>
    );
};

export default Profile;


