import BarreRecherche from "./BarreRecherche";
import Header from "./Header";
import { Outlet } from "react-router";

const Layout = () => {
    return (
        <div>
            <div>
                <Header/>
                <BarreRecherche />
            </div>
            
            <Outlet/>
        </div>
    );
};

export default Layout;