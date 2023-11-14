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
                <AffichageElements categorieChercher="album"/>
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