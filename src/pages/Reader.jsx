import { useMusic } from "../context/musicContext";
import { useParams } from "react-router";
import { useEffect } from "react";
import Tracks from "../components/Tracks";
import fetchJsonp from "fetch-jsonp";
import InfoMusic from "../components/InfoMusic";
import MusicController from "../components/MusicController";
import { useAudio } from "../context/audiotim";
import { useState } from "react";
import "../css/Reader.css";

import VinylePers from "../components/VinylePerspective";
import Vinyle from "../components/Vinyle";
import { Helmet } from "react-helmet";
import BrasReader from "../components/BrasReader";

const Reader = () => {
  const [joue, setJoue] = useState(false);

  const handleJoueChange = (newJoue) => {
    setJoue(newJoue);
  };
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
  console.log(choosenTrack?.album?.cover);
  // const {album:tracklist} = choosenTrack;
  // const track = await getTrack(id); //the id being a certain number in reader/album/:id
  // id is the only dependency here
  // useEffect(() => {
  //     changeSource(choosenTrack?.preview, true);
  // }, []);
  return (
    <div className="Reader">
      <Helmet>
        <title>Tune-Up | Reader</title>
      </Helmet>
      <div className="wrapper_vinyle">
        <div className="vinyles flex flex-row">
          <VinylePers img={choosenTrack?.album?.cover} />
          <VinylePers img={choosenTrack?.album?.cover} />
          <VinylePers img={choosenTrack?.album?.cover} />
          <VinylePers img={choosenTrack?.album?.cover} />
        </div>
        <div className="vinyles flex flex-row">
          <VinylePers img={choosenTrack?.album?.cover} />
          <VinylePers img={choosenTrack?.album?.cover} />
          <VinylePers img={choosenTrack?.album?.cover} />
          <VinylePers img={choosenTrack?.album?.cover} />
        </div>
      </div>
      <div className="vinyle-tourne relative">
        <Vinyle
          img={choosenTrack?.album?.cover || choosenTrack?.albumCover}
          isPlaying={joue}
        />
        <BrasReader />
      </div>
      <InfoMusic />
      <Tracks />
      <MusicController onJoueChange={handleJoueChange} />
    </div>
  );
};

export default Reader;
