import leftSvg from "../assets/left.svg"
import rightSvg from "../assets/right.svg"

import { Button } from "./Button";

type Props = {
    currentPage: number
    totalPages: number
}

export function Pagination({ currentPage, totalPages }: Props) {
    return (
        <div className="flex flex-1 items-center justify-center gap-4">

            <Button variant="iconSmall">
                <img src={leftSvg} alt="Ícone de voltar" />
            </Button>

            <span className="text-sm text-gray-200">{currentPage} / {totalPages}</span>

            <Button variant="iconSmall">
                <img src={rightSvg} alt="Ícone de avançar" />
            </Button>
        </div>
    )
}
