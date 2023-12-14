
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const InfosDiscovArtist = ({musicData,onSearch,id}) => {
    const [genre_id,setGenre_id] = useState(null);
    onSearch(`artist/${id}/albums`,"albums", "15");
    onSearch(`genre/${genre_id}/artists`,"artists", "10");
    useEffect(() => {
        const searchArtists = () => {
            if(musicData.albums == null) return;
            let randomIndex = Math.floor(Math.random() * musicData.albums.length);
            setGenre_id (musicData?.albums[randomIndex]?.genre_id);
            console.log('USEEFFECT TRIGGERED');
        }
        searchArtists();
    },[musicData.albums]);
    if(musicData.albums == null) return;
    console.log(musicData.artists);
    return (
        <section className="infosDiscovArtist">
            <div>
                {/*Ses albums*/}
                {console.log(musicData.albums)}
                {musicData.albums.map(({id,title, cover})=>(
                    <Link to={"/discovers/album/"+id}>
                    <div key={cover}>
                        <h2>{title}</h2>
                        <img src={cover} alt="" />
                    </div>
                    </Link>
                ))}
            </div>
            <div className="artistes-similaire">
                {musicData.artists && musicData.artists.map(({id,name,picture},index) => (
                    (index < 10)?
                    <Link to={"/discovers/artist/"+id}>
                    <div key={name}>
                        <div>{name}</div>
                        <img src={picture} alt="" />
                    </div>
                    </Link>
                    :null
                ))}
            </div>
        </section>
    );
}
export default InfosDiscovArtist;
