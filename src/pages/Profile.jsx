import { useAuth } from '../context/authContext';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import '../css/Profile.css';

const Profile = () => {
    const { user, logout, playlist, deleteMusic, setUserData, userData } = useAuth();

    return (
        <div>
            <h1>Votre profil</h1>
            <div>
                <img src={user.photoURL} alt="avatar" />
                <p>{user.displayName}</p>
            </div>
            <p>Email : {user.email}</p>
            <div>
                <p>votre playlist</p>
                {playlist && (
                    <Reorder.Group
                        axis='y'
                        values={playlist}
                        onReorder={(reorderedItems) => setUserData({ ...userData, playlist: reorderedItems })}
                    >
                        {playlist.map((item, index) => (
                            <Reorder.Item key={index} className='song' value={item}>
                                <img src={item.info.album.cover} className='cover' />
                                <div className="info">
                                    <p>{item.info.title}</p>
                                    <p>{item.info.artist.name}</p>
                                    <p>{item.info.album.title}</p>
                                    <p>{item.info.duration}s</p>
                                </div>
                                <button className='Delete' onClick={() => deleteMusic(playlist, item.info.id)}>Delete</button>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                )}
            </div>
            <div>
                <p>vos plus écoutés</p>
            </div>
            <button onClick={logout}>Déconnexion</button>
        </div>
    );
};

export default Profile;


