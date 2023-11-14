import { useState } from "react";
import { useEffect } from "react";
import fetchJsonp from "fetch-jsonp";

const AffichageElements = ({categorieChercher, type, }) => {
  const [listeCategorie, setListeCategorie] = useState(null);
  // const [categorie, setCategorie] = useState([]);
  useEffect(() => {
    const fetchByCategorie = async () => {
        try {
            const resp = await fetchJsonp(`https://api.deezer.com/${categorieChercher}&output=jsonp`);
            if(!resp) throw new Error('Network response was incorrect');
            const data = await resp.json();
            console.log(data)
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
        };
      case "albums":
        return {
          text: element.title,
          image: element.cover_medium,
        }; // You can adjust this as needed
      // Add more cases as needed
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
              <img src={getDisplayValue(element).image} alt="" />
              </li>
          ))
          
        }
      </ul>
    </div>
    );
}
export default AffichageElements;