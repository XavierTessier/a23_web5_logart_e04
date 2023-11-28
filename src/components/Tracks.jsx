import { useEffect } from "react";
import { useMusic } from "../context/musicContext";

const Tracks = () => {
    const {tracks, choosenTrack, trackIndex, setTrackIndex} = useMusic();
    return (
        //Function changing when updated
        <section>
            {/* {console.log("mes tracks: " + tracks[0])} */}
            <ul>
                {
                    tracks.map(({ title, id }) => (
                        <li key={id} style={{ color: id === choosenTrack.id ? "red" : "black" }}>
                        {title}
                        </li>
                    ))
                }
            </ul>
        </section>
    );
}
export default Tracks;