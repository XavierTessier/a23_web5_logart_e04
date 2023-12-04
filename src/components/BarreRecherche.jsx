import fetchJsonp from "fetch-jsonp";
import { useState, useEffect } from "react";
import ListeRecherche from "./ListeRecherche";

const BarreRecherche = () => {
    
    const [query, setQuery] = useState({
        value: "",
    });
    const [buttonClicked, setButtonClicked] = useState(false);
    const [results, setResults] = useState([]);
    const [type, setType] = useState("track");


    const handleType = (e) => {
        setType(e.target.value);
        console.log(type);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setButtonClicked(true);
    }

    const isValid = () => {
        return query.value !== "";
    }

    const updateState = (e) => {
        setQuery({...query, value: e.target.value});
        console.log(query.value);
    }

    useEffect(() => {
        console.log("type changed : " + type);
    }, [type]);

    useEffect(() => {
        if(buttonClicked || type !== "") {
            const fetchResults = async () => {
                const resp = await fetchJsonp(`https://api.deezer.com/search/${type}?q=${query.value}&output=jsonp`);
                const data = await resp.json();
                setResults(data);
            }
            fetchResults();
            setButtonClicked(false);
        }
    }, [buttonClicked, type]);

    return (
        <div>
            <form action="">
                <input type="text" placeholder="Query for Api" onChange={updateState} value={query.value}/>
                <button onClick={handleSearch} disabled={!isValid()}>Search</button>

                <input type="radio" id="album" name="type" value="album" onClick={handleType}/>
                <label htmlFor="album">Album</label>

                <input type="radio" id="artist" name="type" value="artist" onClick={handleType}/>
                <label htmlFor="artist">Artist</label>

                <input type="radio" id="track" name="type" value="track" onClick={handleType}/>
                <label htmlFor="track">Track</label>

                <h1>Looking for {type} </h1>
            </form>

            <ListeRecherche liste={results} type={type}/>
        </div>
    )
}

export default BarreRecherche;