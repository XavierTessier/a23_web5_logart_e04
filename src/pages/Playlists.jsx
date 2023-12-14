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
import PlayButton from "../components/Play-playlist";

const Playlists = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user, playlist, deleteMusic, setUserData, userData, addToFav } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const truncateText = (text, maxLength, width) => {
    const splice = width <= 678 ? width / 50 : 1000000;
    console.log(splice);

    return text.length > maxLength ? text.slice(0, splice) + "..." : text;
  };

  const getTotalDuration = () => {
    const totalDuration = playlist.reduce((acc, item) => {
      return acc + item.info.duration;
    }, 0);

    return totalDuration;
  }

  // const FormatTime = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time % 60;
  //   const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  //   return `${minutes}:${formattedSeconds}`;
  // };

  const FormatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const remainingMinutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
   
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
   
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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
              <h2 className="name-user text-2xl">{user.displayName}</h2>
              <h2 className="nb-track text-xl">{playlist.length} chansons</h2>
              {windowWidth >= 768 ? <h2>{FormatTime(getTotalDuration())}</h2> : <></>}
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
              <Link to={`/reader/track/${item.info.id}`} className="play-btn">
                <PlayButton />
              </Link>
              <img src={item.info.albumCover} className="cover rounded-md" />
              <div className="info">
                <p className="song-title">
                  {truncateText(item.info.title, 10, windowWidth)}
                </p>
                {windowWidth >= 1200 ? (
                  <div className="wrapper-info-desk flex flex-row gap-9">
                    <p className="song-duration">
                      {FormatTime(item.info.duration)}
                    </p>
                    <div onClick={() => addToFav(userData.favorites, {
                      id: item.info.id,
                      title: item.info.title,
                      artist: item.info.artist,
                      albumTitle: item.info.albumTitle,
                      albumCover: item.info.albumCover,
                      duration: item.info.duration,
                    })}>
                      <Like />
                    </div>
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
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
};

export default Playlists;
