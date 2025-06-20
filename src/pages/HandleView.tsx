import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { getUserByHandle } from "../api/DevTreeAPI"
import HandleData from "../components/HandleData"

export default function HandleView() {
    const params= useParams()!
    const handle = params.handle!
    
    const { data, isLoading } = useQuery({
        queryFn: () => getUserByHandle(handle),
        queryKey: ['handle', handle],
        refetchOnWindowFocus: false,
    }) 
    
    if(isLoading) {
        return <p>Loading...</p>
    }

    if(data === null) {
        return <Navigate to={'/404'}/>
    }

    if(data) {
        return (
            <HandleData data={data}/>
        )
    }
}