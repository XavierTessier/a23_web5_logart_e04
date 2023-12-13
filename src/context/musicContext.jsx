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
    const [musicData, setMusicData] = useState(
        {
            album:null,
            artist:null,
            track:null,
            albums:null,
            tracks:null,
            artists:null,
        }
    );
    /* getBySeach -> Informations
    Fetch a Json Object based on a link from an API.
    params @need
    -------------------------------
    | /q=, /artist,/album/id, etc | --> In order to search from a specific attribute.
    -------------------------------
    params @lookFor
    --------------------------------
    | album, track, artist, albums | --> This is used to know what information the func has to return.
    --------------------------------
    */
    const getBySearch = async(need, lookFor, limit="") => {
        useEffect(() => {
            const search = async () => {
                try {
                    const resp = await fetchJsonp(`https://api.deezer.com/${need}${(limit != "")? "?limit=" + limit : ""}&output=jsonp`);
                    if (!resp.ok) throw new Error('Network response was not ok');
                    const data = await resp.json();
                    
                    setMusicData((prevData) => ({
                        ...prevData,
                        [lookFor]: sendUsableData(data, lookFor),
                    }));
                
                    console.log('setMade');
                } catch (error) {
                  console.error('Error fetching data:', error);
                }
              };
          
              search();
        },[need,lookFor]);
    }
    const sendUsableData = (data, lookFor) => {
        switch (lookFor) {
          case "artist":
            return {
              id: data.id,
              text: data.name,
              link: data.link,
              image: data.picture,
              image_small: data.picture_small,
              image_medium: data.picture_medium,
              image_big: data.picture_big,
              image_xl: data.picture_xl,
              type: data.type,
            };
          case "album":
            return {
              id: data.id,
              text: data.title,
              link: data.link,
              image: data.cover,
              image_small: data.cover_small,
              image_medium: data.cover_medium,
              image_big: data.cover_big,
              image_xl: data.cover_xl,
              type: data.type,
              artist:data.artist,
              tracks:data?.tracks?.data,
              genres:data?.genres?.data,
              data:data
            //   data:data
            };
          case "track":
            return {
              id: data.id,
              text: data.title,
              link: data.link,
              album:data.album,
            //   data:data,
            };
          case "albums":
            return data.data;
          case "artists": return data.data;
          default:
            console.warn(`Unhandled case: ${lookFor}`);
            return data;
        }
      };
    const getTrack = async(trackId) => {
        useEffect(() => {
            const fetchTrack = async () => {
                try {
                    const resp = await fetchJsonp(`https://api.deezer.com/track/${trackId}&output=jsonp`);
                    if (!resp.ok) throw new Error('Network response was not ok');
                    const data = await resp.json();
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
        <Provider value = {{trackIndex, musicData,getBySearch,setTrackIndex, getTrack, getTracks, getAlbum , choosenTrack, setChoosenTrack, album, tracks, trackIndex, currentTrack}}>
            {children}
        </Provider>
    );
};

const useMusic = () => {
    const context = useContext(musicContext);
    return context;
}

export {useMusic, MusicProvider, musicContext}