import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import BarreRecherche from "./BarreRecherche";
import { useAuth } from "../context/authContext";
import { HiHome } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { FaCompactDisc } from "react-icons/fa6";
import { IoAlbums } from "react-icons/io5";
import "../css/navigation.css";

const Header = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const goToHome = () => {
    navigate("/accueil");
  };
  const goToLike = () => {
    navigate("/favorites");
  };
  const goToPlaylists = () => {
    navigate("/playlists");
  };
  const goToUser = () => {
    {
      user ? navigate("/profile") : navigate("/login");
    }
  };
  const OpenSearch = () => {
    navigate("/search");
  };

  const { pathname } = useLocation();
  const { user } = useAuth();
  console.log(pathname.pathname);
  return (
    <>
      {showSearch ? <BarreRecherche className="" /> : <> </>}
      <div className="menu hidden"></div>
      <nav className="navigation relative bg-corail-reg py-4">
        <div className="wrapper-icons">
          <ul className="icons">
            <li className={pathname === "/accueil" ? "actif" : null}>
              <HiHome
                style={{ color: "white" }}
                className="text-5xl text-white"
                onClick={goToHome}
              />
            </li>
            <li className={pathname === "/favorites" ? "actif" : null}>
              <img
                src="src/img/svg/like_menu.svg"
                style={{ color: "white" }}
                className="text-5xl text-white w-16 h-16"
                onClick={goToLike}
              />
            </li>
            <li className={pathname === "/search" ? "actif" : null}>
              {user ? (
                <BsSearch
                  style={{ color: "white" }}
                  className="text-5xl"
                  onClick={OpenSearch}
                />
              ) : (
                <BsSearch
                  style={{ color: "white" }}
                  className="opacity-50 text-4xl"
                />
              )}
            </li>
            <li className={pathname === "/playlists" ? "actif" : null}>
              <IoAlbums
                style={{ color: "white" }}
                className="text-5xl"
                onClick={goToPlaylists}
              />
            </li>
            <li className={pathname === "/profile" ? "actif" : null}>
              <FaRegUserCircle
                style={{ color: "white" }}
                className="text-5xl"
                onClick={goToUser}
              />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
