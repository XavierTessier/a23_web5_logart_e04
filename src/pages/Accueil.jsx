import { useEffect } from "react";
import "../css/Accueil.css";

const Accueil = () => {
  return (
    <div className="accueil">
      <img src="src/img/svg/logo.svg" alt="forme" className="logo" />
      <h1>Découverte</h1>
      <img src="src/img/png/Fichier 8.png" alt="forme" className="forme" />
      {/* <img src="src/img/png/Fichier 9.png" alt="ligne" className="ligne"/> */}
    </div>
  );
};
export default Accueil;
