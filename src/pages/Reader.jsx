import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
const Reader = ({state}) => {
    const {id} = useParams();
    const location = useLocation();

    console.log(location);
    console.log(id);
    return (
        <div></div>
    );
};

export default Reader;