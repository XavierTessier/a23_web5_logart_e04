import { useEffect } from "react";
import AlbumInfo from "../components/InfosDiscoAlbum";
import ArtistInfo from "../components/InfosDiscoArtist";
import TrackInfo from "../components/InfosDiscoTrack";
const Discovers = () => {
    const fetchData = () => {

    }
    const infosClicked = "";
    const contenu = null;
    switch(infosClicked){
        case "album": contenu = <AlbumInfo/>;break;
        case "artist": contenu = <ArtistInfo/>;break;
        case "track": contenu = <TrackInfo/>;break;
    }
    return (
        <div className="Discovers">
            {contenu}
        </div>
    );
}