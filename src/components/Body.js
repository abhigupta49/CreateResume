import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Landingpage from '../Pages/Landingpage'
import Authentication from '../Pages/Authentication'
const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/*",
            element: <Landingpage />
        },
        {
            path: "auth",
            element: <Authentication />
        }
    ])

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body