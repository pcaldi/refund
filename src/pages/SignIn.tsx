import { useActionState } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { api } from "../services/api";

import { useAuth } from "../hooks/useAuth";
import { useAlert } from "../hooks/useAlert"

import { Button } from "../components/Button";
import { Input } from "../components/Input";


const signInSchema = z.object({
    email: z.string().email({ message: "E-mail inválido." }),
    password: z.string().trim().min(1, { message: "Informe a senha." })
})

export function SignIn() {
    const [state, formAction, isLoading] = useActionState(signIn, null)

    const { save } = useAuth()
    const { showAlert } = useAlert()

    async function signIn(prevState: any, formData: FormData) {
        try {
            const data = signInSchema.parse({
                email: formData.get("email"),
                password: formData.get("password")
            })

            const response = await api.post("/sessions", data)

            save(response.data)


        } catch (error) {

            if (error instanceof ZodError) {
                //alert(error.issues[0].message)
                return showAlert({
                    title: "Erro",
                    text: error.issues[0].message,
                    icon: "error"
                })
            }

            if (error instanceof AxiosError) {
                //return alert(error.response?.data.message)
                return showAlert({
                    title: "Erro",
                    text: error.response?.data.message,
                    icon: "error"
                })
            }

            showAlert({
                title: "Erro ao conectar",
                text: "Não foi possível realizar o login.",
                icon: "info"
            })
        }

    }

    return (
        <form action={formAction} className="w-full flex flex-col gap-4">
            <Input
                required
                name="email"
                legend="E-mail"
                type="email"
                placeholder="seu@email.com"
                autoComplete="username"
            />

            <Input
                required
                name="password"
                legend="Senha"
                type="password"
                placeholder="123456"
                autoComplete="current-password"

            />

            <p className="text-red-600 text-sm my-4 font-medium text-center">
                {
                    state?.message
                }
            </p>

            <Button type="submit" isLoading={isLoading}>
                Entrar
            </Button>

            <a
                href="/signup"
                className="text-sm font-semibold text-gray-100 text-center mt-10 mb-4 hover:text-green-800 transition ease-linear"
            >
                Criar conta
            </a>
        </form>
    )
}
