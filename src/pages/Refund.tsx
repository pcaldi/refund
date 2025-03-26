import { useState } from "react";

import { useNavigate, useParams } from "react-router";

import { CATEGORIES, CATEGORIES_KEY } from "../utils/categories";

import fileSvg from "../assets/file.svg"

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";


export function Refund() {

    const [name, setName] = useState("Paulo")
    const [amount, setAmount] = useState("34")
    const [category, setCategory] = useState("TRANSPORT")
    const [isLoading, setIsLoading] = useState(false)
    const [filename, setFilename] = useState<File | null>(null)

    const navigate = useNavigate()
    const params = useParams<{ id: string }>()

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()

        console.log(name, category, amount, filename)
        setName("")
        setCategory("")
        setAmount("")
        setFilename(null)

        if (params.id) {
            navigate(-1)
        }

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
                disabled={!!params.id}
            />

            <div className="flex gap-4">
                <Select
                    required
                    legend="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={!!params.id}
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
                    disabled={!!params.id}
                />
            </div>

            {
                params.id ?
                    (<a href="https://www.google.com/" target="_blank" className="flex flex-1 gap-2 text-sm text-green-100 font-semibold items-center justify-center my-6 hover:opacity-75">
                        <img
                            src={fileSvg}
                            alt="Ícone de um arquivo"
                        />
                        Abrir comprovante
                    </a>)
                    :
                    (<Upload
                        legend="Comprovante"
                        filename={filename && filename.name}
                        onChange={(e) => e.target.files && setFilename(e.target.files[0])}
                    />)
            }


            <Button type="submit" isLoading={isLoading}>
                {
                    params.id ? "Voltar" : "Enviar"
                }
            </Button>

        </form >


    )
}
