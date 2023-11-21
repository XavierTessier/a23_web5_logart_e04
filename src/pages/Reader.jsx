import { BsCaretRightFill, BsChevronBarLeft, BsChevronBarRight   } from "react-icons/bs";
import "./ReaderBeta.css";
import { useMusic } from "../context/musicContext";
import { useParams } from "react-router";
import { useEffect } from "react";
import Tracks from "../components/Tracks";
import fetchJsonp from 'fetch-jsonp'; 
import InfoMusic from "../components/InfoMusic";

const Reader = () => {
    const {album, tracks ,currentTrack, choosenTrack, getTrack, getTracks, getAlbum } = useMusic();
    const { id } = useParams(); 
    //this is a id
    getTrack(3135553);
    getTracks(album?.tracklist);
    getAlbum(tracks?.album?.link);
    console.log(album);
    // const {album:tracklist} = choosenTrack;
    // const track = await getTrack(id); //the id being a certain number in reader/album/:id
    // id is the only dependency here
    return (
        <div>
            <InfoMusic/>
            <Tracks/>
            <section>
                <div className="useMusic">
                    <span><BsChevronBarLeft /></span>
                </div>
                <div className="useMusic">
                    <span><BsCaretRightFill /></span>
                </div>
                <div className="useMusic">
                    <span><BsChevronBarRight /></span>
                </div>
            </section>
        </div>
    );
};

export default Reader;