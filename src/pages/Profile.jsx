 import { useAuth } from '../context/authContext';
import { Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../css/Profile.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Modal from '../components/Modal';
import BarreRecherche from '../components/BarreRecherche';
import { Navigate, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, setUserData, userData, getTopMusic} = useAuth();
    const [topMusic, setTopMusic] = useState([]);

    useEffect(() => {
        const unsub = getTopMusic(newTopMusic => {
            setTopMusic(newTopMusic);
        });

        return () => unsub;
    }, []);

    return (
        <div className='Profile'>
            <h1>Votre profil</h1>
            <div>
                <img src={user.photoURL} alt="avatar" />
                <p>{user.displayName}</p>
            </div>
            <p>Email : {user.email}</p>
            <div>
                <p>vos plus écoutés</p>
            </div>
            <div>
                <p>Musique tendance</p>
                {topMusic.map((item, index) => (
                    <div className="fav" id={index} key={item.music.id}>
                        <img src={item.music.album.cover_small} className='cover' />
                        <div className="info" >
                            <p>{item.music.title}</p>
                            <p>{item.music.artist.name}</p>
                            <p>{item.music.album.title}</p>
                            <p>{item.music.duration}s</p>
                        </div>
                    </div>
                )
                )}
            </div>
            <button onClick={logout}>Déconnexion</button>
        </div>
    );
};

export default Profile;


