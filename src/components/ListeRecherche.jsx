import { useAuth } from "../context/authContext";

const ListeRecherche = ({liste}) => {

    const onClickHandler = (result) => {
        addMusicToUser(user.uid, result.title, result.link);
    }
    const { addMusicToUser, user } = useAuth();
    return (
        <div className='results'>
                {liste.data && liste.data.map((result) => (
                    <div className='card' key={result.id}>
                        <p className='title'>{result.title}</p>
                        <p className='artist'>{result.artist.name}</p>
                        {console.log(result)}
                        <p className='album'>{result.album.title}</p>
                        <img className='albumCover' src={result.album.cover_medium} alt=""/>
                        <button onClick={onClickHandler(result)}>Like</button>
                    </div>
                ))}
            </div>
    )
}

export default ListeRecherche;