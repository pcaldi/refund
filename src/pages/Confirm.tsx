import { useLocation, Navigate } from "react-router"

import okSvg from "../assets/ok.svg"


export function Confirm() {

    const location = useLocation()

    // Verifico se tem um estado, fromSubmit, criado na outra página
    // E se esse estado é verdadeiro, redireciono para a página inicial.
    // Caso contrário redireciono para a página inicial
    if (!location.state?.fromSubmit) {
        return <Navigate to="/" />
    }


    return (
        <div className="w-full flex flex-col bg-gray-500 rounded-lg p-10 items-center gap-4 lg:w-[512px]">
            <h1 className="font-bold text-xl text-green-100">Solicitação enviada!</h1>
            <img src={okSvg} alt="Ícone de ok" className="w-24" />
            <p className="text-sm text-gray-200 text-center">Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o setor financeiro irá entrar em contato com você.</p>
            <a href="/" className="text-sm mt-4 font-semibold text-center w-full p-4 rounded-lg bg-green-100 text-white hover:bg-green-200 transition ease-linear">Nova solicitação</a>
        </div>
    )
}
