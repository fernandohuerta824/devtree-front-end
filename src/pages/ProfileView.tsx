import Input from "../components/UI/Input";
import TextArea from "../components/UI/TextArea";
import { useForm, type ErrorOption } from 'react-hook-form'
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { ProfileUser, User, UpdateProfileFields } from "../types";
import { updateUser, uploadImage } from "../api/DevTreeAPI";
import { toast } from "sonner";
import type { ChangeEvent } from "react";

export default function ProfileView() {
    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])!

    const { register, handleSubmit, formState: { errors }, setError } = useForm<ProfileUser>({ defaultValues: {
        handle: data?.handle,
        description: data?.description
    }})

    const updateProfile = useMutation({
        mutationFn: updateUser,
        mutationKey: ['updateProfile'],
        onError: (error) => {
            if('errors' in error && 'status' in error) {
                if(error.status === 422) {
                    const errors =  error.errors as Record<UpdateProfileFields,ErrorOption>
    
                    const errorsArray = Object.entries(errors)
    
                    errorsArray.forEach(error => setError(error[0] as UpdateProfileFields, error[1]))
    
                    return
                }
            }

            toast.error('Something went wrong, try again later')
        },
        onSuccess: (data) => {
            toast.success('User has been updated successfully')
            queryClient.setQueryData(['user'], (prevData: User) => ({
                ...prevData,
                ...data.user
            }))
        }
    })

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        mutationKey: ['uploadImage'], 
        onError: (error) => {
            if('errors' in error && 'status' in error && error.status === 422) {
                if(error.status === 422 ) {
                    return
                }
            }

            toast.error('Error at trying to upload the image')
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    image: data.image
                }
            })
        }
    })

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files || e.target.files.length <= 0) {
            return
        }

        await uploadImageMutation.mutateAsync(e.target.files[0])
    }

    const handleUserProfileForm = async (fd: ProfileUser) => {
        if(updateProfile.isPending) {
            return
        }
        await updateProfile.mutateAsync({...fd, links: data.links})
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
                onChange={handleChange}
                disabled={uploadImageMutation.isPending}
            />

            <input
                type="submit"
                className={`bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer${updateProfile.isPending ? ' disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed' : ''}`}
                disabled={updateProfile.isPending}
                value={`${updateProfile.isPending ? 'Updating user...' : 'Update user'}`}
            />
        </form>
    );
}
