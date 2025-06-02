import { Await, useLoaderData } from "react-router-dom";
import AuthProvider from "../components/providers/AuthProvider";
import { Suspense } from "react";
import Redirect from "../components/Redirect";
import Loading from "../components/UI/Loading";

export default function RootLayout() {
    const { data } = useLoaderData()

    return (
        <>
            <Suspense fallback={
                <div className="h-dvh bg-gray-300">
                    <Loading/>
                </div>
            }>
                <Await resolve={data} >
                    {({ user }) => {
                        return (
                        <AuthProvider user={user}>
                            <Redirect/>
                        </AuthProvider>
                    )}}
                </Await>
            </Suspense>
 
        </>
    )
}