import { useState } from "react";
import { useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const AffichageElements = ({categorieChercher, type, }) => {
  const [listeCategorie, setListeCategorie] = useState(null);
  let test = null;
  useEffect(() => {
    const fetchByCategorie = async () => {
        try {
            const resp = await fetchJsonp(`https://api.deezer.com/${categorieChercher}&output=jsonp`);
            if(!resp) throw new Error('Network response was incorrect');
            const data = await resp.json();
            // console.log(data);
            setListeCategorie(data[type].data);
        }catch (error){
            console.error(`Error fetching ${categorieChercher}:`,error);
        }
    };
    fetchByCategorie();

  },[]);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const getDisplayValue = (element) => {
    switch (type) {
      case "artists":
        return {
          text: element.name,
          image: element.picture_medium,
          toReader:(e) => {},
          toDetails:(e) => {},
          debug:() => {console.log(element.type)}
        };
      case "albums":
        return {
          text: element.title,
          // trackId: element.tracks.data[0].id,
          image: element.cover_medium,
          toReader:(e) => {console.log(e)},
          toDetails:(e) => {},
          debug:() => {console.log(element.type)}
        };
      case "tracks":
        return {
          text: element.title,
          image: element.album.cover_medium,
          toReader:(e) => {},
          toDetails:(e) => {},
          debug:() => {console.log(element.type)}
        };
      default:
        return element.title;
      }
      
  };

  return (
        <div>
      <h2>{capitalizeFirstLetter(type)} recommander</h2>
      <ul>
        {
          listeCategorie && listeCategorie.map((element) => (
            <li key={element.id}>
              <p>{getDisplayValue(element).text}</p>
              <Link to={`/reader/track/${element.track}`} state = {element}>
                <img onClick = {getDisplayValue(element).toReader} src={getDisplayValue(element).image} alt="" />
              </Link>
              </li>
          ))
        }
      </ul>
    </div>
    );
}
export default AffichageElements;