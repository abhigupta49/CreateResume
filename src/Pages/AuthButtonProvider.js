import React from 'react'
import { FaChevronRight } from 'react-icons/fa6'
const AuthButtonProvider = ({Icon,label,provider}) => {
    return (
        <div className='w-full px-4 py-3 rounded-md border-2 border-blue-700 flex items-center justify-center cursor-pointer group hover:bg-blue-700 active:scale-95 duration-150 hover:shadow-md'>
            <Icon className="text-xl mr-2 group-hover:text-white"/>
            <p className='text-lg group-hover:text-white'>{label}</p>
            <FaChevronRight className='ml-2 group-hover:text-white'/>
        </div>
    )
}

export default AuthButtonProvider