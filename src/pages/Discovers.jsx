import { useEffect } from "react";
import AlbumInfo from "../components/InfosDiscovAlbum";
import ArtistInfo from "../components/InfosDiscovArtist";
import TrackInfo from "../components/InfosDiscovTrack";
import DiscoversInfosBase from "../components/DiscoversInfoBase";

/*
What to do:
-----------
1.Fetch the data needed to display
what you are looking for.
2.
*/

const Discovers = () => {
    const fetchData = () => {

    }
    const infosClicked = "";
    let contenu = null;
    switch(infosClicked){
        case "album": contenu = <AlbumInfo/>;break;
        case "artist": contenu = <ArtistInfo/>;break;
        case "track": contenu = <TrackInfo/>;break;
        default: contenu = null;
    }
    return (
        <section className="Discovers">
            {/* h1 + img */}
            <DiscoversInfosBase/>
            {/* {contenu} */}
        </section>
    );
}
export default Discovers;