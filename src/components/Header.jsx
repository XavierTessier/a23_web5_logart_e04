import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const { pathname } = useLocation();

    return (
        <nav>
            <div>
                <ul>
                    <li>
                        <Link to="/login">login</Link>
                    </li>
                    <li>
                        <Link to="/favorites">Favorites</Link>
                    </li>
                    <li>
                        <Link to="/reader">Reader</Link>
                    </li>
                    <li>
                        <Link to="/playlists">Playlists</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;