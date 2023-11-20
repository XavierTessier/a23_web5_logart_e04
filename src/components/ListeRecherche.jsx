import { useState } from "react";
import { useAuth } from "../context/authContext";
import InfiniteScroll from "react-infinite-scroll-component";

const ListeRecherche = ({liste}) => {
    const { addMusicToUser, user, userData } = useAuth();

    return (
        <div className='results'>
                <InfiniteScroll
                    dataLength={liste.length}
                    next={liste.next}
                    hasMore={liste.next !== null}
                >
                {liste.data && liste.data.map((result) => (
                    <div className='card' key={result.id}>
                        <p className='title'>{result.title}</p>
                        <p className='artist'>{result.artist.name}</p>
                        {console.log(result)}
                        <p className='album'>{result.album.title}</p>
                        <img className='albumCover' src={result.album.cover_medium} alt=""/>
                        <button onClick={() => addMusicToUser(userData.playlist, result)}>Like</button>
                    </div>
                ))}
                </InfiniteScroll>
            </div>
    )
}

export default ListeRecherche;