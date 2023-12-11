import { Reorder } from "framer-motion";
import { useAuth } from "../context/authContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import "../css/playlist.css";
import Vinyle from "../components/VinylePlaylist";
import ButtonAdd from "../components/ButtonAdd";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

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
    console.log(splice);
    return text.length > maxLength ? text.slice(0, splice) + "..." : text;
  };

  return (
    <div className="playlist h-screen w-full">
      <div className="entete-playlist flex flex-col items-center w-full">
        <Vinyle
          img="src/img/jpg/pexels-cottonbro-studio-4629625.jpg"
          className="vinyle-playlist"
        />
        <div className="entete-info-playlist mb-12">
          <h1 className="titre-page">Votre playlist</h1>
          <div className="wrapper-info flex flex-row">
            <div className="info-playlist flex flex-col gap-2">
              <h2 className="name-user text-2xl">Yannick Charles</h2>
              <h2 className="nb-track text-xl">56 chansons</h2>
              {windowWidth >= 1200 ? <h2>3 h 32 min </h2> : <></>}
            </div>
            <div className="add relative mx-auto">
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
              <img src={item.info.album.cover} className="cover rounded-md" />
              <div className="info">
                <p className="song-title">
                  {truncateText(item.info.title, 12, windowWidth)}
                </p>
                {windowWidth >= 1200 ? (
                  <p className="song-duration">{item.info.duration}</p>
                ) : (
                  <></>
                )}
              </div>
              <button
                className="Delete justify-self-end"
                onClick={() => deleteMusic(playlist, item.info.id)}
              >
                <FaTrash className="text-2xl" />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
};

export default Playlists;
