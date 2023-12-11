import { useEffect } from "react";
import { useMusic } from "../context/musicContext";
import { FaPlay, FaPause } from "react-icons/fa6";
import "../css/tracks.css";

const Tracks = () => {
  const { tracks, choosenTrack, album } = useMusic();
  const FormatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds}`;
  };
  
  return (
    <section className="tracks">
      {console.log("mes tracks: " + tracks[0])}
      <p className="album-name">{album?.title}</p>
      <ul>
        {tracks.map(({ title, id }) => (
          <li
            key={id}
            className={
              id === choosenTrack.id
                ? "flex flex-row items-center mb-3 active rounded"
                : "flex flex-row items-center mb-3"
            }
          >
            <p className="duration mr-4">{/*FormatTime(choosenTrack)*/}1:35</p>
            {id === choosenTrack.id ? (
              <FaPause className="mr-5" />
            ) : (
              <FaPlay className="mr-5" />
            )}
            <p className="song-title">{title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Tracks;
