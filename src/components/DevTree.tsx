import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import logoSVG from './../assets/logo.svg'
import NavigationTabs from "../components/NavigationTabs";
import { type SocialNetwork, type User } from "../types";
import { useEffect, useState } from "react";
import DevTreeLink from "./DevTreeLinks";
import { useQueryClient } from "@tanstack/react-query";

type DevTreeProps = {
    data: User
}

export default function DevTree({ data }: DevTreeProps) {

    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
        JSON.parse(data?.links as string)
            .filter((item: SocialNetwork) => item.enabled)
            .sort((a: SocialNetwork, b: SocialNetwork ) => a.id - b.id)
    )
    const queryClient = useQueryClient()


    useEffect(() => {
        setEnabledLinks(JSON.parse(data?.links as string)
            .filter((item: SocialNetwork) => item.enabled)
            .sort((a: SocialNetwork, b: SocialNetwork ) => a.id - b.id)
        )
    }, [data])

    const handleDragEnd = (e: DragEndEvent) => {
        const array = arrayMove(enabledLinks, e.active.id as number - 1, e.over?.id as number - 1)
        const user: User = queryClient.getQueryData(['user'])!
        const newLinks = array.map((l, i) => ({...l, id: i + 1}))
        setEnabledLinks(newLinks)
        const links = JSON.parse(user.links) as SocialNetwork[]
        const mergeLinks = links.map(l => {
            const linksWithId = newLinks.find(lwId => lwId.name === l.name && lwId.enabled)

            if(linksWithId) {
                return linksWithId
            }

            return l
        })

        queryClient.setQueryData(['user'], (prevUser: User) => {
            return { ...prevUser, links: JSON.stringify(mergeLinks) }
        })
    }

    return (
        <>
            <header className="bg-slate-800 py-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <img src={logoSVG} className="w-full block" alt="Logo de LinkTree" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                        <button
                            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                            onClick={() => { }}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-gray-300  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">

                    <NavigationTabs />

                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil / {data.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            <p className="text-4xl text-center text-white">{data.handle}</p>

                            {
                                data.image && 
                                <div className="mx-auto w-[250px] h-[250px]">
                                    <img src={data.image} alt={data.name} className="w-[250px] h-[250px] object-contain"/>
                                </div>
                            }

                            <p className="text-center text-lg font-black text-white">{data.description}</p>

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
                                                <DevTreeLink key={link.name} link={link}/>
                                            ))
                                        }
                                    </SortableContext>
                                </div>
                            </DndContext>

                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-center" duration={5000} />
        </>
    )
}