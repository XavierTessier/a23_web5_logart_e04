import "./ReaderBeta.css";
import { useMusic } from "../context/musicContext";
import { useParams } from "react-router";
import { useEffect } from "react";
import Tracks from "../components/Tracks";
import fetchJsonp from 'fetch-jsonp'; 
import InfoMusic from "../components/InfoMusic";
import MusicController from "../components/MusicController";
import { useAudio } from "../context/audiotim";

const Reader = () => {
    const {album, tracks ,currentTrack, choosenTrack, getTrack, getTracks, getAlbum } = useMusic();
    const { id } = useParams(); 
    const {changeSource, isReady, play, pause, stop, isPaused,
        togglePause, duration, volume, changeVolume} = useAudio();
    //this is a id of a track
    getTrack(3135554);
    getTracks(album?.tracklist);
    getAlbum(tracks?.album?.link);
    console.log(choosenTrack?.preview);
    // const {album:tracklist} = choosenTrack;
    // const track = await getTrack(id); //the id being a certain number in reader/album/:id
    // id is the only dependency here
    // useEffect(() => {
    //     changeSource(choosenTrack?.preview, true);
    // }, []);
    return (
        <div>
            <InfoMusic/>
            <Tracks/>
            <MusicController/>
        </div>
    );
};

export default Reader;