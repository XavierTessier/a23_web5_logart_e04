import fetchJsonp from "fetch-jsonp";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";


const BarreRecherche = () => {

  const [query, setQuery] = useState({
    value: "",
  });
  const [buttonClicked, setButtonClicked] = useState(false);
  const [results, setResults] = useState([]);
  const [type, setType] = useState("track");
  const [limit, setLimit] = useState(10); // New state to track the number of results to load
  const observer = useRef();
  const { addMusicToUser, user, userData, addToFav, addToHistory } = useAuth();

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 10); // Increase the limit by 10 when the button is clicked
    setButtonClicked(true);
  };

  const handleType = (e) => {
    setType(e.target.value);
    console.log(type);
  };

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

  const handleLoadMoreDebounced = debounce(handleLoadMore, 200); // Adjust the delay as needed

  useEffect(() => {
    console.log("type changed : " + type);
  }, [type]);

  
  useEffect(() => {
    if (buttonClicked || type !== "") {
      const fetchResults = async () => {
        const resp = await fetchJsonp(
          `https://api.deezer.com/search/${type}?q=${query.value}&output=jsonp&limit=${limit}`
          );
          const data = await resp.json();
          setResults(data);
        };
      fetchResults();
      setButtonClicked(false);
    }
  }, [buttonClicked, type]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && results.data && results.data.length > 0) {
        // When the end of the list is reached and there are results, load more items
        handleLoadMoreDebounced();
      }
    }, options);

    if (observer.current && results.data && results.data.length > 0) {
      observer.current.observe(document.getElementById(`item-${results.data[results.data.length - 1].id}`));
    }


    // Cleanup the observer on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [results]);

  const displayList = (type) => {
    switch (type) {
        case "album":
            return (
                <div className='results'>
                        {results.data && results.data.map((result) => (
                            <div className='card' key={result.id} id={`item-${result.id}`}>
                                <p className='title'>{result.title}</p>
                                <p className='artist'>{result.artist && result.artist.name}</p>
                                <img className='albumCover' src={result.cover_medium} alt="" />
                            </div>
                        ))}
                </div>
            );
        case "artist":
            return (
                <div className='results'>
                    {results.data && results.data.map((result) => (
                        <div className='card' key={result.id} id={`item-${result.id}`}>
                            <p className='artist'>{result.name}</p>
                            <img className='picture' src={result.picture_medium} alt="" />
                        </div>
                    ))}
                </div>
            );
        case "track":
            return (
                <div className='results'>
                    {results.data && results.data.map((result) => (
                        <div className='card' key={result.id} id={`item-${result.id}`}>
                            <Link to={`reader/track/${result.id}`}>
                                <p className='title'>{result.title}</p>
                                <p className='artist'>{result.artist && result.artist.name}</p>
                                <p className='album'>{result.album && result.album.title}</p>
                                <img className='albumCover' src={result.album && result.album.cover_medium} alt="" />
                            </Link>
                            <button onClick={() => addMusicToUser(userData.playlist, { id: result.id, title: result.title, artist: result.artist.name, albumTitle: result.album.title, albumCover: result.album.cover_medium, duration: result.duration })}>Ajouter à la playlist</button>
                            <button onClick={() => addToFav(userData.favorites, { id: result.id, title: result.title, artist: result.artist.name, albumTitle: result.album.title, albumCover: result.album.cover_medium, duration: result.duration })}>Fav</button>
                            <button onClick={() => addToHistory({id: result.id, title: result.title, artist: result.artist.name, albumTitle: result.album.title, albumCover: result.album.cover_medium})}>historique</button>
                        </div>
                    ))}
                </div>
            );
        default:
            return (
                <div className='results'>
                    {liste.data && liste.data.map((result) => (
                        <div className='card' key={result.id} id={`item-${result.id}`}>
                            <p className='title'>{result.title}</p>
                            <p className='artist'>{result.artist && result.artist.name}</p>
                            <p className='album'>{result.album && result.album.title}</p>
                            <img className='albumCover' src={result.album && result.album.cover_medium} alt="" />
                            <button onClick={() => addMusicToUser(userData.playlist, { id: result.id, title: result.title, artist: result.artist.name, albumTitle: result.album.title, albumCover: result.album.cover_medium, duration: result.duration })}>Ajouter à la playlist</button>
                            <button onClick={() => addToFav(userData.favorites, { id: result.id, title: result.title, artist: result.artist.name, albumTitle: result.album.title, albumCover: result.album.cover_medium, duration: result.duration })}>Fav</button>
                        </div>
                    ))}
                </div>
            );
    }
};

  return (
    <div>
      <form action="">
        <input
          type="text"
          placeholder="Query for Api"
          onChange={updateState}
          value={query.value}
        />
        <button onClick={handleSearch} disabled={!isValid()}>
          Search
        </button>

        <input
          type="radio"
          id="album"
          name="type"
          value="album"
          onClick={handleType}
        />
        <label htmlFor="album">Album</label>

        <input
          type="radio"
          id="artist"
          name="type"
          value="artist"
          onClick={handleType}
        />
        <label htmlFor="artist">Artist</label>

        <input
          type="radio"
          id="track"
          name="type"
          value="track"
          onClick={handleType}
        />
        <label htmlFor="track">Track</label>

        <h1>Looking for {type} </h1>
      </form>

      {displayList(type)}
    </div>
  );
};

export default BarreRecherche;
