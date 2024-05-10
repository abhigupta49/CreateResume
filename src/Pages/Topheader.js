import React, { useEffect, useState } from 'react'
import logo from "../img/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {PuffLoader} from "react-spinners"
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";
import { auth } from '../config/firebase.config';
import { addData } from '../utils/dataSlice';
const Topheader = () => {
    const [isScrolled,setIsScrolled] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const profileImg = useSelector(store => store.Data.userLoggedData)
    const dispatch = useDispatch()
    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    useEffect(()=>{
        const handleScroll = () =>{
            const scrollTop = window.pageYOffset;
            setIsScrolled(scrollTop>0)
        }

        window.addEventListener('scroll',handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[])
    
    const signOutUser = async() =>{
        await auth.signOut().then(()=>{
            dispatch(addData({ loading: false, data: null }));
        })
    }
    
    return (
            
            <div className={`flex items-center justify-between px-4 lg:px-20 transition-opacity duration-500  ${isScrolled ? 'bg-gradient-to-t from-white via-white to-white fixed top-0 w-full z-10' : ''}`}>
                <Link to="/"><img className='w-16 lg:w-20' src={logo} alt='logo'/></Link>
                {profileImg.loading ? (<div><PuffLoader color="#36d7b7" /></div>) :( profileImg.data!=null && 
                <div className="relative">
                    {profileImg.data?.photoURL ?(<img
                        src={profileImg.data.photoURL} // Replace with the path to your profile picture
                        alt="Profile"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={toggleDropdown}
                    />):<CgProfile className='w-12 h-12 cursor-pointer rounded-md relative items-center justify-center' onClick={toggleDropdown} />}
                    {dropdownOpen && (
                        <ul className="absolute right-0 mt-2 py-6 w-52 bg-white border rounded shadow-lg" onMouseLeave={()=>setDropdownOpen(false)}>
                        {profileImg.data?.photoURL ?(<img
                        src={profileImg.data.photoURL} // Replace with the path to your profile picture
                        alt="Profile"
                        className="w-12 h-12 rounded-full cursor-pointer" style={{ display: 'block', margin: 'auto' }}/>):<CgProfile className='w-12 h-12 cursor-pointer rounded-md relative items-center justify-center'/>}
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Hi👋, {profileImg.data?.displayName}</li>
                        <Link to={"/profile"}><li className="px-4 py-2 font-bold hover:bg-gray-100 cursor-pointer">My Account</li></Link>
                        <Link to={"/template/create"}><li className="px-4 py-2 font-bold hover:bg-gray-100 cursor-pointer">Add New Template</li></Link>
                        <div className='px-2 py-2 border-t border-gray-300 flex items-center group hover:bg-gray-100 text-txtLight justify-between cursor-pointer'>
                            <p onClick={signOutUser}>Sign out</p>
                            <FaSignOutAlt className='group-hover:text-txtDark text-txtLight'/>
                        </div>

                        </ul>
                        
                    )}
                </div>)}
            </div>
        
    );
}

export default Topheader