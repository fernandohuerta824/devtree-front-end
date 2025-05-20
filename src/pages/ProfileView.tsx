import { useRouteLoaderData } from "react-router-dom";
import { Await } from "react-router-dom";

import Input from "../components/UI/Input";
import TextArea from "../components/UI/TextArea";
import { Suspense } from "react";

export default function ProfileView() {
    const {data} = useRouteLoaderData('user')
    console.log(data)
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data} children={(data) => (
                <form
                    className="bg-white p-10 rounded-lg space-y-5"
                    onSubmit={() => { }}
                >

                    <Input
                        label="Handle"
                        type="text"
                        id="handle"
                        className="border-none rounded-lg p-2"
                        placeholder="Handle o Nombre de Usuario"
                    />

                    <TextArea
                        id="description"
                        label="Descripción"
                        placeholder="Tu Descripción"
                        rows={2}
                        className="border-none rounded-lg p-2 resize-none"
                    />

                    <Input 
                        label="Imagen"
                        id="image"
                        type="file"
                        name="handle"
                        className="border-none rounded-lg p-2"
                        accept="image/*"
                        onChange={() => { }}
                    />

                    <input
                        type="submit"
                        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                        value='Guardar Cambios'
                    />
                </form>
            )}>
            </Await>
        </Suspense>
    )
}