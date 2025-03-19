import { useState } from "react";

import { useNavigate } from "react-router";

import { CATEGORIES, CATEGORIES_KEY } from "../utils/categories";

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";


export function Refund() {

    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [filename, setFilename] = useState<File | null>(null)

    const navigate = useNavigate()

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()

        console.log(name, category, amount, filename)
        setName("")
        setCategory("")
        setAmount("")
        setFilename(null)

        //Insiro um estado "state", na navegação que vem de um submit
        navigate("/confirm", { state: { fromSubmit: true } })


    }


    return (
        <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w[512px]">
            <header>
                <h1 className="font-bold text-xl text-gray-100">Solicitação de reembolso</h1>
                <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solicitar reembolso.</p>
            </header>

            <Input
                required
                legend="Nome da solicitação"
                onChange={(e) => setName(e.target.value)}
                value={name}
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
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
            </div>

            <Upload
                legend="Comprovante"
                filename={filename && filename.name}
                onChange={(e) => e.target.files && setFilename(e.target.files[0])}
            />

            <Button type="submit" isLoading={isLoading}>
                Enviar
            </Button>

        </form >

    )
}
