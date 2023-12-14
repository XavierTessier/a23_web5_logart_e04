import { useAudio, useAudioEnded, useAudioProgress } from "../context/audiotim";
import { useMusic } from "../context/musicContext";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

import "../css/music-controler.css";
import "../css/motion-reader.css";
import { FaPlay, FaPause } from "react-icons/fa6";
import { RiSkipBackFill, RiSkipForwardFill } from "react-icons/ri";
import { ImVolumeMedium } from "react-icons/im";
import Like from "./Like";

const MusicController = ({ onJoueChange }) => {
  const [joue, setJoue] = useState(false);
  let value = 0;
  const { tracks, choosenTrack, setChoosenTrack } = useMusic();
  const [compteur, setCompteur] = useState(0);
  const [link, SetLink] = useState("");
  const [volumeInput, setVolumeInput] = useState(0.3);
  const { user, userData, addToFav } = useAuth();

  const isPlaying = () => {
    setJoue(!joue);
    onJoueChange(!joue);
  };

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
  const { progress, changeProgress } = useAudioProgress();

  const previousMusic = () => {
    console.log("Previous");
    value = (compteur - 1 + tracks.length) % tracks.length;
    setChoosenTrack(tracks[value]);
    setCompteur(value);
  };
  const nextMusic = () => {
    console.log("Next");
    value = (compteur + 1) % tracks.length;
    setChoosenTrack(tracks[value]);
    setCompteur(value);
  };
  const volumeHandler = (value) => {
    changeVolume(value / 100);
  };

  const handleProgressBarClick = (event) => {
    const progressBar = event.target;
    const totalWidth = progressBar.offsetWidth;
    const clickedPosition =
      (event.clientX - progressBar.getBoundingClientRect().left) / totalWidth;
    const newProgress = clickedPosition;

    // Update the state to re-render the component with the new progress
    // setProgress(newProgress);

    // Perform additional actions here, e.g., update playback time
    changeProgress(newProgress);
  };

  //currentTrack
  //tracks
  // console.log("tracks");
  // console.log(tracks);
  // console.log("compteur de tracks");
  // console.log(tracks[compteur]?.preview);
  // console.log("choosenTrack");
  // console.log(choosenTrack);

  // setCompteur();
  // changeSource(tracks[compteur]?.preview);
  // useEffect(() => {
  //         SetLink(tracks[compteur]?.preview);
  // }, []);
  // const changerCompteur = (order) => {
  //     setCompteur(order -1);
  // }
  // if (choosenTrack) changerCompteur(choosenTrack.track_position);

  //ETAPE 1
  //LOOK IF TRACKS IS DEFINED
  //ONCE IT IS, SET THE COMPTEUR TO THE CHOOSEN TRACK POSITION

  //ETAPE2
  //WHEN COMPTEUR IS CHANGED, LOOK IF TRACKS IS DEFINED (JUST IN CASE)
  //ONCE IT IS, CHANGE THE SOURCE DEPENDING ON THE TRACK'S ARRAY.

  useEffect(() => {
    // console.log('USE EFFECT SETCOMPTEUR')
    if (choosenTrack) {
      // console.log("Choosen Track is true");

      setCompteur(choosenTrack.track_position - 1);
    }
  }, [choosenTrack]);
  try {
    useEffect(() => {
      // console.log('USE EFFECT CHANGE SOURCE')
      if (choosenTrack && tracks[compteur]) {
        // console.log("Choosen Track is true");
        // console.log(tracks[compteur]?.preview);
        changeSource(tracks[compteur]?.preview, true);
      }
    }, [compteur, tracks]);
  } catch (error) {
    // console.log("ERROR ERROR: "+error);
  }
  // console.log("After use Effect: ");
  // console.log(tracks[compteur]?.preview);
  useAudioEnded(() => {
    console.log("chanson TERMINER");
    nextMusic();
    changeSource(tracks[compteur]?.preview, true);
    // play(isReady);
  });
  //
  useEffect(() => {
    const inputRange = document.querySelector('input[type="range"]');
    const progressBefore = document.querySelector(".progress");

    if (inputRange && progressBefore) {
      const updateProgress = () => {
        const percent = (progress * 100).toFixed(2) + "%";
        progressBefore.style.width = percent;
        // console.log(Math.round(progress * 100));
        inputRange.value = (progress * 100).toFixed(2);
      };

      inputRange.addEventListener("input", updateProgress);
      updateProgress(); // Update during initialization

      return () => {
        inputRange.removeEventListener("input", updateProgress);
      };
    }
  }, [progress]);
  const tempsChanson = tracks[compteur]?.duration;

  const FormatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutes}:${formattedSeconds}`;
  };

  // console.log(choosenTrack);

  return (
    <section className="music-controler relative ">
      <div className="wrapper-controle">
        <div className="wrapper-controler">
          <div className="wrapper-like absolute bottom-8 right-0" onClick={() => addToFav(userData.favorites, {
            id: choosenTrack?.id,
            title: choosenTrack?.title,
            artist: choosenTrack?.artist.name,
            albumTitle: choosenTrack?.album.title,
            albumCover: choosenTrack?.album.cover_medium,
            duration: choosenTrack?.duration,
          })}>
            <Like />
          </div>
          <div className="audio-duration flex flex-row justify-center items-center ">
            <p className="temps-start mr-4">0:00</p>
            <div className="lecteur w-fit relative">
              <input
                className="slider-audio w-60 "
                onChange={(e) => {
                  changeProgress(e.target.value);
                }}
                type="range"
                min="0"
                max="100"
                value={Math.round(progress * 100)}
                id="duration"
              />
              <div className="progress"></div>
            </div>
            <p className="temps-fin ml-4">{FormatTime(tempsChanson)}</p>
          </div>
        </div>
        <div className="btns-lecture mt-4">
          <div onClick={previousMusic} className="pointer">
            <RiSkipBackFill className="text-4xl" />
          </div>
          <div
            className="play cursor-pointer relative bg-corail-pale rounded-full text-4xl  w-16 h-16 flex justify-center items-center"
            onClick={() => {
              isPlaying();
              togglePause();
            }}
          >
            {joue ? <FaPlay className="pl-1" /> : <FaPause />}
          </div>
          <div onClick={nextMusic} className="pointer">
            <RiSkipForwardFill className="text-4xl" />
          </div>
        </div>
      </div>
      <div className="volume">
        <ImVolumeMedium className="text-4xl w-fit mr-2" />
        <div className="volume-wrap relative">
          <input
            className="slider-audio"
            onChange={(e) => volumeHandler(e.target.value)}
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            id="volume"
          />
          <div className="progress-volume"></div>
        </div>
      </div>
      <div className="motion-bg-front z-30 bg-corail-reg "></div>
      <div className="motion-bg-middle z-20 bg-corail-pale  "></div>
      <div className="motion-bg-back z-10 bg-corail-clair  "></div>
    </section>
  );
};
export default MusicController;
