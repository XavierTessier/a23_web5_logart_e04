import {useAuth} from '../context/authContext';
import {useState} from 'react';

const Profile = () => {
    const {user, logout, getPlaylist} = useAuth();

    const Playlist = async () => {
        const playlist = await getPlaylist(user.uid);
        return playlist;
    }

    const maPlaylist = Playlist(); 
    console.log(maPlaylist);    
 
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
                {maPlaylist && maPlaylist.map((music) => (
                    <div>
                        <p>{music.title}</p>
                        <p>{music.artist}</p>
                    </div>
                ))}
            </div>
            <div>
                <p>vos plus écoutés</p>
            </div>
            <button onClick={logout}>Déconnexion</button>
        </div>
    );
}

export default Profile;