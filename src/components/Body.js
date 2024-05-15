import React from 'react'
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Landingpage from '../Pages/Landingpage'
import Authentication from '../Pages/Authentication'

import Topheader from '../Pages/Topheader'
import Home from '../Pages/Home'
import useUser from '../Hooks/useUser'

import { useSelector } from 'react-redux'
import Footer from '../Pages/Footer'
import Middleheader from '../Pages/Middleheader'
import CreateTemplate from '../Pages/CreateTemplate'
import UserProfile from '../Pages/UserProfile'
import TemplateDesignDetails from '../Pages/TemplateDesignDetails'
import CreateResume from '../Pages/CreateResume'

const Body = () => {
    useUser() //It will check the data user already loggedIn or not
    const loggedIn = useSelector(store=>store.Data.userLoggedData.data)
    
    const ProtectedRoute = ({ element, ...rest }) => {
        
        return loggedIn ? element : <Navigate to="/auth" />;
    };

    
    const AppLayout = () =>{
        return(
            
            <div>
                <Middleheader />
                <Topheader />
                <Outlet />
                <Footer />
            </div>
            
        )
    }
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element: <AppLayout />,
            children:[
                {
                    path: "/",
                    element: <Landingpage />
                },
                {
                    path: "/*",
                    element: <Authentication />
                },
                {
                    path: "/home",
                    element: <ProtectedRoute element={<Home />} />
                },
                {
                    path: "/auth",
                    element: <Authentication />
                },
                {
                    path: "/profile",
                    element: <ProtectedRoute element={<UserProfile />} />
                },
                {
                    path: "/template/create",
                    element: <CreateTemplate />
                },
                {
                    path: "/Profile/:uid",
                    element: <ProtectedRoute element={<UserProfile />} />

                },
                {
                    path: "/resume/*",
                    element: <ProtectedRoute element={<CreateResume />} />
                },
                {
                    path: "/resumeDetail/:templateID",
                    element: <ProtectedRoute element={<TemplateDesignDetails />} />
                }

                
            ],
            errorElement: <Authentication />
        }
    ])

    return (
        <RouterProvider router={appRouter} />
    )
}

export default Body