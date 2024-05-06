import React from 'react'
import logo from "../img/logo.png";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className='w-full flex items-center lg:px-20 justify-between border-t border-gray-300'>
            <div className='flex items-center justify-center gap-3 py-3'>
                <img className='w-16 lg:w-20' alt='logo' src={logo}/>
                <p>CreateResume</p> 
            </div>
            <div className='flex items-center justify-center gap-6 px-6'>
                <Link to={"/"} className='text-blue-700 text-sm'>Home</Link>
                <Link to={"/"} className='text-blue-700 text-sm'>Contact</Link>
                <Link to={"/"} className='text-blue-700 text-sm'>Privacy Policy</Link>
            </div>
        </div>
    )
}

export default Footer;