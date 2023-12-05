import { useEffect } from "react";
import { useMusic } from "../context/musicContext";
import { FaPlay, FaPause } from "react-icons/fa6";
import "../css/tracks.css";

const Tracks = () => {
  const { tracks, choosenTrack } = useMusic();
  const FormatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds}`;
  };
  return (
    <section className="tracks">
      {console.log("mes tracks: " + tracks[0])}
      <p className="album-name">{/*nom de l'album*/} Immortalized</p>
      <ul>
        {tracks.map(({ title, id }) => (
          <li
            key={id}
            style={{ color: id === choosenTrack.id ? "red" : "black" }}
            className={
              id === choosenTrack.id
                ? "flex flex-row items-center mb-4 active rounded"
                : "flex flex-row items-center mb-4"
            }
          >
            <p className="duration mr-4">{/*FormatTime(choosenTrack)*/}1:35</p>
            <FaPlay className="mr-5" />
            <p className="song-title">{title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Tracks;
