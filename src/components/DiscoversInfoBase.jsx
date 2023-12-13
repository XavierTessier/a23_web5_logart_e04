import { useMusic } from "../context/musicContext";
import { useParams } from "react-router-dom";
const DiscoversInfosBase = ({musicData:{text, image}}) => {
    return (
        <div className="infosBase">
            <h2>{text}</h2>
            <img src={image} alt="" />
        </div>
    );
}
export default DiscoversInfosBase;