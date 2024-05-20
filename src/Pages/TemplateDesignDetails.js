import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getTemplatesDetails } from '../config/getTemplate'
import { FaHouse } from 'react-icons/fa6'
import {  BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from 'react-icons/bi'
import { saveToCollections } from '../config/saveToCollections'
import { saveToFavourites } from '../config/saveToFavourites'


const TemplateDesignDetails =  () => {
    const {templateID} = useParams()
    const [templateData,setTemplateData] = useState([])
    const userData = useSelector(store => store.Data.userLoggedData.data)
    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const results = await getTemplatesDetails(templateID);
                setTemplateData(results)
            }
            catch (error) {
                console.error("Error fetching template details:", error);
            }
        }

        fetchData()
    },[templateID])
    
    console.log(templateData)

    const addToCollection = async (e)=>{
        e.stopPropagation(); //It will not navigate to any route
        console.log("temp data: ",templateData)
        await saveToCollections(userData,templateData);
    }

    const addToFavourites = async (e)=>{
        e.stopPropagation(); //It will not navigate to any route
        
        await saveToFavourites(userData,templateData);
        
    }
    
    return (
        <div className='w-full flex flex-col items-center justify-start px-4 py-12'>
            {/* Bread crump */}
            <div className='w-full flex items-center pb-8 gap-2'>
                <Link to={"/home"} className="flex items-center justify-center gap-2">
                    <FaHouse /> Home
                </Link>
                <p>/</p>
                <p className='font-bold'>{templateData?.name}</p>
            </div>

            {/* Main section  */}
            <div className='w-full grid grid-cols1 lg:grid-cols-12'>
                {/* left section  */}
                <div className='col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4'>
                    {/* Load the template image  */}
                    <img className='w-full h-auto object-contain rounded-md' src={templateData?.imageURL} alt='template img'/>

                    {/* Title and other option */}
                    <div className='w-full flex flex-col items-start justify-start gap-2'>
                        {/* Title section */}
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-base font-semibold'>{templateData?.title}</p>
                            {/* Likes */}
                            {templateData?.favourites?.length > 0 && <div className='flex items-center justify-center gap-1'>
                                <BiSolidHeart className='text-base text-red-500'/>
                                <p className='text-base font-semibold'>{templateData?.favourites?.length} likes</p>
                            </div>}
                        </div>
                    </div>

                    {/* Collections and  favourite options*/}
                    {userData && (
                        <div className='flex items-center justify-center gap-3'>
                        {userData?.collections?.includes(templateData?._id) ? (
                        <React.Fragment>
                            <div onClick={addToCollection} className='flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer'>
                                <BiSolidFolderPlus />
                                <p>Remove From Collections</p>
                            </div>
                        </React.Fragment>):(
                        <React.Fragment>
                            <div onClick={addToCollection} className='flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer'>
                                <BiFolderPlus />
                                <p>Add To Collections</p>
                            </div>
                        </React.Fragment>)}

                        {templateData?.favourites?.includes(userData?.uid) ? (
                        <React.Fragment>
                            <div onClick={addToFavourites} className='flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer'>
                                <BiSolidHeart />
                                <p>Remove From Favorites</p>
                            </div>
                        </React.Fragment>):(
                        <React.Fragment>
                            <div onClick={addToFavourites} className='flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer'>
                                <BiHeart />
                                <p>Add To Favorites</p>
                            </div>
                        </React.Fragment>)}
                    </div>
                    )}
                </div>

                {/* Right Sectin  */}
                <div className='col-span-1 lg:col-span-4'>2</div>
            </div>
        </div>

        

    )
}

export default TemplateDesignDetails