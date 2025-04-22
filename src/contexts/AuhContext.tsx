import { createContext, ReactNode, useEffect, useState } from "react"

type AuthContext = {
    isLoading: boolean
    session: null | UserAPIResponse
    save: (data: UserAPIResponse) => void
    remove: VoidFunction
}

const LOCAL_STORAGE_KEY = "@refund"


export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {

    const [session, setSession] = useState<null | UserAPIResponse>(null)
    const [isLoading, setIsLoading] = useState(true)

    function save(data: UserAPIResponse) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token)

        setSession(data)
    }

    function loadUser() {
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
        const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)

        if (token && user) {
            setSession({
                token,
                user: JSON.parse(user)
            })
        }

        setIsLoading(false)
    }

<<<<<<< HEAD
    function remove() {
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)


        setSession(null)
    }

=======
>>>>>>> a92fcc3699387cfef2d51897c19fc39712cf3262
    useEffect(() => {
        loadUser()
    }, [])


    return (
<<<<<<< HEAD
        <AuthContext.Provider value={{ session, save, isLoading, remove }}>
=======
        <AuthContext.Provider value={{ session, save, isLoading }}>
>>>>>>> a92fcc3699387cfef2d51897c19fc39712cf3262
            {children}
        </AuthContext.Provider>
    )



}
