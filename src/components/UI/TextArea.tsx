import type { TextareaHTMLAttributes } from "react"


interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string
    label: string
    error?: string
    clasName?: string
}

export default function TextArea ({
    id,
    label,
    error,
    className,
    ...props
}: TextAreaProps) {
    return (
        <div className="grid grid-cols-1 space-y-3">
            <label htmlFor={id} className="text-2xl text-slate-500">{label}</label>

            <textarea
                id={id}
                className={`bg-slate-300 border-none p-3 rounded-lg placeholder-slate-400 w-full ${className}`}
                {...props}
            />

            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}