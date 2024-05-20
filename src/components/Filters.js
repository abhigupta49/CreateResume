import React, { useState } from 'react'
import {MdLayersClear} from "react-icons/md"
import { transformedTags } from '../utils/Contstant'
import { useDispatch, useSelector } from 'react-redux'
import {addFilterTag} from '../utils/filterTemplateSlice'
const Filters = () => {
    const [isClearHover,setIsClearHover] = useState(false) //Hover Effect
    const dispatch = useDispatch()
    const searchValue = useSelector(store => store.Filtertags.FilterData.searchText)
    const handleFilterValue = (filterValue) =>{
        dispatch(addFilterTag({Data:null,searchText:filterValue}))

    }

    return (
        <div className='w-full flex items-center justify-start py-4'>
            <div className='flex items-center flex-col border border-gray-300 rounded-md px-3 py-2 mr-2 cursor-pointer group hover:shadow-md bg-gray-200 relative' onMouseEnter={()=>setIsClearHover(true)} onMouseLeave={()=>setIsClearHover(false)}>
                <MdLayersClear className='text-xl'/>
                {isClearHover && 
                    <div className='absolute -top-8 -left-2 bg-white shadow-md rounded-md px-2 py-1'>
                        <p className='whitespace-nowrap text-xs'>Clear all</p>
                    </div>
                }
            </div>

            <div className='w-full flex items-center justify-start overflow-x-scroll gap-6 scrollbar-none'>
                {transformedTags && transformedTags.map((item)=>(
                    <div onClick={()=>handleFilterValue(item.value)} key={item.id} className={`border border-gray-300 bg-gray-200 rounded-md px-6 py-2 cursor-pointer group hover:shadow-md ${searchValue === item.value && 'bg-gray-300 shadow-md'}` }>
                        <p className='text-sm group-hover:text-md whitespace-nowrap'>{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filters