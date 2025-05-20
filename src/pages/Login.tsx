import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../utils/axios";

import Input from "../components/UI/Input"
import type { LoginUser } from "../types";
import { validatePassword } from "../utils/validatePassword";
import { isAxiosError } from "axios";


export default function Login() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginUser>()

    const handleLogin = async (data: LoginUser) => {
        if(isSubmitting) {
            return
        }
        if(!validatePassword(data.password)) {
            await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 500)))
            toast.error('The email or password is wrong')

            return
        }

        try {
            const { data: resData } = await api.post('/auth/login', data)
            localStorage.setItem('AUTH_TOKEN', resData.token)
        } catch (error) {
            if(error && isAxiosError(error)) {
                if(error.status === 401) {
                    toast.error('The email or password is wrong')
                }

                return
            }
            toast.error('An error occurred, try again later')

        }
    }
    return <>
        <h1 className="text-4xl text-white font-bold">Login</h1>

        <form
            onSubmit={handleSubmit(handleLogin)}
            className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        >
            <Input
                id="email"
                label="E-mail"
                error={errors.email && String(errors.email.message)}
                placeholder='john@doe.com'
                type='email'
                {...register('email', {
                    required: 'The email is required',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "The email is not valid",
                    },
                })}
            />
            <Input 
                id="password" 
                label="Password" 
                error={errors.password && String(errors.password.message)}
                type='password'
                isPassword
                {...register('password', {
                    required: 'The password is required',
                })}
            />

            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed"
                value={!isSubmitting ? 'Log in': 'Loggin in...'}
                disabled={isSubmitting}
            />
        </form>

        <nav className="mt-10">
            <Link
                to='/auth/register'
                className="text-center text-white text-lg block hover:underline"
            >
                Don't have an account? Create one here
            </Link>
        </nav>
    </>
}