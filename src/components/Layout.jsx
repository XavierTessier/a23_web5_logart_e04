import BarreRecherche from "./BarreRecherche";
import Header from "./Header";
import { Outlet } from "react-router";
import { useAuth } from "../context/authContext";
import AffichageElements from "./AffichageElements";

const Layout = () => {
  const { user } = useAuth();
  return (
    <div>
      <Header />
      <Outlet />
      {/* <AffichageElements categorieChercher="chart" type="albums"/> */}
      <AffichageElements categorieChercher="chart" type="artists" /> 
      <AffichageElements categorieChercher="chart" type="tracks" />
    </div>
  );
};

export default Layout;
