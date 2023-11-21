import { useMusic } from "../context/musicContext";
const InfoMusic = () => {
    // const {album:{genre:{data}, title}, choosenTrack:{release_date}} = useMusic();
    const {album, choosenTrack} = useMusic();
    // console.log(album);
    return (
        <section>
            <ul>
                <li>Album: {album?.title}</li>
                <li>Année: {choosenTrack?.release_date}</li>
                
                <ul>
                    {/* can't access to genre right now */}
                <li>Genre</li>
                    {album?.genre?.data.map(({name}) => (
                        <li>{name}</li>
                    ))}
                </ul>
            </ul>
        </section>
    );
}
export default InfoMusic;