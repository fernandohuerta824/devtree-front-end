import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isAxiosError } from "axios";
import { api } from "../utils/axios";
import type { User } from "../types";

export default function SearchForm() {

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            handle: ''
        }
    })

    const [isAbleToSign, setIsAbleToSign] = useState(false)
    const [handle, setHandle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    if (errors.handle && isAbleToSign) {
        setIsAbleToSign(false)
    }

    const getUserByHandle = async () => {
        if (isLoading) {
            return
        }
        setIsLoading(true)
        setIsAbleToSign(false)
        try {
            const {data} = await api<User>(`user/${slugify(handle)}`)
            if (data) {
                setIsAbleToSign(false)
                setIsLoading(false)
                return setError('handle', {
                    message: 'The username has already been taken',
                    type: 'alreadyExists'
                })
            }           

        } catch (error) {
            if (isAxiosError(error)) {
                if (error.status === 404) {
                    setIsAbleToSign(true)
                    setIsLoading(false)
                    return
                }
            }
            setIsAbleToSign(false)
            setIsLoading(false)
            
            toast.error('Something went wrong, try again')
        }
    }

    const handleSearch = async () => {
        await getUserByHandle()



    }

    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-5">
            <div className="relative flex items-center  bg-white  px-2">
                <label
                    htmlFor="handle"
                >devtree.com/</label>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                    placeholder="elonmusk, zuck, jeffbezos"
                    {...register("handle", {
                        required: "The username is required",
                        onChange: (e) => { setHandle(e.target.value); setIsAbleToSign(false) }
                    })}
                />
            </div>
            <div className="mt-10">
                {errors.handle && <p className="text-red-600 font-bold">{errors.handle.message}</p>}
                {isAbleToSign &&
                    <p className="text-center text-cyan-600 font-bold">The username {handle} is available / Go to <Link to={'/auth/register'} className="font-black underline" state={{ handle: handle.trim() }}>Sign up</Link> </p>
                }

            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer disabled:bg-gray-600"
                value={isLoading ? 'Loading' : 'Get my devtree'}
                disabled={isLoading}
            />
        </form>
    )
}