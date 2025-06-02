import Input from "../components/UI/Input";
import TextArea from "../components/UI/TextArea";
import { useAuth } from "../hooks/useAuth";

export default function ProfileView() {
    const { user } = useAuth()
    return (
        <>
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
                    defaultValue={user?.handle}
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

        </>

    )
}