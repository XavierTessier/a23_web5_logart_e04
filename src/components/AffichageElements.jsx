import { useState } from "react";
import { useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import '../css/Liste.css';
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import Like from "./Like";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const AffichageElements = ({ categorieChercher, type, }) => {
  const {userData, addToFav } = useAuth();
  const [myInfos, setMyInfos] = useState({
    charts:null,
    tracksFromAlbums:[]
  });
  useEffect(() => {
    const fetchByCategorie = async () => {
      try {
        const resp = await fetchJsonp(`https://api.deezer.com/${categorieChercher}&output=jsonp`);
        if (!resp) throw new Error('Network response was incorrect');
        const data = await resp.json();
        setMyInfos((current) => ({
          ...current,
          charts: data,
        }));
        return data;
      } catch (error) {
        console.error(`Error fetching ${categorieChercher}:`, error);
        throw error;
      }
    };
  
    const fetchByID = async (id) => {
      try {
        const resp = await fetchJsonp(`https://api.deezer.com/album/${id}/tracks&output=jsonp`);
        if (!resp) throw new Error('Network response was incorrect');
        const data = await resp.json();
        return data;
      } catch (error) {
        console.error(`Error fetching album tracks for ID ${id}:`, error);
        throw error;
      }
    };
  
    const fetchData = async () => {
      try {
        const categorieData = await fetchByCategorie();
        if(type == "albums") {
          if (categorieData && categorieData.albums && categorieData.albums.data) {
            const albumDataArray = categorieData.albums.data;
            const tracksPromises = albumDataArray.map((element) => fetchByID(element.id));
            const allTracksData = await Promise.all(tracksPromises);
            setMyInfos((current) => ({
              ...current,
              tracksFromAlbums: allTracksData,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
   
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const getDisplayValue = (element, index=0) => {
    switch (type) {
      case "artists":
        return {
          text: element.name,
          image: element.picture_medium,
          link: "/discover/artist/" + element.id,
        };
      case "albums":
        return {
          text: element.title,
          image: element.cover_medium,
          link: "/reader/track/" + myInfos.tracksFromAlbums[index]?.data[0]?.id,
        };
      case "tracks":
        return {
          text: element.title,
          image: element.album.cover_medium,
          link: "/reader/track/" + element.id,
          albumTitle:element.album.title,
          artistName:element.artist.name,
          duration:element.duration

        };
      default:
        return element.title;
    }
  };
  if(myInfos.tracksFromAlbums != null)
  if(myInfos.charts?.artists != null)
  console.log(myInfos.charts[type]);
  return (
    <div>
      <h2 className="recommander">{capitalizeFirstLetter(type)} recommander</h2>
      <ul className="liste_elements">
        {
          (myInfos.charts && myInfos.tracksFromAlbums || type != "albums") && myInfos.charts?.[type].data.map((element,index) => (
            <li key={element.id}>
              <p>{getDisplayValue(element).text}</p>
                {(type == "tracks") &&
                  <div onClick={(e) => {
                    addToFav(userData.favorites, {
                      id: getDisplayValue(element).text,
                      title: getDisplayValue(element).text,
                      artist: getDisplayValue(element).artistName,
                      albumTitle: getDisplayValue(element).albumTitle,
                      albumCover: getDisplayValue(element).image,
                      duration: getDisplayValue(element).duration
                    })}}  className="coeur"><Like /></div>
                  }
                      <Link to={getDisplayValue(element,index).link} state={element}>
                <div className="white"><HiDotsHorizontal /></div>
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

