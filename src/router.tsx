import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        lazy: async () => ({
            Component: (await import('./pages/RootLayout')).default,
            loader: (await import('./loaders/auth')).authLoader,
            ErrorBoundary: (await import('./pages/ErrorPage')).default
        }),
        children: [
            {
                index: true,
                lazy: async () => ({
                    Component: (await import('./pages/Home')).default
                })
            },
            {
                path: 'auth',
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
            },
            {
                path: 'admin',
                id: 'user',
                lazy: async() => ({
                    Component: (await import('./pages/AppLayout')).default
                }),
                children: [
                    {
                        index: true,
                        lazy: async () => ({
                            Component: (await import('./pages/LinkTreeView')).default
                        })
                    },
                    {
                        path: 'profile',
                        lazy: async () => ({
                            Component: (await import('./pages/ProfileView')).default
                        })
                    }
                ]
            },
            {
                path: ':handle',
                lazy: async () => ({
                    Component: (await import('./pages/AuthLayout')).default
                }),
                children: [
                    {
                        index: true,
                        lazy: async () => ({
                            Component: (await import('./pages/HandleView')).default,
                            loader: (await import('./loaders/devTree')).devTreeViewLoader
                        })
                    }
                ]
            },
            {
                path: '404',
                lazy: async () => ({
                    Component: (await import('./pages/AuthLayout')).default
                }),
                children: [
                    {
                        index: true,
                        lazy: async () => ({
                            Component: (await import('./pages/404')).default
                        })
                    }
                ]
            }
        ]
    },
])


export function Router () {
    return <RouterProvider router={router} />
}