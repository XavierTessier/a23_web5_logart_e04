import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import "../css/Login.css";
import { FaRegUserCircle } from "react-icons/fa";
import Footer from "../components/Footer";
const Login = () => {
  const { googleLogin, logout, user, addDocHandler } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin(googleProvider); // assuming googleProvider is defined somewhere
      console.log(result); // Optional: Log the result of Google login
      addDocHandler(result.user.uid, result.user.displayName);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };
  return (
    <div className="authentification_lite">
      <img src="src\img\svg\logo.svg" className="logo"></img>
      <div className="login h-screen">
        <FaRegUserCircle className="z-10" style={{ color: "coral" }} />
        <button onClick={handleGoogleLogin} className="connexion">
          Se connecter avec Google
        </button>
      </div>
      <img src="src\img\png\Fichier_3.png" alt="forme" className="forme1" />
      <img src="src/img/png/Fichier_1.png" alt="forme" className="ligne1" />
      <img src="src\img\png\Fichier_13.png" alt="forme" className="forme2" />
      <img src="src/img/png/Fichier_14.png" alt="forme" className="ligne2" />
      <Footer />
    </div>
  );
};
export default Login;
