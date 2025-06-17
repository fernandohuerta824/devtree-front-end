import { Switch } from "@headlessui/react"
import { classNames } from "../utils"
import type { SocialNetwork } from "../types"

type DevTreeInputProps = {
    item: SocialNetwork
    onChangeSocial: (socialNetwork: string, url: string) => void
    onChangeEnabled: (socialNetwork: string, onBlur?: boolean) => void
}

export function DevTreeInput({ item, onChangeSocial, onChangeEnabled }: DevTreeInputProps) {
    return (
        <div className="bg-white shadow-md p-5 flex items-center gap-3 rounded-2xl">
            <div
                className="w-12 h-12 bg-cover"
                style={{
                    backgroundImage: `url(/social/icon_${item.name}.svg)`
                }}
            >

            </div>
            <input
                type="text"
                className="flex-1 border border-gray-400 rounded-lg"
                onChange={(e) => {onChangeSocial(item.name, e.target.value)}}
                value={item.url|| `https://${item.name}.com/`}
                onBlur={() => onChangeEnabled(item.name, true)}
            />
            <Switch
                checked={item.enabled}
                onChange={() => {onChangeEnabled(item.name)}}
                className={classNames(
                    item.enabled ? 'bg-blue-500' : 'bg-gray-400',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        item.enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>
        </div>
    )
}