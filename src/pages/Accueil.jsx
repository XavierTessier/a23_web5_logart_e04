import { useEffect } from "react";
import "../css/Accueil.css";
import { Helmet } from "react-helmet";
import "../css/anim-accueil.css";
import Footer from "../components/Footer";

const Accueil = () => {
  return (
    <div className="accueil">
      <Helmet>
        <title>Tune-Up | Accueil</title>
      </Helmet>
      <div className="wrapper-accueil h-screen w-full">
        <img src="src/img/svg/logo.svg" alt="forme" className="logo" />
        <h1>Découverte</h1>
        <div className="forme-accueil">
          <img src="src/img/png/Fichier_8.png" alt="forme" className="forme" />
        </div>
      </div>
      <Footer />
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
export default Accueil;
