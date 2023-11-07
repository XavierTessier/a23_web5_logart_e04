import { Oulet } from "react";
import BarreRecherche from "./BarreRecherche";
import Header from "./Header";

const Layout = () => {
    return (
        <div>
            <div>
                <Header/>
                <BarreRecherche />
            </div>
            
            {/* <Outlet/> */}
        </div>
    );
};

export default Layout;