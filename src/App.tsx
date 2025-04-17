import { Routes } from "./routes";

import { AuthProvider } from "./contexts/AuhContext";


export function App() {
    return (
        <AuthProvider >
            <Routes />
        </AuthProvider>
    )
}
