import { Navigate} from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "../utils/queryOptions";
import DevTree from "../components/DevTree";

export default function AppLayout() {

    const { isError, isLoading, error, data } = useQuery(userQueryOptions)

    if(isLoading) {
        return 'Cargando'
    }

    if(isError) {
        if(error.name === 'UnauthorizedError') {
            return <Navigate to={'/'} replace/>
        }
        return <p>{error.message}</p>
    }
    if(data) {
        return (
            <DevTree data={data}/>
        )
    }
}