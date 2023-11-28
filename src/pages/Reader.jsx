import { useMusic } from "../context/musicContext";
import { useParams } from "react-router";
import { useEffect } from "react";
import Tracks from "../components/Tracks";
import fetchJsonp from "fetch-jsonp";
import InfoMusic from "../components/InfoMusic";
import MusicController from "../components/MusicController";
import { useAudio } from "../context/audiotim";
import "../css/Reader.css";

import VinylePers from "../components/VinylePerspective";
import Vinyle from "../components/Vinyle";

const Reader = () => {
  const {
    album,
    tracks,
    currentTrack,
    choosenTrack,
    getTrack,
    getTracks,
    getAlbum,
  } = useMusic();
  const { id } = useParams();
  const {
    changeSource,
    isReady,
    play,
    pause,
    stop,
    isPaused,
    togglePause,
    duration,
    volume,
    changeVolume,
  } = useAudio();
  //this is a id of a track
  getTrack(id);
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
    <div className="Reader">
      <div className="wrapper_vinyle">
        <div className="vinyles flex flex-row">
          <VinylePers />
          <VinylePers />
          <VinylePers />
          <VinylePers />
        </div>
        <div className="vinyles flex flex-row">
          <VinylePers />
          <VinylePers />
          <VinylePers />
          <VinylePers />
        </div>
      </div>
      <div className="vinyle-tourne relative">
        <Vinyle />
      </div>
      <InfoMusic />
      <Tracks />
      <MusicController />
    </div>
  );
};

export default Reader;
