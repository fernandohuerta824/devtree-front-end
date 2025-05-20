import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/auth',
        lazy: async () => ({
            Component: (await import('./pages/AuthLayout')).default
        }),
        children: [
            {
                path: 'login',
                lazy: async () => ({
                    Component: (await import('./pages/Login')).default
                })
            },
            {
                path: 'register',
                lazy: async () => ({
                    Component: (await import('./pages/Register')).default
                })
            }
        ]
    }
])


export function Router () {
    return <RouterProvider router={router} />
}