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

  return grosseurfenetres >= 1600 ? (
    <section className="info-track rounded-xl">
      <ul>
        <div className="border rounded-xl"></div>
        {/* <li>Artiste: {choosenTrack.artist.name}</li> */}
        <li>
          <span className="texte-info">Album:</span> {album?.title}
        </li>
        <li>
          <span className="texte-info">Année:</span>{" "}
          {choosenTrack?.release_date}
        </li>
        <li>
          <span className="texte-info">Genre:</span>{" "}
          {album?.genre ? album.genre.data[0].name : "Inconnu"}
        </li>
        {/* 
        <ul>
          can't access to genre right now
          <li>Genre</li>
          {album?.genre?.data.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul> */}
      </ul>
    </section>
  ) : (
    <section className="info-track-mobile flex flex-col">
      <ul>
        {/* <li className="text-4xl font-bold">{choosenTrack.title}</li>
        <li className="text-2xl italic">{choosenTrack.artist.name}</li> */}
      </ul>
    </section>
  );
};

export default InfoMusic;
