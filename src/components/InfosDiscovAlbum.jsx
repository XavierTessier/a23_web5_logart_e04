const InfosDiscovAlbum = ({musicData:{album}}) => {
    if(album == null) return;
    const {tracks} = album;
    return (
        <div className="infosDiscovAlbum">
            {tracks.map(({title}) => (
                <div>
                    <h2>{title}</h2>
                </div>
            ))}
        </div>
    );
}
export default InfosDiscovAlbum;