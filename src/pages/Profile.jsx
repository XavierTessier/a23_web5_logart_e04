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
import Footer from "../components/Footer";
import AffichageElements from "../components/AffichageElements";
import { HiDotsHorizontal } from "react-icons/hi";
import Like from "../components/Like";
import "../css/Liste.css";

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
    <div>
      <Helmet>
        <title>Tune-Up | Profil</title>
      </Helmet>
      <div className="user">
        <div className="opacite"></div>
        <img src="src\img\png\Baniere.png" alt="" className="vinyles" />
        <img src="src\img\png\Baniere2.png" alt="" className="vinyles2" />
        <img src="src\img\png\Baniere3.png" alt="" className="vinyles3" />
        <h2 className="name">{user.displayName}</h2>
        <img src={user.photoURL} alt="avatar" className="avatar" />
      </div>
      {/* <p>Email : {user.email}</p> */}
      {/* <div>
        <h2 className="recommander">vos plus écoutés</h2>
      </div> */}
      <div className="listes">
        <h2 className="recommander">Musique tendance</h2>
        <div className="liste_elements">
          {topMusic.map((item, index) => (
            <div className="fav" id={index} key={item.music.id}>
              <li>
                <p>{item.music.title}</p>
                <Link to={`/reader/track/${item.music.id}`}>
                  <div className="white"><HiDotsHorizontal /></div>
                  <div className="coeur"><Like /></div>
                  <div className="opacite"></div>
                  <img src={item.music.albumCover}/>
                  {/* <p>{item.music.artist}</p>
                  <p>{item.music.albumTitle}</p>
                  <p>{item.music.duration}s</p> */}
                </Link>
              </li>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="recommander">Musique récentes écoutés :</h2>
        <div className="liste_elements">
          {history.map((item, index) => (
            <div className="fav" id={index} key={item.music.id + index}>
              <li>
                <p>{item.music.title}</p>
                <Link to={`/reader/track/${item.music.id}`}>
                  <div className="white">
                    <HiDotsHorizontal />
                  </div>
                  <div className="coeur">
                    <Like />
                  </div>
                  <div className="opacite"></div>
                  <img src={item.music.albumCover} />
                  {/* <p>{item.music.artist}</p>
                      <p>{item.music.albumTitle}</p>
                      <p>{item.music.duration}s</p> */}
                </Link>
              </li>
            </div>
          ))}
        </div>
      </div>
      <div>
        <AffichageElements categorieChercher="chart" type="albums" />
        <AffichageElements categorieChercher="chart" type="artists" />
        <AffichageElements categorieChercher="chart" type="tracks" />
      </div>
      <Link to="/playlists">Playlist</Link>
      <Link to="/favorites">Favoris</Link>
      <button onClick={logout}>Déconnexion</button>
      <Footer />
    </div>
  );
};

export default Profile;
