import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";

import PlayButton from "../components/Play-playlist";

import "../css/favorties.css";

const Favorites = () => {
  const { user, setUserData, userData, removeFromFav } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const FormatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutes} min et ${formattedSeconds} sec`;
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="favori h-screen">
      <h2 className="titre-fav">Vos Favoris</h2>
      {userData.favorites &&
        userData.favorites.map((item, index) => (
          <div className="wrapper-info-fav" id={index} key={item.info.id}>
            <div className="fav-info">
              <Link to={`/reader/track/${item.info.id}`}>
                <button className="Play">
                  <PlayButton />
                </button>
              </Link>
              <img src={item.info.albumCover} className="cover" />
              <div className="info">
                <p className="titre-song">{item.info.title}</p>
                {windowWidth >= 1600 ? (
                  <p className="artist-fav">{item.info.artist}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <button
              className="supprimer"
              onClick={() => removeFromFav(userData.favorites, item.info.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
    </div>
  );
};

export default Favorites;
