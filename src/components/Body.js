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
const Body = () => {
    const loggedIn = useSelector(store=>store.Data.userLoggedData.data)
    const ProtectedRoute = ({ element, ...rest }) => {
        return loggedIn ? element : <Navigate to="/auth" />;
    };

    useUser() //It will check the data user already loggedIn or not
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