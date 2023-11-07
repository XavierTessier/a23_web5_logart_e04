const Profile = () => {

    // on va avoir besoin de récupérer les infos de l'utilisateur connecté
    // aussi avoir les infos de lecture de l'utilisateur
    // stocker les infos dans firebase
    // favoris dans la base de données

    return (
        <div>
            <h1>Votre profil</h1>
            <p> Email : </p>
            <div>
                <p>vos favoris</p>
            </div>
            <div>
                <p>vos playlists</p>
            </div>
            <div>
                <p>vos plus écoutés</p>
            </div>
            <button>Déconnexion</button>
        </div>
    );
}

export default Profile;