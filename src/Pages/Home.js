import React, { Suspense } from 'react'
import Mainspinner from '../toast/Mainspinner'
import { Route, Routes } from 'react-router-dom'
import HomeContainer from './HomeContainer'
import CreateTemplate from './CreateTemplate'
import UserProfile from './UserProfile'
import CreateResume from './CreateResume'
import TemplateDesignDetails from './TemplateDesignDetails'

const Home = () => {
    return (
        <div className='w-full h-screen lg:max-h-screen'>
            <main>
                <Suspense fallback={<Mainspinner />}>
                    <Routes>
                        <Route path="/" element={<HomeContainer />}/>
                        <Route path="/template/create" element={<CreateTemplate />}/>
                        <Route path="/profile/:uid" element={<UserProfile />} />
                        <Route path="/resume/*" element={<CreateResume />} />
                        <Route path="/resumeDetail/:templateID" element={<TemplateDesignDetails />} />
                    </Routes>
                </Suspense>
                
            </main>
        </div>
    )
}

export default Home