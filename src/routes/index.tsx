import { BrowserRouter } from "react-router";

import { Loading } from "../components/Loading";

import { AuthRoutes } from "./AuthRoutes";
import { ManagerRoutes } from "./ManagerRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";


const isLoading = false;

export function Routes() {

    if (isLoading) {
        return <Loading />
    }

    const session = {
        user: {
            role: "",
        }
    }

    function Route() {
        switch (session.user.role) {
            case "manager":
                return <ManagerRoutes />
            case "employee":
                return <EmployeeRoutes />
            default:
                return <AuthRoutes />
        }
    }


    return (
        <BrowserRouter>
            <Route />
        </BrowserRouter>
    )
}
