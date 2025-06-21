import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Redirect() {
    const { user } = useAuth()
    const location = useLocation()

    if (location.pathname.startsWith('/admin') && !user) {
        return <Navigate to={'/'} />
    }

    if ((location.pathname.startsWith('/auth') || location.pathname === '/') && user) {
        return <Navigate to={'/admin'} />
    }

    return <Outlet key={location.pathname} />

}