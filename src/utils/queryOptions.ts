import { getUser } from "../api/DevTreeAPI";

export const userQueryOptions = {
    queryFn: getUser,
    queryKey: ['user'],
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity,
}