import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import logoSVG from './../assets/logo.svg'
import NavigationTabs from "../components/NavigationTabs";
import { useAuth } from "../hooks/useAuth";

export default function AppLayout() {
    const { logout, user } = useAuth()
    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <header className="bg-slate-800 py-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <img src={logoSVG} className="w-full block" alt="Logo de LinkTree" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                        <button
                            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-gray-300  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">

                    <NavigationTabs />

                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={''}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil / {user?.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            <p className="text-4xl text-center text-white">{user?.handle}</p>

                            {
                                user?.image &&
                                <div className="mx-auto w-[250px] h-[250px]">
                                    <img src={user?.image} alt={user?.name} className="w-[250px] h-[250px] object-contain" />
                                </div>
                            }

                            <p className="text-center text-lg font-black text-white">{user?.description}</p>
                        </div>
                    </div>

                </main >
            </div >
            <Toaster position="top-right" />
        </>
    )
}