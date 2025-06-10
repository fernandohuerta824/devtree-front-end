import { useForm, type ErrorOption } from "react-hook-form";
import Input from "../components/UI/Input";
import TextArea from "../components/UI/TextArea";
import { useAuth } from "../hooks/useAuth";
import type { ProfileUser, UpdateProfileFields, User } from "../types";
import { api } from "../utils/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";

type ImageStatus = {
    isLoading: boolean
    error: null | unknown
    data: null | { message: string, image: string }
}

export default function ProfileView() {
    const { user, setUser } = useAuth()
    const { register, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm<ProfileUser>({
        defaultValues: { handle: user?.handle, description: user?.description}
    })
    const [imageStateUpload, setImageStateUpload] = useState<ImageStatus>({
        isLoading: false,
        error: null,
        data: null
    })

    const handleUpdateProfile = async (fd: ProfileUser) => {
        if(isSubmitting || imageStateUpload.isLoading) {
            return
        }

        try {
            const { data: { user } } = await api.patch<{user: User, message: string}>('/user', fd)
            setUser(user)
            toast.success('User has been updated succesfully')
        } catch(error) {
            if(isAxiosError(error)) {
                if(error.status === 422 && 'error' && error.response?.data) {
                    const errors = error.response.data.errors as Record<UpdateProfileFields, ErrorOption>

                    const errorArray = Object.entries(errors)

                    errorArray.forEach(error => setError(error[0] as UpdateProfileFields, error[1]))

                    return
                }
            }

            toast.error('Something went wrong, try again later')
        }
    }

    const handleChangeImage =  async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files || e.target.files.length <= 0 || isSubmitting || imageStateUpload.isLoading || !user) {
            return
        }

        setImageStateUpload(prevState => ({...prevState, isLoading: true, error: null}))
        try {
            const file = e.target.files[0]
            const fd = new FormData()
            fd.append('file', file)
            const { data } = await api.post<{ message: string, image: string }>('/user/image', fd)
            setUser({...user, image: data.image})
        } catch (error) {
            setImageStateUpload(prevState => ({...prevState, error: error}))
            if(isAxiosError(error)) {
                if(error.status === 422) {
                    return
                }

                toast.error('Error at trying to upload the image')
            }
        } finally {
            setImageStateUpload(prevState => ({...prevState, isLoading: false }))

        }
    }

    return (
        <>
            <form
                className="bg-white p-10 rounded-lg space-y-5"
                onSubmit={handleSubmit(handleUpdateProfile)}
            >

                <Input
                    label="Handle"
                    type="text"
                    id="handle"
                    className="border-none rounded-lg p-2"
                    placeholder="Handle o Nombre de Usuario"
                    {...register('handle', {
                        required: 'The handle is required'
                    })}
                    error={errors.handle?.message || ''}
                />

                <TextArea
                    id="description"
                    label="Descripción"
                    placeholder="Tu Descripción"
                    rows={2}
                    className="border-none rounded-lg p-2 resize-none"
                    {...register('description')}
                    error={errors.description?.message || ''}
                />

                <Input
                    label="Imagen"
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none rounded-lg p-2 disabled:cursor-not-allowed"
                    accept="image/*"
                    onChange={handleChangeImage}
                    disabled={imageStateUpload.isLoading}
                />

                <input
                    type="submit"
                    className={`bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed`}
                    disabled={(isSubmitting || imageStateUpload.isLoading)}
                    value={`${isSubmitting || imageStateUpload.isLoading ? 'Updating user...' : 'Update user'}`}
                />
            </form>

        </>

    )
}