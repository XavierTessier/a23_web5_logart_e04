import fetchJsonp from "fetch-jsonp";
import { useState, useEffect } from "react";
import ListeRecherche from "./ListeRecherche";

const BarreRecherche = () => {
    
    const [query, setQuery] = useState({
        value: "",
    });
    const [buttonClicked, setButtonClicked] = useState(false);
    const [results, setResults] = useState([]);

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
        if(buttonClicked) {
            const fetchResults = async () => {
                const resp = await fetchJsonp(`https://api.deezer.com/search?q=${query.value}&output=jsonp`);
                const data = await resp.json();
                setResults(data);
            }
            fetchResults();
            setButtonClicked(false);
        }
    }, [buttonClicked]);

    return (
        <div>
            <form action="">
                <input type="text" placeholder="Query for Api" onChange={updateState} value={query.value}/>
                <button onClick={handleSearch} disabled={!isValid()}>Search</button>
            </form>

            <ListeRecherche liste={results} />
        </div>
    )
}

export default BarreRecherche;