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


const App = () => {
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
                    element: <Navigate to="/profil" replace />,
                },
                {
                    path: "favorites",
                    element: <Favorites />,
                },
                {
                    path: "reader",
                    element: <Reader />,
                },
                {
                    path: "playlists",
                    element: <Playlists />,
                },
                {
                    path: "profile",
                    element: <Profile />,
                },
            ],
        },
        {
            path: "*",
            element: <Navigate to="/profil" replace />,
        },
    ];
}

export default App