import { Reorder } from "framer-motion";
import { useAuth } from "../context/authContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Playlists = () => {
  const { user, playlist, deleteMusic, setUserData, userData } = useAuth();

  return (
    <div className="playlist h-screen">
      <h1>Votre playlist</h1>
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
              <img src={item.info.albumCover} className="cover" />
              <div className="info">
                <p>{item.info.title}</p>
                <p>{item.info.artist}</p>
                <p>{item.info.albumTitle}</p>
                <p>{item.info.duration}s</p>
              </div>

              <button
                className="Delete"
                onClick={() => deleteMusic(playlist, item.info.id)}
              >
                Delete
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
