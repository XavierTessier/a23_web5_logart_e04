import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import BarreRecherche from "./BarreRecherche";
import { useAuth } from "../context/authContext";
import { HiHome } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import "../css/navigation.css";

const Header = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const goToHome = () => {
    navigate("/accueil");
  };
  const goToUser = () => {
    navigate("/profile");
  };
  const OpenSearch = () => {
    setShowSearch(!showSearch);
  };

  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <>
      {showSearch ? <BarreRecherche className="" /> : <> </>}
      <nav className="navigation fixed bottom-0 bg-corail-reg w-full h-max py-4">
        <div>
          {user ? (
            <ul className="flex flex-row justify-around items-center">
              <li className="actif">
                <HiHome
                  style={{ color: "white" }}
                  className="text-5xl text-white"
                  onClick={goToHome}
                />
              </li>
              <li className="">
                {user ? (
                  <BsSearch
                    style={{ color: "white" }}
                    className="text-5xl hover:"
                    onClick={OpenSearch}
                  />
                ) : (
                  <BsSearch
                    style={{ color: "white" }}
                    className="opacity-50 text-4xl"
                  />
                )}
              </li>
              <li className="hover:actif">
                <FaRegUserCircle
                  style={{ color: "white" }}
                  className="text-5xl"
                  onClick={goToUser}
                />
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login">login</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
