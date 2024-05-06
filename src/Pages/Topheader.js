import React, { useState,useEffect } from 'react'

const Topheader = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

    useEffect(() => {
        const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setIsVisible(prevScrollPos > currentScrollPos);
        setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <div className="bg-black">
        <div className="container mx-auto py-4 lg:py-2">
            <div className={`text-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h4 className="text-white text-sm lg:text-lg">
                <span className="bg-yellow-400 text-black px-2 py-1 rounded-md">NEW!</span> Get hired faster with a resume review. See more details
            </h4>
            </div>
        </div>
        </div>
    );
}

export default Topheader