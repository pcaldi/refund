import { createContext, ReactNode } from "react"

export const AuthContext = createContext({})


export function AuthProvider({ children }: { children: ReactNode }) {
    return (
        <AuthContext.Provider value={{ name: "Paulo Ricardo", email: "paulo@email.com" }}>
            {children}
        </AuthContext.Provider>
    )



}
