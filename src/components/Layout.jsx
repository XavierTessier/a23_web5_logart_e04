import BarreRecherche from "./BarreRecherche";
import Header from "./Header";
import { Outlet } from "react-router";
import { useAuth } from '../context/authContext';
import AffichageElements from "./AffichageElements";

const Layout = () => {
    const { user } = useAuth();
    return (
        <div>
            <div>
                <Header />
                <AffichageElements categorieChercher="chart" type="albums"/>
                <AffichageElements categorieChercher="chart" type="artists"/>
                {user ? (
                    <BarreRecherche />
                ) : (
                    <></>
                )}
            </div>

            <Outlet />
        </div>
    );
};

export default Layout;