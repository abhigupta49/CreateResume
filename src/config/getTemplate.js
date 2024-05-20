import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { addTemplate } from '../utils/templateSlice';


const getTemplates = (dispatch) => {
    
    return new Promise((resolve, reject) => {
        const templateCollectionRef = collection(db, "templates");
        
        getDocs(templateCollectionRef)
            .then((querySnapshot) => {
                const templates = [];
                querySnapshot.forEach((doc) => {
                    // Convert Firestore Timestamp to JavaScript Date and then to string
                    const data = doc.data();
                    const modifiedData = {
                        ...data,
                        timeStamp: data.timeStamp.toDate().toString() // Convert to string
                    };
                    templates.push({ id: doc.id, ...modifiedData });
                });
                console.log("Templates:", templates);
                dispatch(addTemplate({templatesData:templates,Datalength:templates.length}))
                resolve(templates);
            })
            .catch((error) => {
                console.error("Error fetching templates:", error);
                reject(error);
            });
    });
};

export const getTemplatesDetails = async (templateID) =>{
    return new Promise((resolve,reject)=>{
        const unsubscribe = onSnapshot(doc(db,"templates",templateID),(doc)=>{
            resolve(doc.data())
        })
        
        return unsubscribe;
    })
}

export default getTemplates;
