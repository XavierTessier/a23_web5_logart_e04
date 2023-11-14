import {useAuth} from '../context/authContext';
import {useState} from 'react';

const Profile = () => {
    const {user, logout} = useAuth();
    console.log(user);
    return (
        <div>
            <h1>Votre profil</h1>
            <div>
                <img src={user.photoURL} alt="avatar" />
                <p>{user.displayName}</p>
            </div>
            <p> Email : {user.email}</p>
            <div>
                <p>vos favoris</p>
            </div>
            <div>
                <p>vos plus écoutés</p>
            </div>
            <button onClick={logout}>Déconnexion</button>
        </div>
    );
}

export default Profile;