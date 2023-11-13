import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/authContext';

const Header = () => {
    const { pathname } = useLocation();
    const { user } = useAuth();

    return (
        <nav>
            <div>
                {user ? (
                    <ul>
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
                ) : (
                    <ul>
                        <li>
                            <Link to="/login">login</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Header;