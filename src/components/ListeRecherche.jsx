import { useState } from "react";
import { useAuth } from "../context/authContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const ListeRecherche = ({ liste, type }) => {
    const { addMusicToUser, user, userData, addToFav } = useAuth();
    console.log(userData);

    const displayList = (type) => {
        switch (type) {
            case "album":
                return (
                    <div className='results'>
                            {liste.data && liste.data.map((result) => (
                                <div className='card' key={result.id}>
                                    <p className='title'>{result.title}</p>
                                    <p className='artist'>{result.artist && result.artist.name}</p>
                                    {console.log(result)}
                                    <img className='albumCover' src={result.cover_medium} alt="" />
                                </div>
                            ))}
                    </div>
                );
            case "artist":
                return (
                    <div className='results'>
                            {liste.data && liste.data.map((result) => (
                                <div className='card' key={result.id}>
                                    <p className='artist'>{result.name}</p>
                                    <img className='picture' src={result.picture_medium} alt="" />
                                </div>
                            ))}
                    </div>
                );
            case "track":
                return (
                    <div className='results'>
                            {liste.data && liste.data.map((result) => (
                                <div className='card' key={result.id}>
                                    <p className='title'>{result.title}</p>
                                    <p className='artist'>{result.artist && result.artist.name}</p>
                                    {console.log(result)}
                                    <p className='album'>{result.album && result.album.title}</p>
                                    <img className='albumCover' src={result.album && result.album.cover_medium} alt="" />
                                    <button onClick={() => addMusicToUser(userData.playlist, result)}>Like</button>
                                    <button onClick={() => addToFav(userData.favorites, result)}>Fav</button>
                                </div>
                            ))}
                    </div>
                );
            default:
                return (
                    <div className='results'>
                            {liste.data && liste.data.map((result) => (
                                <div className='card' key={result.id}>
                                    <p className='title'>{result.title}</p>
                                    <p className='artist'>{result.artist && result.artist.name}</p>
                                    {console.log(result)}
                                    <p className='album'>{result.album && result.album.title}</p>
                                    <img className='albumCover' src={result.album && result.album.cover_medium} alt="" />
                                    <button onClick={() => addMusicToUser(userData.playlist, result)}>Like</button>
                                    <button onClick={() => addToFav(userData.favorites, result)}>Fav</button>
                                </div>
                            ))}
                    </div>
                );
        }
    };

    return (
        displayList(type)
    )
}

export default ListeRecherche;