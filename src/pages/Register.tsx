import { Link } from "react-router-dom"
import { useForm, type ErrorOption, } from "react-hook-form"
import { isAxiosError } from "axios"
import { toast } from "sonner"

import Input from "../components/UI/Input"
import type { RegisterFields, RegisterUser } from "../types"
import { api } from "../utils/axios"


export default function Register() {
    const { register, watch, handleSubmit, formState: { errors, isSubmitting }, setError, reset } = useForm<RegisterUser>()


    const handleRegister = async (data: RegisterUser) => {
        
        if(isSubmitting) {
            return
        }
        try {
            await api.post('/auth/register', data)
            reset()
            toast.success('User created successfull')
        } catch(error) {
            if(
                error &&
                isAxiosError(error)
                
            ) {
                if(error.status === 422 && 'error' && error.response?.data) {
                    const errors =  error.response.data.errors as Record<RegisterFields, ErrorOption>
                    
                    const errorsArray = Object.entries(errors)
                   
                    errorsArray.forEach(error => setError(error[0] as RegisterFields, error[1]))

                    return
                }
                
                toast.error('An error occurred, try again later')
            }
        }
    }

    console.log(errors)

    const password = watch('password')

    return <>
        <h1 className="text-4xl text-white font-bold">Create Account</h1>

        <form
            onSubmit={handleSubmit(handleRegister)}
            className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        >
            <Input 
                id="name" 
                label="Name" 
                error={errors.name && String(errors.name.message)}
                placeholder='John Doe'
                type='text'
                {...register('name', {
                    required: 'The name is required',
                    minLength: {
                        value: 3,
                        message: 'The name must be at least 3 characters long'
                    },
                    maxLength: {
                        value: 20,
                        message: 'The name must be max 20 characters long'
                    },
                })}
            />

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
                id="handle" 
                label="Handle" 
                error={errors.handle && String(errors.handle.message)}
                placeholder='john-doe'
                type='text'
                {...register('handle', {
                    required: 'The handle is required',
                    minLength: {
                        value: 3,
                        message: 'The handle must be at least 3 characters long'
                    },
                    maxLength: {
                        value: 20,
                        message: 'The handle must be max 20 characters long'
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
                    minLength: {
                        value: 8,
                        message: 'The password must be at least 8 characters long'
                    },
                    maxLength: {
                        value: 40,
                        message: 'The password must be max 40 characters long'
                    },
                    validate: {
                        lowerRequired: value => /[a-z]/.test(value) || 'The password must contain at least one lowercase letter',
                        upperRequired: value => /[A-Z]/.test(value) || 'The password must contain at least one upper letter',
                        numberRequired: value => /[0-9]/.test(value) || 'The password must contain at least one number',
                        noSpace: value => !value.includes(" ") || 'The password must not contain spaces'
                    }

                })}
            />

            <Input 
                id="confirmPassword" 
                label="Confirm Password" 
                error={errors.confirmPassword && String(errors.confirmPassword.message)}
                type='password'
                isPassword
                {...register('confirmPassword', {
                    validate: value => value === password || 'The password confirmation does not match the password'
                })}
            />

            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed"
                value={!isSubmitting ? 'Create Account': 'Creating Account...'}
                disabled={isSubmitting}
            />
        </form>

        <nav className="mt-10">
            <Link
                to='/auth/login'
                className="text-center text-white text-lg block hover:underline"
            >
                Already have an account? Login here
            </Link>
        </nav>
    </>
}