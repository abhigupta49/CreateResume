import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, db } from '../config/firebase.config';
import { addData } from '../utils/dataSlice';

import {doc, onSnapshot, setDoc } from 'firebase/firestore';


const useUser = () => {
    const dispatch = useDispatch();
    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userCred) => {
            if (userCred) {
                const userData = userCred.providerData[0]; // Accessing the first provider data as an object
                
                const userDocRef = doc(db, "users", userData.uid);

                const unsubscribe = onSnapshot(userDocRef, (_doc) => {
                    if (_doc.exists()) {
                        dispatch(addData({ loading: false, data: _doc.data() }));
                    } else {
                        setDoc(userDocRef, userData).then(() => {
                            dispatch(addData({ loading: false, data: userData }));
                        }).catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                    }
                });
                
                

                return unsubscribe;
            } else {
                // If user is not logged in
                console.log("User is not authenticated");
                dispatch(addData({ loading: false, data: null }));
            }
        });

        // Cleanup function to unsubscribe from the listener when component unmounts
        return () => unsubscribe();
    }, [dispatch]); // Dependency array ensures the effect runs only once when component mounts
};




export default useUser;