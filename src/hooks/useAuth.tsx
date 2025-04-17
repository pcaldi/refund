import { use } from "react"

import { AuthContext } from "../contexts/AuhContext";


export function useAuth() {
    const context = use(AuthContext)

    return context
}
