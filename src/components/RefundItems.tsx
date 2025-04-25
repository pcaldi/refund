
type Props = React.ComponentProps<"a"> & {
    data: RefundItemProps
}

export type RefundItemProps = {
    id: string
    name: string
    amount: string
    description: string
    categoryImg: string
}


export function RefundItem({ data, ...rest }: Props) {
    return (
        <a
            className="flex flex-1 hover:bg-green-100/5 p-2 rounded-md items-center cursor-pointer gap-4"
            {...rest}
        >

            <img
                className="w-8 h-8"
                src={data.categoryImg}
                alt="Ícone de category"
            />

            <div className="flex flex-col flex-1">
                <strong className="text-sm text-gray-100">{data.name}</strong>
                <span className="text-xs text-gray-200">{data.description}</span>
            </div>

            <span className="text-sm text-gray-100 font-semibold">
                <small className="font-base text-gray-200">R$</small>
                {data.amount}
            </span>
        </a>
    )
}
