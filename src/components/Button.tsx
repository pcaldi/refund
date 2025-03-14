
type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean
}


export function Button({ isLoading, children, type = "button", ...rest }: Props) {

    return (
        <button
            className="flex items-center justify-center h-12 cursor-pointer rounded-lg text-white bg-green-100 border border-none hover:bg-green-200 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-progress"
            type={type}
            disabled={isLoading}
            {...rest}
        >
            {children}
        </button>
    )
}
