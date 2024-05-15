import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase.config';

const getTemplates = () => {
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
                resolve(templates);
            })
            .catch((error) => {
                console.error("Error fetching templates:", error);
                reject(error);
            });
    });
};

export default getTemplates;
