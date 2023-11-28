import { useAudio } from "../context/audiotim";
import { useMusic } from "../context/musicContext";
import { useEffect, useState } from "react";
import {
  BsCaretRightFill,
  BsChevronBarLeft,
  BsChevronBarRight,
} from "react-icons/bs";

import "../css/music-controler.css";
import { FaPlay } from "react-icons/fa6";
import { RiSkipBackFill, RiSkipForwardFill } from "react-icons/ri";

const MusicController = () => {
  let value = 0;
  const {
    album,
    tracks,
    currentTrack,
    choosenTrack,
    getTrack,
    getTracks,
    getAlbum,
  } = useMusic();
  const [compteur, setCompteur] = useState(0);
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

  const previousMusic = (e) => {
    value = (compteur - 1 + tracks.length) % tracks.length;
    setCompteur(value);
    getTracks(tracks[value].preview);
  };
  const nextMusic = async (e) => {
    value = (compteur + 1) % tracks.length;
    setCompteur(value);
    getTrack(tracks[value].id);
  };
  const changeDuration = (e) => {
    //code to change duration
    //value = seconde?
  };
  console.log(tracks[compteur]);
  useEffect(() => {
    changeSource(
      "https://cdns-preview-b.dzcdn.net/stream/c-b2e0166bba75a78251d6dca9c9c3b41a-9.mp3",
      false
    );
  }, []);

  return (
    <section className="music-controler relative">
      <div className="audio-duration flex flex-row justify-center items-center">
        <p className="temps-start mr-4">0:00</p>
        <div className="lecteur w-1/2 relative">
          <input
            className="slider-audio w-full"
            onChange={(e) => {
              changeProgress(e.target.value);
            }}
            type="range"
            min="0"
            max="100"
            value="30"
            id="duration"
          />
          <div className="progress"></div>
        </div>
        {/* peux-tu affiché la duré finale de la chansons dans le <p></p> en dessous pls */}
        <p className="temps-fin ml-4">5:00</p>
      </div>
      <div className="btns-lecture mt-4">
        <div onClick={previousMusic} className="pointer">
          <RiSkipBackFill className="text-4xl" />
        </div>
        <div className="play pointer relative bg-corail-pale rounded-full text-4xl pl-1 w-16 h-16 flex justify-center items-center">
          <FaPlay />
        </div>
        <div onClick={nextMusic} className="pointer">
          <RiSkipForwardFill className="text-4xl" />
        </div>
      </div>
      <div className="volume">
        <input
          onChange={(e) => {
            changeVolume(e.target.value);
          }}
          type="range"
          min="1"
          max="100"
          value="50"
          id="volume"
        />
      </div>
    </section>
  );
};
export default MusicController;
