import { useAudio, useAudioProgress } from "../context/audiotim";
import { useMusic } from "../context/musicContext";
import { useEffect, useState } from "react";
import { BsCaretRightFill, BsChevronBarLeft, BsChevronBarRight   } from "react-icons/bs";


const MusicController = () => {
    let value = 0;
    const {trackIndex, setTrackIndex, album, tracks ,currentTrack, choosenTrack, setChoosenTrack, getTrack, getTracks, getAlbum } = useMusic();
    const [compteur, setCompteur] = useState(0);
    const [link,SetLink] = useState("");
    const [volumeInput, setVolumeInput] = useState(0.3);



    const {changeSource, isReady, play, pause, stop, isPaused,
        togglePause, duration, volume, changeVolume} = useAudio();
    const {progress, changeProgress} = useAudioProgress();
        

        const previousMusic = () => {
            console.log("Previous");
            value = (compteur - 1 + tracks.length) % tracks.length;
            setChoosenTrack(tracks[value]);
            setCompteur(value);
        }
        const nextMusic = () => {
            console.log("Next");
            value = (compteur + 1) % tracks.length;
            setChoosenTrack(tracks[value]);
            setCompteur(value);
        }
        const changeDuration = (e) => {
            //code to change duration
            //value = seconde?
        }
        const volumeHandler = (value) => {
            changeVolume(value/100)
        }


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
            if (choosenTrack){
                // console.log("Choosen Track is true");
                
                setCompteur(choosenTrack.track_position -1);
            }
            }, [choosenTrack]);
        try{
            useEffect(() => {
            // console.log('USE EFFECT CHANGE SOURCE')
            if (choosenTrack && tracks[compteur]){
                // console.log("Choosen Track is true");
                // console.log(tracks[compteur]?.preview);
                changeSource(tracks[compteur]?.preview, false);
            }
            }, [compteur, tracks]);
        }catch(error){
            // console.log("ERROR ERROR: "+error);
        }
        // console.log("After use Effect: ");
        // console.log(tracks[compteur]?.preview);

        //
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
                <input onChange={(e) => changeVolume(e.target.value/100)} type="range" min="0" max="100" value={volume*100} id="volume"/>
            </div>
            <div>                                                                   
                <input onChange={(e) => {changeProgress(e.target.value)/100}} type="range" min="1" max="100" value={progress} id="duration"/>
            </div>
        </section>
    );
}
export default MusicController;