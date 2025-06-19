import { useEffect, useState } from "react"
import { social } from "../data/social"
import type { SocialNetwork, User } from "../types"
import { DevTreeInput } from "../components/DevTreeInput"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../api/DevTreeAPI"

export default function LiknTreeView() {
    const [devTreeLinks, setDevTreeLinks] = useState<Array<SocialNetwork>>(social)

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateUser,
        mutationKey: ['updateProfile'],
        onError() {
            toast.error('Something went wrong, try again later')
        },
        onSuccess(data) {
            toast.success('Updated has been successful')
            setDevTreeLinks(JSON.parse(data.user.links))
            queryClient.setQueryData(['user'], (prevData: User) => ({
                ...prevData,
                ...data.user
            }))
        }
    })

    useEffect(() => {
        const user: User = queryClient.getQueryData(['user'])!

        const userLinks = JSON.parse(user.links) as SocialNetwork[]
        const mergeLinks = devTreeLinks.map(l => {
            const link = userLinks.find(dl => dl.name === l.name)
            if (!link) {
                return { ...l, id: 0 }
            }
            return link
        })

        setDevTreeLinks(mergeLinks)
    }, [])

    const handleChangeSocial = (socialNetwork: string, url: string) => {
        const currentSocialIndex = devTreeLinks.findIndex(({ name }) => name === socialNetwork)

        if (currentSocialIndex < 0) {
            return devTreeLinks
        }

        const newState = structuredClone(devTreeLinks)
        const curSocial = newState[currentSocialIndex]

        const socialRegExp = new RegExp(`^https://(${curSocial.name}).com+/[a-zA-Z0-9._-]+$`)
        if (!socialRegExp.test(url)) {
            curSocial.url = `https://${curSocial.name}.com/`
        } else {
            curSocial.url = url
        }

        queryClient.setQueryData(['user'], (prevState: User) => ({
            ...prevState,
            links: JSON.stringify(newState)
        }))
        setDevTreeLinks(newState)
    }

    const handleChangeEnabled = (socialNetwork: string, onBlur = false) => {
        const currentSocialIndex = devTreeLinks.findIndex(({ name }) => name === socialNetwork)

        if (currentSocialIndex < 0) {
            return devTreeLinks
        }

        const newState = structuredClone(devTreeLinks)
        const curSocial = newState[currentSocialIndex]
        const user: User = queryClient.getQueryData(['user'])!

        const links: SocialNetwork[] = JSON.parse(user.links).filter((l: SocialNetwork) => l.enabled)
        const socialRegExp = new RegExp(`^https://(${curSocial.name}).com+/[a-zA-Z0-9._-]+$`)

        let newLinks: SocialNetwork[] = []
        if (!socialRegExp.test(curSocial.url)) {
            toast.error('You must provide a valid url')
            curSocial.enabled = false
        } else {
            if(onBlur) {
                return
            }
            curSocial.enabled = !newState[currentSocialIndex].enabled
            if (curSocial.enabled) {
                const newItem = {
                    ...curSocial,
                    id: links.length + 1
                }
                newLinks = [...links, newItem]
            } else {
                newLinks =
                    links
                        .filter(l => l.enabled && l.name != curSocial.name)
                        .map((l, i) => ({ ...l, id: i + 1 }))

            }
        }
        const mergeLinks = newState.map(l => {
            const linksWithId = newLinks.find(lwId => lwId.name === l.name && lwId.enabled)

            if(linksWithId) {
                return linksWithId
            }

            return l
        })
        queryClient.setQueryData(['user'],
            (prevData: User) => (
                {
                    ...prevData,
                    links: JSON.stringify(mergeLinks)
                }
            )
        )

        setDevTreeLinks(mergeLinks)
    }


    const handleUpdateLinks = () => {
        const user: User = queryClient.getQueryData(['user'])!

        mutate({ links: user.links, description: user.description, handle: user.handle })
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