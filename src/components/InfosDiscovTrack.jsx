const InfosDiscovTrack = ({musicData, onSearch, album_id}) => {
    // if(musicData['track'] == null) return;
    console.log(album_id);
    console.log(musicData?.track?.album?.id);
    onSearch(`album/${album_id}`,"album");
    if(!musicData.album) return;
    const {artist} = musicData?.album;
    console.log(artist);
    console.log("tracks")
    return (
        <div className="infosDiscovTrack">
            
        </div>
    );
}
export default InfosDiscovTrack;
