import { useForm, type ErrorOption } from "react-hook-form";
import Input from "../components/UI/Input";
import TextArea from "../components/UI/TextArea";
import { useAuth } from "../hooks/useAuth";
import type { ProfileUser, UpdateProfileFields, User } from "../types";
import { api } from "../utils/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export default function ProfileView() {
    const { user, setUser } = useAuth()
    const { register, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm<ProfileUser>({
        defaultValues: { handle: user?.handle, description: user?.description}
    })

    const handleUpdateProfile = async (fd: ProfileUser) => {
        if(isSubmitting) {
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
                    className="border-none rounded-lg p-2"
                    accept="image/*"
                    onChange={() => { }}
                />

                <input
                    type="submit"
                    className={`bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer${isSubmitting ? ' disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                    value={`${isSubmitting ? 'Updating user...' : 'Update user'}`}
                />
            </form>

        </>

    )
}