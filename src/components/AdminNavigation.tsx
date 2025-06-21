import { useAuth } from "../hooks/useAuth"

export default function AdminNavigation() {
    const { logout } = useAuth()
    
    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <button
                className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                onClick={handleLogout}
            >
                Cerrar Sesión
            </button>
        </>
    )
}