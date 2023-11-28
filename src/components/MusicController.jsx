import { useAudio } from "../context/audiotim";
import { useMusic } from "../context/musicContext";
import { useEffect, useState } from "react";
import { BsCaretRightFill, BsChevronBarLeft, BsChevronBarRight   } from "react-icons/bs";


const MusicController = () => {
    let value = 0;
    const {album, tracks ,currentTrack, choosenTrack, getTrack, getTracks, getAlbum } = useMusic();
    const [compteur, setCompteur] = useState(0);
    const [link,SetLink] = useState("");
    const {changeSource, isReady, play, pause, stop, isPaused,
        togglePause, duration, volume, changeVolume} = useAudio();
        

        const previousMusic = (e) => {
            value = (compteur - 1 + tracks.length) % tracks.length;
            setCompteur(value);
            getTracks(tracks[value].preview);
        }
        const nextMusic = async (e) => {
            value = (compteur + 1) % tracks.length;
            setCompteur(value);
            getTrack(tracks[value].id);
        }
        const changeDuration = (e) => {
            //code to change duration
            //value = seconde?
        }
        console.log("compteur de tracks");
        console.log(tracks[compteur]?.preview);
        // changeSource(tracks[compteur]?.preview);
            useEffect(() => {
                console.log('USE EFFECT')
                if (tracks[compteur] && tracks[compteur].hasOwnProperty('preview')){
                    SetLink(tracks[compteur]?.preview);
                    changeSource(tracks[compteur]?.preview, false);
                }
              }, []);
              console.log("unLink");

              console.log(link);
    return (
        <section>
            <div className="useMusic">
                <span onClick={previousMusic}><BsChevronBarLeft /></span>
            </div>
            <div className="useMusic">
                <span onClick={togglePause}><BsCaretRightFill /></span>
            </div>
            <div className="useMusic">
                <span onClick={nextMusic}><BsChevronBarRight /></span>
            </div>
            <div>
                <input onChange={(e) => {changeVolume(e.target.value)}} type="range" min="1" max="100" value="50" id="volume"/>
            </div>
            <div>                                                                   
                <input onChange={(e) => {changeProgress(e.target.value)}} type="range" min="1" max="100" value="0" id="duration"/>
            </div>
        </section>
    );
}
export default MusicController;