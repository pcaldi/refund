import { useState } from "react";

import { useNavigate, useParams } from "react-router";

import { CATEGORIES, CATEGORIES_KEY } from "../utils/categories";

import { z, ZodError } from "zod";

import { AxiosError } from "axios";

import { api } from "../services/api";

import fileSvg from "../assets/file.svg";

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";


const refundSchema = z.object({
    name: z.string().min(1, { message: "Informe o nome da solicitação" }),
    category: z.string().min(1, { message: "Informe pelo menos uma categoria" }),
    amount: z.coerce.number({ message: "Informe um valor válido" }).positive({ message: "O valor deve ser positivo" })
})

export function Refund() {

    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const navigate = useNavigate()
    const params = useParams<{ id: string }>()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (params.id) {
            navigate(-1)
        }

        try {
            setIsLoading(true)


            if (!file) {
                return alert("Adicione o comprovante!")
            }

            const fileUploadForm = new FormData()

            fileUploadForm.append("file", file)

            const response = await api.post("/uploads", fileUploadForm)


            const data = refundSchema.parse({
                name,
                category: category.toLocaleLowerCase(),
                amount: amount.replace(",", ".")//utilizo o replace para substituir a "," pelo "."
            })

            await api.post("/refunds", {
                ...data,
                filename: response.data.filename
            })

            //Insiro um estado "state", na navegação que vem de um submit
            navigate("/confirm", { state: { fromSubmit: true } })
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                return alert(error.issues[0].message)
            }

            if (error instanceof AxiosError) {
                return alert(error.response?.data.message)
            }

            alert("Não foi possível realizar a solicitação.")

        } finally {
            setIsLoading(false)
        }
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
                        filename={file && file.name}
                        onChange={(e) => e.target.files && setFile(e.target.files[0])}
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
