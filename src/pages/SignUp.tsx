import { useState } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { z, ZodError } from "zod"


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

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            setIsLoading(true)

            const data = signUpSchema.parse({
                name,
                email,
                password,
                passwordConfirm
            })


        } catch (error) {
            if (error instanceof ZodError) {
                return alert(error.issues[0].message)
            }

            alert("Não foi possível cadastrar.")
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
            />

            <Input
                required
                legend="E-mail"
                type="email"
                placeholder="seu@email.com"
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                required
                legend="Senha"
                type="password"
                placeholder="123456"
                onChange={(e) => setPassword(e.target.value)}
            />

            <Input
                required
                legend="Confirmar senha"
                type="password"
                placeholder="Confirme sua senha"
                onChange={(e) => setPasswordConfirm(e.target.value)}
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
