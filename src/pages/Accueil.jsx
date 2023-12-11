import { useEffect } from "react";
import "../css/Accueil.css";

const Accueil = () => {
  return (
    <div className="accueil w-11/12 h-screen">
      <img src="src/img/svg/logo.svg" alt="forme" className="logo" />
      <h1>Découverte</h1>
      <img src="src/img/png/Fichier_8.png" alt="forme" className="forme" />
      {/* <img src="src/img/png/Fichier_9.png" alt="ligne" className="ligne" /> */}
    </div>
  );
};
export default Accueil;
