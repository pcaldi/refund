import { Outlet } from "react-router";

import logoSVG from "../assets/logo.svg"


export function AuthLayout() {
    return (
        <div className="w-screen h-screen bg-gray-400 flex flex-col justify-center items-center text-gray-100 p-8">
            <main className="bg-gray-500 rounded-md flex items-center flex-col w-full md:max-w-[462px] p-8">
                <img src={logoSVG} alt="Logo da aplicação" className="my-8" />
                <Outlet />
            </main>

        </div>
    )
}
