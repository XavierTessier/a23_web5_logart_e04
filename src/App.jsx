import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Reader from "./pages/Reader";
import Playlists from "./pages/Playlists";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import Accueil from "./pages/Accueil";

import { useAuth } from './context/authContext';
import { MusicProvider } from "./context/musicContext.jsx";
import { AudioProvider } from "./context/audiotim.jsx";
import Accueil from "./pages/Accueil";


const App = () => {
    const { user } = useAuth();
    const routesNotAuth = [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/login" replace />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
            ],
        },
        {
            path: "*",
            element: <Navigate to="/login" replace />,
        },
    ];

    const routesAuth = [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/accueil" replace />,
                },
                {
                    path: "favorites",
                    element: <Favorites />,
                },
                {
                    path: "reader/track/:id",
                    element:  <MusicProvider><AudioProvider><Reader/></AudioProvider></MusicProvider>,
                },
                {
                    path: "playlists",
                    element: <Playlists />,
                },
                {
                    path: "profile",
                    element: <Profile />,
                },
                {
                    path: "accueil",
                    element: <Accueil />,
                },
            ],
        },
        {
            path: "*",
            element: <Navigate to="/accueil" replace />,
        },
    ];

    return(
        <RouterProvider router={createBrowserRouter(!!user ? routesAuth : routesNotAuth)}/>

    )
}

export default App