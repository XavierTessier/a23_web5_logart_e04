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
  };

  const isValid = () => {
    return query.value !== "";
  };

  const updateState = (e) => {
    setQuery({ ...query, value: e.target.value });
    console.log(query.value);
  };

  useEffect(() => {
    if (buttonClicked) {
      const fetchResults = async () => {
        const resp = await fetchJsonp(
          `https://api.deezer.com/search?q=${query.value}&output=jsonp`
        );
        const data = await resp.json();
        setResults(data);
      };
      fetchResults();
      setButtonClicked(false);
    }
  }, [buttonClicked]);

  return (
    <div>
      <form
        action=""
        className="fixed barre-recherche bg-corail-reg p-4 w-full text-center"
      >
        <input
          className="rounded-md px-2 py-1 w-7/12"
          type="text"
          placeholder="Explorez de nouveaux rythmes"
          onChange={updateState}
          value={query.value}
        />
        <button
          className="ml-2 bg-corail-clair rounded-md px-2 py-1"
          onClick={handleSearch}
          disabled={!isValid()}
        >
          Recherche
        </button>
      </form>

      <ListeRecherche liste={results} />
    </div>
  );
};

export default BarreRecherche;
