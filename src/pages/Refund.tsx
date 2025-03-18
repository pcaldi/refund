import { useState } from "react";

import { CATEGORIES, CATEGORIES_KEY } from "../utils/categories";

import { Input } from "../components/Input";
import { Select } from "../components/Select";


export function Refund() {

    const [category, setCategory] = useState("")


    return (
        <form className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w[512px]">
            <header>
                <h1 className="font-bold text-xl text-gray-100">Solicitação de reembolso</h1>
                <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solicitar reembolso.</p>
            </header>

            <Input
                required
                legend="Nome da solicitação"
            />

            <div className="flex gap-4">
                <Select
                    required
                    legend="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {
                        CATEGORIES_KEY.map(category => (
                            <option key={category} value={category}>
                                {CATEGORIES[category].name}
                            </option>
                        ))
                    }
                </Select>

                <Input
                    required
                    legend="Valor"
                    placeholder="0,00"
                />
            </div>

            <Input
                required
                legend="Comprovante"
            />


        </form >

    )
}
