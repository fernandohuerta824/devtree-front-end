
import AdminNavigation from './AdminNavigation'
import HomeNavigation from './HomeNavigation'
import Logo from './Logo'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
    const { user } = useAuth()
    const isAdmin = user ? true : false
    console.log(isAdmin)
    return (
        <header className="bg-slate-800 py-5">
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                <div className="w-full p-5 lg:p-0 md:w-1/3">
                    <Logo />
                </div>
                <nav className="md:w-1/3 md:flex md:justify-end">
                    {isAdmin && <AdminNavigation />}
                    {!isAdmin && <HomeNavigation/>}
                </nav>
            </div>
        </header>
    )
}