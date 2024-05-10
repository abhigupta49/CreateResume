import React, { useEffect } from 'react'
import { FaChevronRight } from 'react-icons/fa6'
import {GoogleAuthProvider,GithubAuthProvider, signInWithRedirect,signInWithPopup} from 'firebase/auth'
import { auth } from '../config/firebase.config'
import { useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { IoDocumentsOutline } from "react-icons/io5";
import { success } from '../toast/success'
import { Link } from 'react-router-dom'

const AuthButtonProvider = (props) => {
    const googleAuthProvider = new GoogleAuthProvider()
    const gitAuthProvider = new GithubAuthProvider()
    
    const loggedData = useSelector(store => store.Data.userLoggedData)
    const handleClick = async (provider) =>{
        switch(provider){
            case "GoogleAuthProvider":
                await signInWithPopup(auth,googleAuthProvider).then( (result)=>{
                    console.log(result)
                    
                    
                }).catch((err) =>{
                    console.log('Error: ',err.Message)
                })
                break
            case "GitHubAuthProvider":
                await signInWithRedirect(auth,gitAuthProvider).then((result)=>{
                    console.log(result)
                    
                }).catch((err) =>{
                    console.log('Error: ',err.Message)
                })
                break
            default:
                await signInWithPopup(auth,googleAuthProvider).then((result)=>{
                    console.log(result)
                    
                }).catch((err) =>{
                    console.log('Error: ',err.Message)
                })
                break
        }
    }
    const {authBtn} = props

    

    if(loggedData.loading) return (<div><BeatLoader color="#36d7b7"/></div>)
    return (
        <div>
            {loggedData.data==null  ? (
                <>
                    {Object.keys(authBtn).map((key, index) => {
                        const item = authBtn[key];
                        return (
                            <div key={index} className='w-full px-4 py-3 mb-3 rounded-md border-2 border-blue-700 flex items-center justify-between cursor-pointer group hover:bg-blue-700 active:scale-95 duration-150 hover:shadow-md' onClick={() => handleClick(item.provider)}>
                                <item.Icon className="text-xl mr-2 group-hover:text-white"/>
                                <p className='text-lg group-hover:text-white'>{item.label}</p>
                                <FaChevronRight className='ml-2 text-base group-hover:text-white'/>
                            </div>
                        );
                        
                    })}
                </>
            ) : (
                // Show success toast for login
                <>
                    <Link to="/home">
                    <div className='w-full px-4 py-3 mb-3 rounded-md border-2  border-blue-700 flex items-center justify-between cursor-pointer group hover:bg-blue-700 active:scale-95 duration-150 hover:shadow-md' >
                        <IoDocumentsOutline className="text-xl mr-2 group-hover:text-white"/>
                        <p className='text-lg group-hover:text-white'>Create resume</p>
                        <FaChevronRight className='ml-2 text-base group-hover:text-white'/>
                    </div></Link>
                </>
                )
            }
        </div>
    );
    
    
}

export default AuthButtonProvider