import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/authContext';

const Favorites = () => {
    const { user, setUserData, userData, removeFromFav } = useAuth();
    return (
        <div>
            {userData.favorites && (
                userData.favorites.map((item, index) => (
                    <div className="fav" id={index} key={item.info.id}>
                        <img src={item.info.albumCover} className='cover' />
                        <div className="info" >
                            <p>{item.info.title}</p>
                            <p>{item.info.artist}</p>
                            <p>{item.info.albumTitle}</p>
                            <p>{item.info.duration}s</p>
                        </div>
                        <button className='Delete' onClick={() => removeFromFav(userData.favorites, item.info.id)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default Favorites;