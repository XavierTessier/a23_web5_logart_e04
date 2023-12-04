import { useMusic } from "../context/musicContext";
import { useEffect, useState } from "react"; // Import the useEffect and useState hooks
import "../css/info-track.css";

const InfoMusic = () => {
  const { album, choosenTrack } = useMusic();
  const [grosseurfenetres, setGrosseurfenetres] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setGrosseurfenetres(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Detach the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return grosseurfenetres >= 768 ? (
    <section className="info-track">
      <ul>
        <li>Album: {album?.title}</li>
        <li>Année: {choosenTrack?.release_date}</li>

        <ul>
          {/* can't access to genre right now */}
          <li>Genre</li>
          {album?.genre?.data.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </ul>
    </section>
  ) : (
    <section className="info-track"></section>
  );
};

export default InfoMusic;
