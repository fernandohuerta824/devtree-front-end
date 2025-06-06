import Input from "../components/UI/Input";
import TextArea from "../components/UI/TextArea";
import { useForm, type ErrorOption } from 'react-hook-form'
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { ProfileUser, User, UpdateProfileFields } from "../types";
import { updateUser } from "../api/DevTreeAPI";
import { toast } from "sonner";

export default function ProfileView() {
    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])!

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<ProfileUser>({ defaultValues: {
        handle: data?.handle,
        description: data?.description
    }})

    const updateProfile = useMutation({
        mutationFn: updateUser,
        mutationKey: ['updateProfile'],
        onError: (error) => {
            if('errors' in error && 'status' in error) {
                if(error.status !== 422) {
                    return
                }
                const errors =  error.errors as Record<UpdateProfileFields,ErrorOption>

                const errorsArray = Object.entries(errors)

                errorsArray.forEach(error => setError(error[0] as UpdateProfileFields, error[1]))

                return
            }

            toast.error('Something went wrong, try again later')
        },
        onSuccess: () => {
            toast.success('User has been updated successfully')
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })

    console.log(isSubmitting)

    const handleUserProfileForm = async (fd: ProfileUser) => {
        if(isSubmitting) {
            return
        }
        await updateProfile.mutateAsync(fd)
    }
    
    return (
        <form
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <Input
                label="Handle"
                type="text"
                id="handle"
                className="border-none rounded-lg p-2"
                placeholder="Handle o Nombre de Usuario"
                defaultValue={data?.handle || ''}
                {...register('handle',  {
                    required: 'The handle is required'
                })}
                error={errors.handle?.message}
            />

            <TextArea
                id="description"
                label="Descripción"
                placeholder="Tu Descripción"
                rows={2}
                className="border-none rounded-lg p-2 resize-none"
                {...register('description')}
                error={errors.description?.message}
            />

            <Input
                label="Imagen"
                id="image"
                type="file"
                name="handle"
                className="border-none rounded-lg p-2"
                accept="image/*"
                onChange={() => {}}
            />

            <input
                type="submit"
                className={`bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer${isSubmitting ? ' disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
                value={`${isSubmitting ? 'Updating user...' : 'Update user'}`}
            />
        </form>
    );
}
