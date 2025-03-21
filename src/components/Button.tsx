import { classMerge } from "../utils/classMerge"


type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean
    variant?: "base" | "icon" | "iconSmall"
}

const variants = {
    button: {
        base: "h-12",
        icon: "h-12 w-12",
        iconSmall: "h-8 w-8"
    }
}


export function Button({ isLoading, children, className, variant = "base", type = "button", ...rest }: Props) {

    return (
        <button
            className={
                classMerge([
                    "flex items-center justify-center cursor-pointer rounded-lg text-white bg-green-100 border border-none hover:bg-green-200 transition-all duration-300 ease-in-out disabled:opacity-50",
                    isLoading && "disabled:cursor-progress",
                    variants.button[variant]
                ], className)
            }
            type={type}
            disabled={isLoading}
            {...rest}
        >
            {children}
        </button>
    )
}
