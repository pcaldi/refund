import { Route, Routes } from "react-router";


import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

import { AuthLayout } from "../components/AuthLayout";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="/" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
            </Route>
        </Routes>
    )
}
