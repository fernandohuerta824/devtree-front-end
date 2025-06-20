import { Suspense } from "react"
import { Await, useLoaderData, useParams } from "react-router-dom"
import Loading from "../components/UI/Loading"
import type { UserHandle } from "../types"
import HandleData from "../components/HandleData"

export default function HandleView() {
    const data = useLoaderData()
    const params = useParams()  
    const handle = params.handle!

    return (
        <>
            <Suspense fallback={<Loading/>}>
                <Await resolve={data.user} children={(user: UserHandle) => (
                    <>
                        {user && <HandleData data={user}/>}
                        {!user && 
                            <>
                                <h1 className="font-bold text-4xl text-center text-white mb-10">Error 404</h1>
                                <p className="font-bold text-2xl text-center text-white">
                                    The user {handle} that you are trying to find does not exist or account not avaliable
                                </p>
                            </>
                        }
                    </>
                )} />
            </Suspense>
        </>
    )
}