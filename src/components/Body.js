import React from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Landingpage from '../Pages/Landingpage'
import Authentication from '../Pages/Authentication'
import Middleheader from '../Pages/Middleheader'
import Topheader from '../Pages/Topheader'
import Home from '../Pages/Home'

const Body = () => {
    const AppLayout = () =>{
        return(
            
            <div>
                <Topheader />
                <Middleheader />
                
                <Outlet />
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
                    element: <Authentication />
                },
                {
                    path: "/*",
                    element: <Authentication />
                },
                {
                    path: "/home",
                    element: <Home />
                },
                {
                    path: "/auth",
                    element: <Authentication />
                }
            ]
        }
    ])

    return (
        <RouterProvider router={appRouter} />
    )
}

export default Body