import { Reorder } from "framer-motion";
import { useAuth } from "../context/authContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import "../css/playlist.css";
import Vinyle from "../components/VinylePlaylist";
import ButtonAdd from "../components/ButtonAdd";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Like from "../components/Like";

const Playlists = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user, playlist, deleteMusic, setUserData, userData } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const truncateText = (text, maxLength, width) => {
    const splice = width <= 678 ? width / 25 : 1000000;

    return text.length > maxLength ? text.slice(0, splice) + "..." : text;
  };

  const FormatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div className="playlist w-full mb-16">
      <div className="entete-playlist items-center w-full">
        <Vinyle
          img="src/img/jpg/pexels-cottonbro-studio-4629625.jpg"
          className="vinyle-playlist"
        />
        <div className="entete-info-playlist mb-16 w-full">
          <h1 className="titre-page">Votre playlist</h1>
          <div className="wrapper-info flex flex-row">
            <div className="info-playlist flex flex-col gap-2">
              <h2 className="name-user text-2xl">Yannick Charles</h2>
              <h2 className="nb-track text-xl">56 chansons</h2>
              {windowWidth >= 768 ? <h2>3 h 32 min </h2> : <></>}
            </div>
            <div className="add relative ">
              <ButtonAdd />
            </div>
          </div>
        </div>
      </div>
      {playlist && (
        <Reorder.Group
          axis="y"
          values={playlist}
          onReorder={(values) => {
            // values est la liste réordonnée
            setUserData({ ...userData, playlist: values }); // on met à jour le state de userData, qui contient la playlist
            updateDoc(doc(db, "users", user.uid), { playlist: values }); // on met à jour la playlist dans la base de données
          }}
        >
          {playlist.map((item, index) => (
            <Reorder.Item key={item.info.id} className="song" value={item}>
              <img src={item.info.albumCover} className="cover rounded-md" />
              <div className="info">
                <p className="song-title">
                  {truncateText(item.info.title, 12, windowWidth)}
                </p>
                {windowWidth >= 1200 ? (
                  <div className="wrapper-info-desk flex flex-row gap-9">
                    <p className="song-duration">
                      {FormatTime(item.info.duration)}
                    </p>
                    <Like />
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <button
                className="Delete justify-self-end"
                onClick={() => deleteMusic(playlist, item.info.id)}
              >
                <FaTrash />
              </button>

              <Link to={`/reader/track/${item.info.id}`}>
                <button className="Play">Play</button>
              </Link>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
};

export default Playlists;
