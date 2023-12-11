import { Reorder } from "framer-motion";
import { useAuth } from "../context/authContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import "../css/playlist.css";
import Vinyle from "../components/VinylePlaylist";
import { IoAdd } from "react-icons/io5";

const Playlists = () => {
  const { user, playlist, deleteMusic, setUserData, userData } = useAuth();

  return (
    <div className="playlist h-screen w-full">
      <div className="entete-playlist flex flex-row items-end">
        <Vinyle
          img="src/img/jpg/pexels-cottonbro-studio-4629625.jpg"
          className="vinyle-playlist"
        />
        <div className="entete-info-playlist mb-12">
          <h1 className="titre-page">Votre playlist</h1>
          <div className="info-playlist flex flex-row gap-6">
            <h2>Yannick Charles</h2>
            <h2>56 chansons</h2>
            <h2>3 h 32 min </h2>
          </div>
        </div>
        <IoAdd className="text-7xl mb-24 ml-24 " />
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
              <img src={item.info.album.cover} className="cover" />
              <div className="info">
                <p>{item.info.title}</p>
                <p>{item.info.artist.name}</p>
                <p>{item.info.album.title}</p>
                <p>{item.info.duration}s</p>
              </div>
              <button
                className="Delete"
                onClick={() => deleteMusic(playlist, item.info.id)}
              >
                Delete
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
};

export default Playlists;
