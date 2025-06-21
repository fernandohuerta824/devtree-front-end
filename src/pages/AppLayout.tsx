import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import NavigationTabs from "../components/NavigationTabs";
import { useAuth } from "../hooks/useAuth";
import type { SocialNetwork } from "../types";
import { useEffect, useState } from "react";
import DevTreeLink from "../components/DevTreeLink";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Header from "../components/Header";


export default function AppLayout() {
    const authContext = useAuth()
    const user = authContext.user!
    const setUser = authContext.setUser
    

    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
        JSON.parse(user?.links as string)
            .filter((item: SocialNetwork) => item.enabled)
            .sort((a: SocialNetwork, b: SocialNetwork) => a.id! - b.id!)
    )

    useEffect(() => {
        setEnabledLinks(JSON.parse(user?.links as string)
            .filter((item: SocialNetwork) => item.enabled)
            .sort((a: SocialNetwork, b: SocialNetwork) => a.id! - b.id!)
        )
    }, [user])

    const handleDragEnd = (e: DragEndEvent) => {
        if(!user) {
            return
        }
        const array = arrayMove(enabledLinks, e.active.id as number - 1, e.over?.id as number - 1)
        const newLinks = array.map((l, i) => ({ ...l, id: i + 1 }))
        setEnabledLinks(newLinks)
        const links = JSON.parse(user.links) as SocialNetwork[]
        const mergeLinks = links.map(l => {
            const linksWithId = newLinks.find(lwId => lwId.name === l.name && lwId.enabled)

            if (linksWithId) {
                return linksWithId
            }

            return l
        })

        setUser({ ...user, links: JSON.stringify(mergeLinks) })
        

    }

    return (
        <>
            <Header/>
            <div className="bg-gray-300  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">

                    <NavigationTabs />

                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/${user?.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil / {user?.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            <p className="text-4xl text-center text-white">{user?.handle}</p>

                            {
                                user?.image &&
                                <div className="mx-auto w-[250px] h-[250px]">
                                    <img src={user?.image} alt={user?.name} className="w-[250px] h-[250px] object-contain" />
                                </div>
                            }

                            <p className="text-center text-lg font-black text-white">{user?.description}</p>

                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="mt-20 flex flex-col gap-5">
                                    <SortableContext
                                        items={enabledLinks}
                                        strategy={verticalListSortingStrategy}
                                    >

                                        {
                                            enabledLinks.map(link => (
                                                <DevTreeLink key={link.name} link={link} />
                                            ))
                                        }
                                    </SortableContext>
                                </div>
                            </DndContext>
                        </div>
                    </div>

                </main >
            </div >
            <Toaster position="top-right" />
        </>
    )
}