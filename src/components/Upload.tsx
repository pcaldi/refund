import uploadSvg from "../assets/upload.svg"


type Props = React.ComponentProps<"input"> & {
    legend?: string
    filename?: string | null
}

export function Upload({ legend, filename = null, ...rest }: Props) {
    return (
        <div>

            {legend &&
                (<legend className="uppercase text-xxs mb-2 text-gray-100">
                    {legend}
                </legend>)
            }

            <div className="w-full h-12 flex items-center rounded-lg text-gray-200 border border-gray-300 bg-transparent pl-4 text-sm">

                <input
                    id="upload"
                    type="file"
                    className="hidden"
                    {...rest}
                />

                <span className="flex-1 text-xs ">
                    {filename ?? "Selecione o arquivo"}
                </span>

                <label htmlFor="upload" className="flex h-12 items-center px-4 rounded-lg bg-green-100 hover:bg-green-200 transition ease-linear cursor-pointer" >
                    <img src={uploadSvg} alt="Upload" className="h-6 w-6" />
                </label>

            </div>

        </div>

    )
}
