import { social } from "../data/social"
import { DevTreeInput } from "../components/DevTreeInput"
import { useEffect, useState } from "react"
import type { SocialNetwork, User } from "../types"
import { toast } from "sonner"
import { useAuth } from "../hooks/useAuth"
import { api } from "../utils/axios"


export default function LiknTreeView() {
    const [devTreeLinks, setDevTreeLinks] = useState<Array<SocialNetwork>>(social)

    const { user, setUser } = useAuth()

    const [linksSubmit, setLinksSubmit] = useState<{
        isLoading: boolean,
        data: null | User,
        error: null | unknown
    }>({
        isLoading: false,
        data: null,
        error: null
    })

    const handleChangeEnabled = (socialNetwork: string, onBlur = false) => {
        const currentSocialIndex = devTreeLinks.findIndex(({ name }) => name === socialNetwork)

        if (currentSocialIndex < 0) {
            return devTreeLinks
        }

        const newState = structuredClone(devTreeLinks)
        const curSocial = newState[currentSocialIndex]
        if(!user) {
            return devTreeLinks
        }
        const links: SocialNetwork[] = JSON.parse(user.links).filter((l: SocialNetwork) => l.enabled)

        const socialRegExp = new RegExp(`^https://(${curSocial.name}).com+/[a-zA-Z0-9._-]+$`)
        let newLinks: SocialNetwork[] = []

        if (!socialRegExp.test(curSocial.url)) {
            toast.error('You must provide a valid url')
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
        console.log(mergeLinks)
        setUser({...user, links: JSON.stringify(mergeLinks)})
        setDevTreeLinks(mergeLinks)
    }

    const handleChangeSocial = (socialNetwork: string, url: string) => {
        setDevTreeLinks(prevState => {
            const currentSocialIndex = prevState.findIndex(({ name }) => name === socialNetwork)

            if (currentSocialIndex < 0) {
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

    const handleUpdateLinks = async () => {
        if (linksSubmit.isLoading) {
            return
        }
        setLinksSubmit(prevState => ({ ...prevState, isLoading: true, error: null }))
        try {
            const { data } = await api.patch<{ user: User, message: string }>('/user', { links: JSON.stringify(devTreeLinks), handle: user?.handle, description: user?.description })!
            setLinksSubmit(prevState => ({ ...prevState, data: data.user, isLoading: false }))
            setUser(data.user)
            toast.success('Links updated was successful')
        } catch (error) {
            setLinksSubmit(prevState => ({ ...prevState, error, isLoading: false }))
            toast.error('Something went wrong, try again')
        }
    }

    useEffect(() => {
        if (!user) {
            return
        }
        const links = JSON.parse(user.links) as SocialNetwork[]
        setDevTreeLinks(links)
    }, [])

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
                    className="bg-cyan-400 text-lg w-full uppercase text-slate-600 rounded-lg font-bold p-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={handleUpdateLinks}
                    disabled={linksSubmit.isLoading}
                >
                    {linksSubmit.isLoading ? 'Saving Changes...' : 'Save Changes'}
                </button>
            </div>
        </>
    )
}