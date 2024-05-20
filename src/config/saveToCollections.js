import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "./firebase.config"


export const saveToCollections = async (user,data) =>{
    if(!user?.collections?.includes(data?._id)){
        const docRef = doc(db,"users",user?.uid)

        await updateDoc(docRef,{
            collections: arrayUnion(data?._id)
        })
        .then(()=> toast.success("Saved to Collections"))
        .catch((err)=>toast.error(`Error : ${err.message}`))
    }
    else{
        const docRef = doc(db,"users",user?.uid)

        await updateDoc(docRef,{
            collections: arrayRemove(data?._id)
        })
        .then(()=> toast.success("Removed From Collections"))
        .catch((err)=>toast.error(`Error : ${err.message}`))
    }
}