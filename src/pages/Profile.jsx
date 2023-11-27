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
    const { user, logout, playlist, deleteMusic, setUserData, userData } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <div className='user'>
                <h1>{user.displayName}</h1>
                <img src={user.photoURL} alt="avatar" />
            </div>
            {/* <p>Email : {user.email}</p> */}
            <div>
                <p>Réorganiser votre playlist</p>
                <div onClick={() => setShowPlaylist(!showPlaylist)}> {/* On affiche la playlist si on clique sur le titre */}
                    <h1 onClick={() => navigate()}>Votre playlist</h1>
                </div>
                {showPlaylist && (
                    <Modal>
                        <button onClick={() => setShowModal(!showModal)}>+</button>
                        {showModal && (
                                <BarreRecherche />
                        )}
                        {playlist && (
                            <Reorder.Group
                                axis='y'
                                values={playlist}
                                onReorder={(values) => { // values est la liste réordonnée
                                    setUserData({ ...userData, playlist: values }); // on met à jour le state de userData, qui contient la playlist
                                    updateDoc(doc(db, 'users', user.uid), { playlist: values }); // on met à jour la playlist dans la base de données
                                }}
                            >
                                {playlist.map((item, index) => (
                                    <Reorder.Item key={item.info.id} className='song' value={item}>
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
                    </Modal>
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


