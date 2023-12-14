import { useEffect } from "react";
import AlbumInfo from "../components/InfosDiscovAlbum";
import ArtistInfo from "../components/InfosDiscovArtist";
import TrackInfo from "../components/InfosDiscovTrack";
import DiscoversInfosBase from "../components/DiscoversInfoBase";
import { useMusic } from "../context/musicContext";
import { useParams } from "react-router-dom";

/*
What to do:
-----------
1.Fetch the data needed to display
what you are looking for.
2.
*/

const Discovers = () => {
    const { id, categorie } = useParams();
    const {musicData, getBySearch} = useMusic();
    // getBySearch(`artist/${id}`,"artist");
    getBySearch(`${categorie}/${id}`,categorie);
    // getBySearch(`artist/${id}/albums`,"albums");
    // getBySearch(`search/artist?q=`,"albums");
    let contenu = null;
    console.log(musicData[categorie]?.album.id);
    if(musicData[categorie] != null){
        switch(categorie){
            case "album": contenu = <AlbumInfo musicData={musicData} onSearch={getBySearch} id={id}/>;break;
            case "artist": contenu = <ArtistInfo musicData={musicData} onSearch={getBySearch} id={id}/>;break;
            case "track": contenu = <TrackInfo musicData={musicData} onSearch={getBySearch} album_id={musicData[categorie]?.album.id}/>;break;;
            default: contenu = null;
        }
    }
    console.log("Welcome on discovers");
    console.log(musicData);
    return (
        (musicData[categorie])?
        <section className="Discovers">
            {/* h1 + img */}
            <DiscoversInfosBase musicData={musicData[categorie]}/>
            {contenu}
        </section>
        : null
    );
}
export default Discovers;