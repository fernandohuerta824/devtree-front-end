import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>Desde Home</h1>,
    }
])


export function Router () {
    return <RouterProvider router={router} />
}