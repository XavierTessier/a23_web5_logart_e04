import { useState } from "react";
import { useEffect } from "react";
import fetchJsonp from "fetch-jsonp";

const AffichageElements = ({categorieChercher}) => {
    const [categorie, setCategorie] = useState([]);
    useEffect(() => {
        const fetchByCategorie = async () => {
            try {
                const resp = await fetchJsonp(`https://api.deezer.com/chart/${categorieChercher}s&output=jsonp`);
                if(!resp) throw new Error('Network response was incorrect');
                const data = await resp.json();
                console.log(data)
                setCategorie(data.data);
            }catch (error){
                console.error(`Error fetching ${categorieChercher}:`,error);
            }
        };
        fetchByCategorie();

    },[]);
    return (
        <div>
      <h1>Deezer Album Search</h1>
      <ul>
        {
        
        /* {categorie.map((element) => (
          <li key={element.id}>untest</li>
        ))} */}
      </ul>
    </div>
    );
}
export default AffichageElements;