import { useState } from "react";
import { z, ZodError } from "zod"
import { AxiosError } from "axios";

import { useNavigate } from "react-router"

import { useAlert } from "../hooks/useAlert";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Input } from "../components/Input";



const signUpSchema = z.object({
    name: z.string().min(1, { message: "Informe o nome." }),
    email: z.string().email({ message: "E-mail inválido." }),
    password: z.string().min(6, { message: "A senha deve conter 6 dígitos." }),
    passwordConfirm: z.string({ message: "Confirme a senha." })
})// Propriedade para recuperar os dados da validação
    .refine((data) => data.password === data.passwordConfirm, {
        message: "As senhas senhas não são iguais.",
        path: ["passwordConfirm"] //campo utilizado como referencia
    })

export function SignUp() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { showAlert, showConfirm } = useAlert()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            setIsLoading(true)

            const data = signUpSchema.parse({
                name,
                email,
                password,
                passwordConfirm
            })

            await api.post("/users", data)

            const result = await showConfirm({
                title: "Cadastrado com sucesso!",
                text: "Deseja ir para tela de login?",
                icon: "success"
            })

            if (result.isConfirmed) {
                navigate("/")
            }

        } catch (error) {
            if (error instanceof ZodError) {
                return showAlert({
                    title: "Erro de validação",
                    text: error.issues[0].message,
                    icon: "warning"
                })
            }

            if (error instanceof AxiosError) {
                return showAlert({
                    title: "Erro",
                    text: error.response?.data.message,
                    icon: "error"
                })
            }

            showAlert({
                title: "Erro inesperado",
                text: "Não foi possível cadastrar.",
                icon: "error"
            })
        } finally {
            setIsLoading(false)
        }


    }

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
            <Input
                required
                legend="Nome"
                placeholder="Seu nome"
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
            />

            <Input
                required
                legend="E-mail"
                type="email"
                placeholder="seu@email.com"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
            />

            <Input
                required
                legend="Senha"
                type="password"
                placeholder="123456"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
            />

            <Input
                required
                legend="Confirmar senha"
                type="password"
                placeholder="Confirme sua senha"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                autoComplete="new-password"
            />

            <Button type="submit" isLoading={isLoading}>
                Cadastrar
            </Button>

            <a
                href="/"
                className="text-sm font-semibold text-gray-100 text-center mt-10 mb-4 hover:text-green-800 transition ease-linear"
            >
                Já tenho uma conta
            </a>
        </form>
    )
}
