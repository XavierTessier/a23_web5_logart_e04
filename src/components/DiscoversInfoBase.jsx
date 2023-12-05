import { useMusic } from "../context/musicContext";
import { useParams } from "react-router-dom";
const DiscoversInfosBase = () => {
    const {categorie} = useParams();
    const {musicData} = useMusic();
    const {text, image} = musicData[categorie];
    console.log(musicData[categorie]);
    
    return (
        <div className="infosBase">
            <h2>{text}</h2>
            <img src={image} alt="" />
        </div>
    );
}
export default DiscoversInfosBase;