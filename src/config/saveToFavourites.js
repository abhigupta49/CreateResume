import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './firebase.config';
import { toast } from 'react-toastify';


export const saveToFavourites = async (user, data) => {
    
    if(!data?.favourites?.includes(user?.uid)){
        const docRef = doc(db, "templates", data?._id)

        await updateDoc(docRef, {
            favourites: arrayUnion(user?.uid)
        })
        .then(()=> toast.success("Added to Favorites"))
        .catch((err)=>toast.error(`Error : ${err.message}`))
    }
    else{
        const docRef = doc(db,"templates",data?._id)

        await updateDoc(docRef, {
            favourites: arrayRemove(user?.uid)
        })
        .then(()=> toast.success("Removed from Favorites"))
        .catch((err)=>toast.error(`Error : ${err.message}`))
    }
    
    
};


