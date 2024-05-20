import React from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { FadeInOutMotion, scaleInOut } from '../utils/Contstant'
import {BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart} from "react-icons/bi"
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { saveToCollections } from '../config/saveToCollections'
import {saveToFavourites} from '../config/saveToFavourites'
import { useNavigate } from 'react-router-dom'

const TemplatesDesignPin = ({data,index}) => {
    const [isHover,setIshover] = useState(false)
    const userData = useSelector(store => store.Data.userLoggedData.data)
    
    const navigate = useNavigate()
    

    const addToCollection = async (e)=>{
        e.stopPropagation(); //It will not navigate to any route
        console.log("temp data: ",data)
        await saveToCollections(userData,data);
    }

    const addToFavourites = async (e)=>{
        e.stopPropagation(); //It will not navigate to any route
        
        await saveToFavourites(userData,data);
        
    }

    const handleRouteNavigation = () =>{
        navigate(`/resumeDetail/${data?.id}`,{replace:true})
    }
    return (
        <motion.div key={index} {...scaleInOut(index)}>
            <div key={index} className='w-[80%] h-[400px] 2xl:h-[400px] rounded-md bg-gray-200 overflow-hidden relative' onMouseEnter={()=>setIshover(true)} onMouseLeave={()=>setIshover
            (false)}>
                <img src={data?.imageURL} className='w-full h-full object-contain' alt='template'/>

                <AnimatePresence>
                    {
                        isHover && <motion.div {...FadeInOutMotion} onClick={handleRouteNavigation} className='absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer'>
                        <div className='flex flex-col items-end justify-start w-full gap-8'>
                            <InnerBoxCard label={userData?.collections?.includes(data?.id) ? "Added" : "Add To Collections"} Icon={userData?.collections?.includes(data?.id) ? BiSolidFolderPlus : BiFolderPlus} OnHandle={addToCollection} />
                            <InnerBoxCard label={data?.favourites?.includes(userData?.uid)? "Saved To Favourites":"Add To Favourites"} Icon={data?.favourites?.includes(userData?.uid)? BiSolidHeart:BiHeart} OnHandle={addToFavourites} />
                        </div>
                        </motion.div>
                    }
                    
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

const InnerBoxCard = ({label,Icon,OnHandle}) =>{
    const [isHover,setIshover] = useState(false)
    return(
        <div onClick={OnHandle} className='w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative' onMouseEnter={()=>setIshover(true)} onMouseLeave={()=>setIshover(false)}>
            <Icon className='text-base' />
            <AnimatePresence>
                {
                isHover && 
                <motion.div initial={{opacity:0,scale:0.6, x:50}} animate={{opacity:1,scale:1, x:0}} exit={{opacity:0,scale:0.6, x:50}} className='px-3 py-2 rounded-md bg-gray-200 absolute -left-44 after:w-2 after:h-2 after:bg-gray-200 after:absolute after:-right-1 after:top-[14px] after:rotate-45'>
                    <p className='text-sm whitespace-nowrap'> {label}</p>
                </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default TemplatesDesignPin