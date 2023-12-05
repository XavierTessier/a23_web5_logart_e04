import { useState } from "react";
import { useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import '../css/Liste.css';
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import Like from "./Like";
import { Navigate } from "react-router-dom";

const AffichageElements = ({ categorieChercher, type, }) => {
  const [listeCategorie, setListeCategorie] = useState(null);
  const [link, setLink] = useState("");
  let test = null;
  useEffect(() => {
    const fetchByCategorie = async () => {
      try {
        const resp = await fetchJsonp(`https://api.deezer.com/${categorieChercher}&output=jsonp`);
        if (!resp) throw new Error('Network response was incorrect');
        const data = await resp.json();
        setListeCategorie(data[type].data);
      } catch (error) {
        console.error(`Error fetching ${categorieChercher}:`, error);
      }
    };
    fetchByCategorie();

  }, []);
  const fetchTest = async (id) => {
    console.log("try to fetch");
    try {
      console.log("async fetch");

      const resp = await fetchJsonp(`https://api.deezer.com/album/${id}/tracks&output=jsonp`);
      if (!resp) throw new Error('Network response was incorrect');
      const data = await resp.json();
      console.log(data.data[0].id);
      if (data) setLink(data.data[0].id);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
    return link;
  };
  const fetchTracks = async (id) => {
    const resp = await fetchJsonp(`https://api.deezer.com/album/${id}/tracks&output=jsonp`);
    if (!resp) throw new Error('Network response was incorrect');
    const data = await resp.json();

    // await setLink(data.data[0].id);
    return id;
  }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const getDisplayValue = (element) => {
    switch (type) {
      case "artists":
        return {
          text: element.name,
          image: element.picture_medium,
          link: '/artist/' + element.id,
          debug: () => { console.log(element.type) }
        };
      // '/reader/track/' + 
      case "albums":
        const getAlbumLink = async () => {
          const trackId = await fetchTest(element.id);
          return '/reader/track/' + trackId;
        };

        return {
          text: element.title,
          image: element.cover_medium,
          link: getAlbumLink(),
          debug: () => { console.log(element.type) }
        };
      case "tracks":
        return {
          text: element.title,
          image: element.album.cover_medium,
          link: '/reader/track/' + element.id,
          debug: () => { console.log(element.type) }
        };
      default:
        return element.title;
    }
  };

  return (
    <div>
      <h2 className="recommander">{capitalizeFirstLetter(type)} recommander</h2>
      <ul className="liste_elements">
        {
          listeCategorie && listeCategorie.map((element) => (
            <li key={element.id}>
              <p>{getDisplayValue(element).text}</p>
              <Link to={getDisplayValue(element).link} state={element}>
                <div className="white"><HiDotsHorizontal /></div>
                <div className="coeur"><Like /></div>
                <div className="opacite"></div>
                <img src={getDisplayValue(element).image} alt="" />
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
export default AffichageElements;