import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn() {
    return (
        <form className="w-full flex flex-col gap-4">
            <Input
                required
                legend="E-mail"
                type="email"
                placeholder="seu@email.com"
            />

            <Input
                required
                legend="Senha"
                type="password"
                placeholder="123456"
            />

            <Button>
                Entrar
            </Button>
        </form>
    )
}
