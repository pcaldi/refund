import { useState } from "react";

import searchSvg from "../assets/search.svg"


import { CATEGORIES } from "../utils/categories";
import { formatCurrency } from "../utils/formatCurrency";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Pagination } from "../components/Pagination";
import { RefundItem } from "../components/RefundItems";


const REFUND_EXAMPLE = {
    id: "123",
    name: "Paulo",
    amount: formatCurrency(54.5),
    category: "Transporte",
    categoryImg: CATEGORIES.TRANSPORT.icon,
}

export function Dashboard() {
    const [search, setSearch] = useState("")


    function fetchRefunds(e: React.FormEvent) {
        e.preventDefault()

        console.log(search)

    }

    return (
        <div className="bg-gray-500 rounded-xl p-10 w-full md:min-w-[762px]">
            <h1 className="font-bold text-xl text-gray-100 flex-1">Solicitações</h1>

            <form onSubmit={fetchRefunds} className="flex flex-1 gap-2 mt-6 border-b-[1px]  border-gray-400 pb-6 md:flex-row">

                <Input
                    placeholder="Pesquisar pelo nome"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />

                <Button type="submit" variant="icon">
                    <img
                        src={searchSvg}
                        alt="Ícone de uma lupa"
                        className="w-5"
                    />
                </Button>

            </form>

            <div className="mt-6 flex flex-col gap-4 max-h-[345px] overflow-y-scroll">
                <RefundItem data={REFUND_EXAMPLE} />
            </div>

            <Pagination currentPage={1} totalPages={5} />

        </div>
    )
}
