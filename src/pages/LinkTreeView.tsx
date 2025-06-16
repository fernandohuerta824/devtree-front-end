import { useEffect, useState } from "react"
import { social } from "../data/social"
import type { DevTreeLink, User } from "../types"
import { DevTreeInput } from "../components/DevTreeInput"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../api/DevTreeAPI"

export default function LiknTreeView() {
    const [devTreeLinks, setDevTreeLinks] = useState<Array<DevTreeLink>>(social)

    const queryClient = useQueryClient()
    const user: User = queryClient.getQueryData(['user'])!

    const { mutate } = useMutation({
        mutationFn: updateUser,
        mutationKey: ['updateProfile'],
        onError() {
            toast.error('Something went wrong, try again later')
        },
        onSuccess(data) {
            toast.success('Updated has been successful')
            queryClient.setQueryData(['user'], (prevData: User) => ({
                ...prevData,
                ...data.user
            }))
        }
    })

    useEffect(() => {
        const links = JSON.parse(user.links) as DevTreeLink[]
        setDevTreeLinks(links)
    }, [])

    const handleChangeSocial = (socialNetwork: string, url: string) => {
        setDevTreeLinks(prevState => {
            const currentSocialIndex = prevState.findIndex(({ name }) => name === socialNetwork)

            if(currentSocialIndex < 0) {
                return prevState
            }

            const newState = structuredClone(prevState)
            const curSocial = newState[currentSocialIndex]

            const socialRegExp = new RegExp(`^https://(${curSocial.name}).com+/[a-zA-Z0-9._-]+$`)
            if (!socialRegExp.test(url)) {
                curSocial.url = `https://${curSocial.name}.com/`
            } else {
                curSocial.url = url
            }

            return newState
        })
    }

    const handleChangeEnabled = (socialNetwork: string) => {
        setDevTreeLinks(prevState => {
            const currentSocialIndex = prevState.findIndex(({ name }) => name === socialNetwork)

            if(currentSocialIndex < 0) {
                return prevState
            }

            const newState = structuredClone(prevState)
            const curSocial = newState[currentSocialIndex]
            
            const socialRegExp = new RegExp(`^https://(${curSocial.name}).com+/[a-zA-Z0-9._-]+$`)

            if (!socialRegExp.test(curSocial.url)) {
                toast.error('You must provide a valid url')
            } else {

                curSocial.enabled = !newState[currentSocialIndex].enabled
            }

            return newState
        })
    }

    const handleUpdateLinks = () => {

        const links = JSON.stringify(devTreeLinks)
        mutate({links, description: user.description, handle: user.handle})
    }
    return (
        <>
            <div className="space-y-5">
                {devTreeLinks.map(d => (
                    <DevTreeInput 
                        key={d.name}
                        item={d}
                        onChangeSocial={handleChangeSocial}
                        onChangeEnabled={handleChangeEnabled}
                    />
                ))}
                <button
                    className="bg-cyan-400 text-lg w-full uppercase text-slate-600 rounded-lg font-bold p-2"
                    onClick={handleUpdateLinks}
                >
                    Save Changes
                </button>
            </div>
        </>
    )
}