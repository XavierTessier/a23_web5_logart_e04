import BarreRecherche from "./BarreRecherche";
import Header from "./Header";
import { Outlet } from "react-router";
import { useAuth } from '../context/authContext';

const Layout = () => {
    const { user } = useAuth();
    return (
        <div>
            <div>
                <Header />
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