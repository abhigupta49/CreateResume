import React from 'react'
import {PuffLoader} from "react-spinners"
const Mainspinner = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <PuffLoader color="#36d7b7" />
        </div>
    )
}

export default Mainspinner