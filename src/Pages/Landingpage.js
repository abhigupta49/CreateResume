import React from 'react'
import vectorResume from "../img/vectorResume.png";
import AuthButtonProvider from './AuthButtonProvider';
import {FaGoogle,FaGithub} from "react-icons/fa6"


const Landingpage = () => {
    return (
        <div className='auth-section'>
            <div className='w-full py-8 flex flex-col lg:flex-row justify-center items-center px-8 lg:px-36 mt-6 lg:gap-6 bg-gradient-to-t from-white via-white to-ace0f9'>
                <div className="lg:w-1/2">
                    <h1 className='font-bold text-3xl lg:text-5xl mt-2 leading-10 lg:leading-64 min-w-[280px] lg:min-w-[510px] max-w-[510px] text-center lg:text-left'>Job-Winning Resume Templates</h1>
                    <p className="max-w-[440px] text-lg lg:text-2xl mt-8 text-center lg:text-left" >Get the job 2x as fast. <sup>1</sup> Choose from dozens of recruiter-approved templates. Add ready-to-use skills and phrases to your template.</p>
                    <div className='w-full lg:w-96 rounded-md p-2 flex flex-col items-center justify-start gap-6 '>
                        <AuthButtonProvider Icon={FaGoogle} label={"Signin with Google"} provider={"GoogleAuthProvider"}/>
                        <AuthButtonProvider Icon={FaGithub} label={"Signin with Github"} provider={"GitHubAuthProvider"}/>
                        
                    </div>
                </div>
                <div className="lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
                    <img className='w-80 rounded-2xl border shadow-xl lg:w-80 shadow-custom' src={vectorResume} alt="Vector Resume"/>
                </div>
            </div>

            

        </div>
        
    )
}

export default Landingpage