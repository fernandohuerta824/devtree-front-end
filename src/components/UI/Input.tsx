import { useState, type InputHTMLAttributes } from "react"

import hidePasswordImg from './../../assets/hide-password.png'
import showPasswordImg from './../../assets/show-password.webp'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    id: string,
    isPassword?: boolean
    error?: string
    placeholder?: string
    className?: string
}

export default function Input ({
    label,
    id,
    error,
    placeholder,
    className,
    isPassword,
    ...props
}: InputProps) {

    const { type } = props
    const [showPassword, setShowPassword]  = useState<'password' | 'text'>(type === 'password' ? 'password' : 'text')

    const handleShowPassword = () => {
        setShowPassword(state => state === 'password' ? 'text' : 'password')
    }

    return (
        <div className="grid grid-cols-1 space-y-3">
            <label htmlFor={id} className="text-2xl text-slate-500">{label}</label>
            
            <div className="relative w-full">
                <input
                    {...props}
                    id={id}
                    placeholder={placeholder}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    type={isPassword ? showPassword : type}
                    className={`bg-slate-300 border-none p-3 rounded-lg placeholder-slate-400 w-full ${className}`}
                />

                {isPassword && <img 
                    src={showPassword === 'password' ? hidePasswordImg : showPasswordImg}
                    alt={showPassword === 'password' ? "Show password" : "Hide password"}
                    className="h-6 w-6 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={handleShowPassword}
                />}
            </div>
            
            {error && <p id={`${id}-error`} className="text-red-600 font-bold text-sm">{error}</p>}        
        </div>
    )
}