import { Routes } from "./routes";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./contexts/AuhContext";


export function App() {
    return (
        <AuthProvider >
            <Toaster />
            <Routes />
        </AuthProvider>
    )
}
