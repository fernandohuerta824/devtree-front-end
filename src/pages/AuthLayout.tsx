import { Outlet } from "react-router-dom";
import logoSVG from '../assets/logo.svg'
import { Toaster } from "sonner";


export default function AuthLayout () {
    return <>
        <div className="bg-slate-800 min-h-screen">
            <div className="max-w-lg mx-auto pt-10 px-5">
                <img src={logoSVG} alt="Logotipo de Devtree" />

                <div className="py-10">
                    <Outlet/>
                </div>
            </div>
        </div>

        <Toaster position="top-right"/>
    </>
}