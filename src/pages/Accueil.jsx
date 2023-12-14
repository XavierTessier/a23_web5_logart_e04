import { useEffect } from "react";
import "../css/Accueil.css";
import { Helmet } from "react-helmet";
import "../css/anim-accueil.css";
import AffichageElements from "../components/AffichageElements";
import Footer from "../components/Footer";

const Accueil = () => {
  return (
    <div className="accueil">
      <Helmet>
        <title>Tune-Up | Accueil</title>
      </Helmet>
      <div className="wrapper-accueil h-full w-full">
        <img src="@/img/svg/logo.svg" alt="forme" className="logo" />
        <h1>Découverte</h1>
        <div className="forme-accueil">
          <img src="src/img/png/Fichier_8.png" alt="forme" className="forme" />
        </div>
      </div>

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
      <AffichageElements categorieChercher="chart" type="albums" />
      <AffichageElements categorieChercher="chart" type="artists" />
      <AffichageElements categorieChercher="chart" type="tracks" />
      <Footer />
    </div>
  );
};
export default Accueil;
