import React, { useEffect, useState } from 'react'
import logo from "../img/logo.png";
const Middleheader = () => {
    const [isScrolled,setIsScrolled] = useState(false)
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
    return (
        
            <div className={`flex items-center justify-between px-4 lg:px-20 transition-opacity duration-500  ${isScrolled ? 'bg-gradient-to-t from-white via-white to-white fixed top-0 w-full z-10' : ''}`}>
                <img className='w-16 lg:w-20' src={logo} alt='logo'/>
                <button className='bg-black px-4 py-2 lg:px-6 lg:py-3 rounded-sm text-white'>Login</button>
            </div>
        
    );
}

export default Middleheader