const ListeRecherche = ({liste}) => {
    return (
        <div className='results'>
                {liste.data && liste.data.map((result) => (
                    <div className='card' key={result.id}>
                        <p className='title'>{result.title}</p>
                        <p className='artist'>{result.artist.name}</p>
                        {console.log(result.artist)}
                        <p className='album'>{result.album.title}</p>
                        <img className='albumCover' src={result.album.cover_medium} alt=""/>
                    </div>
                ))}
            </div>
    )
}

export default ListeRecherche;