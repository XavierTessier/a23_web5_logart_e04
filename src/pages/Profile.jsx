import { useAuth } from "../context/authContext";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import "../css/Profile.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Modal from "../components/Modal";
import BarreRecherche from "../components/BarreRecherche";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMusic } from "../context/musicContext";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { user, logout, setUserData, userData, getTopMusic, getHistory } =
    useAuth();
  const [topMusic, setTopMusic] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const unsub = getTopMusic((newTopMusic) => {
      setTopMusic(newTopMusic);
    });

    return () => unsub;
  }, []);

  useEffect(() => {
    const unsub = getHistory((newHistory) => {
      setHistory(newHistory);
    });

    return () => unsub;
  }, []);

  return (
    <div className="h-screen">
      <Helmet>
        <title>Tune-Up | Profil</title>
      </Helmet>
      <div className="user">
        <div className="opacite"></div>
        <img src="src\img\png\Baniere.png" alt="" className="vinyles"/>
        <img src="src\img\png\Baniere2.png" alt="" className="vinyles2"/>
        <img src="src\img\png\Baniere3.png" alt="" className="vinyles3"/>
        <h2 className="name">{user.displayName}</h2>
        <img src={user.photoURL} alt="avatar" className="avatar"/>
      </div>
      {/* <p>Email : {user.email}</p> */}
      <div>
        <p>vos plus écoutés</p>
      </div>
      <div>
        <p>Musique tendance</p>
        {topMusic.map((item, index) => (
          <div className="fav" id={index} key={item.music.id}>
            <Link to={`/reader/track/${item.music.id}`}>
              <img src={item.music.albumCover} className="cover" />
              <div className="info">
                <p>{item.music.title}</p>
                <p>{item.music.artist}</p>
                <p>{item.music.albumTitle}</p>
                <p>{item.music.duration}s</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div>
        Musique récentes écoutés :
        {history.map((item, index) => (
          <div className="fav" id={index} key={item.music.id + index}>
            <Link to={`/reader/track/${item.music.id}`}>
              <img src={item.music.albumCover} className="cover" />
              <div className="info">
                <p>{item.music.title}</p>
                <p>{item.music.artist}</p>
                <p>{item.music.albumTitle}</p>
                <p>{item.music.duration}s</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/playlists">Playlist</Link>
      <Link to="/favorites">Favoris</Link>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
};

export default Profile;
