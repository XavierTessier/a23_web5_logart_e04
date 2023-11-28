import React, { useContext, useState, useEffect } from 'react';
import fetchJsonp from 'fetch-jsonp'; 
import { async } from '@firebase/util';

const musicContext = React.createContext({
    getInfo: async (googleProvider) => { },
    album:null,
    tracks:[],
    trackIndex:-1,
    currentTrack: null,
    _v: 0
});

const { Provider } = musicContext;

const MusicProvider = ({children}) => {
    const [album, setAlbum] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [choosenTrack, setChoosenTrack] = useState(null);

    const getTrack = async(trackId) => {
        useEffect(() => {
            const fetchTrack = async () => {
                try {
                    const resp = await fetchJsonp(`https://api.deezer.com/track/${trackId}&output=jsonp`);
                    if (!resp.ok) throw new Error('Network response was not ok');
                    const data = await resp.json();
                    // Handle the data as needed
                    // console.log("album:")
                    // console.log(data);
                    setChoosenTrack(data);
                    setAlbum(data.album);
                } catch (error) {
                    console.error('Error fetching track:', error);
                }
            };
        
            // Call fetchTrack with the id
            fetchTrack(trackId);
          }, [trackId]);
    }
    const getTracks = async (tracklist) => {
        useEffect(() => {
            const fetchLink = async () => {
                if(tracklist == null) return;
                try {
                    const resp = await fetchJsonp(`${tracklist}&output=jsonp`);
                    if (!resp.ok) throw new Error('Network response was not ok');
                    const {data} = await resp.json();
                    // console.log("data GetTracks");
                    // console.log(data);
                    setTracks(data);
                } catch (error) {
                    console.error('Error fetching track:', error);
                }
            };

            fetchLink(tracklist);
        }, [tracklist]);
    }
    const getAlbum = async (link) => {
        useEffect(() => {
            const fetchLink = async () => {
                if(link == null) return;
                try {
                    const resp = await fetchJsonp(`${link}&output=jsonp`);
                    if (!resp.ok) throw new Error('Network response was not ok');
                    const {data} = await resp.json();
                    setAlbum(data);
                } catch (error) {
                    console.error('Error fetching track:', error);
                }
            };
            fetchLink(link);
        }, [link]);
    }
    // const getMP3 = async (link) => {
    //     useEffect(() => {
    //         const fetchLink = async () => {
    //             if(link == null) return;
    //             try {
    //                 const resp = await fetchJsonp(`${link}&output=jsonp`);
    //                 if (!resp.ok) throw new Error('Network response was not ok');
    //                 const {data} = await resp.json();
    //                 setAlbum(data);
    //             } catch (error) {
    //                 console.error('Error fetching track:', error);
    //             }
    //         };
    //         fetchLink(link);
    //     }, [link]);
    // }
    return (
        <Provider value = {{trackIndex, setTrackIndex, getTrack, getTracks, getAlbum , choosenTrack, setChoosenTrack, album, tracks, trackIndex, currentTrack}}>
            {children}
        </Provider>
    );
};

const useMusic = () => {
    const context = useContext(musicContext);
    return context;
}

export {useMusic, MusicProvider, musicContext}