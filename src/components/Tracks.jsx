import { useMusic } from "../context/musicContext";

const Tracks = () => {
    const {tracks, choosenTrack} = useMusic();
    return (
        <section>
            {console.log("mes tracks: " + tracks[0])}
            <ul>
                {tracks.map(({ title, id }) => (
                    <li key={id} style={{ color: id === choosenTrack.id ? "red" : "black" }}>
                    {title}
                    </li>
                ))}
            </ul>
        </section>
    );
}
export default Tracks;