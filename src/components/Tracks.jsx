import { useEffect } from "react";
import { useMusic } from "../context/musicContext";
import "../css/tracks.css";

const Tracks = () => {
  const { tracks, choosenTrack } = useMusic();
  return (
    <section className="tracks">
      {console.log("mes tracks: " + tracks[0])}
      {console.log(tracks[0])}
      <ul>
        {tracks.map(({ title, id }) => (
          <li
            key={id}
            style={{ color: id === choosenTrack.id ? "red" : "black" }}
          >
            {title}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Tracks;
