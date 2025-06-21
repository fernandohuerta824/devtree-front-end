import { Link } from "react-router-dom";

export default function HomeNavigation () {
    return (
        <>
            <Link
                className="text-white p-2 uppercase font-black cursor-pointer"
                to='/auth/login'
            >
                Log in
            </Link>

            <Link
                className="bg-lime-500 text-slate-800 rounded p-2 uppercase font-black cursor-pointer"
                to='/auth/register'
            >
                Sign up
            </Link>
        </>
    )
}