import type { UserHandle } from "../types"

type HandleDataProps = {
    data: UserHandle
}

export default function HandleData({ data }: HandleDataProps ){

    return (
        <div className="space-y-6 text-white">
            <p className="text-5xl text-center font-black">{data.handle}</p>

            {data.image && <img src={data.image} className="max-w-[250px] mx-auto"/>}

            <p className="text-lg text-center font-bold">{data.description}</p>
            
            <div className="mt-20 flex flex-col gap-6">

                {
                    !data.links.length && 
                    <p className="text-center">There is no links tied to this profile</p>
                }

                {
                    data.links.length > 0 && data.links.map(l => (
                        <a 
                            className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
                            href={l.url}
                            target="_blank"
                            key={l.name}
                            rel="noreferrer noopener"
                        >
                            <img src={`/social/icon_${l.name}.svg`} alt="Social Network Icon" className="w-10"/>
                            <p className="text-black capitalize font-bold text-base">
                                Go to my: {l.name}
                            </p>
                        </a>
                    ))
                }
                
            </div>
        </div>
    )
}