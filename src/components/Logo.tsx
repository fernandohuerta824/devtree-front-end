import { Link } from "react-router-dom";
import logoSVG from './../assets/logo.svg'

export default function Logo() {
    return (
        <Link
            to={'/'}
        >
            <img src={logoSVG} className="w-full block" alt="Logo of LinkTree" />
        </Link>
    )
}