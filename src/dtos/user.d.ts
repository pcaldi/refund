// Data Transfer Objects

type UserAPIRole = "employee" | "manager"

type UserAPIResponse = {
    token: string
    user: {
        name: string
        email: string
        id: string
        role: UserAPIRole
    }
}
