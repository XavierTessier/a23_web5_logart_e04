import { useEffect } from "react";
import "../css/Accueil.css";
import { Helmet } from "react-helmet";

const Accueil = () => {
  return (
    <div className="accueil">
      <Helmet>
        <title>Tune-Up | Accueil</title>
      </Helmet>
      <img src="src/img/svg/logo.svg" alt="forme" className="logo" />
      <h1>Découverte</h1>
      <img src="src/img/png/Fichier_8.png" alt="forme" className="forme" />
    </div>
  );
};
export default Accueil;
