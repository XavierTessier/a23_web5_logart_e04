import BarreRecherche from "./BarreRecherche";
import Header from "./Header";
import { Outlet } from "react-router";
import { useAuth } from "../context/authContext";
import AffichageElements from "./AffichageElements";

const Layout = () => {
  const { user } = useAuth();
  return (
    <div className="h-screen">
      <div className="layout">
        <Header />
        <Outlet />
        
      </div>
    </div>
  );
};

export default Layout;
