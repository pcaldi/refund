import { useState } from "react";

import searchSvg from "../assets/search.svg"

import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Dashboard() {
    const [search, setSearch] = useState("")


    function fetchRefunds(e: React.FormEvent) {
        e.preventDefault()

        console.log(search)
    }


    return (
        <div className="bg-gray-500 rounded-xl p-10 w-full md:min-w-[762px]">
            <h1 className="font-bold text-xl text-gray-100 flex-1">Solicitações</h1>

            <form className="flex flex-1 gap-2 mt-6 border-b-[1px]  border-gray-400 pb-6 md:flex-row">
                <Input placeholder="Pesquisar pelo nome" onChange={(e) => setSearch(e.target.value)} value={search} />
                <Button onClick={fetchRefunds}>
                    <img src={searchSvg} alt="Ícone de uma lupa" className="p-4" />
                </Button>
            </form>



        </div>
    )
}
