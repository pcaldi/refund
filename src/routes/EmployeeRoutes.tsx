import { Routes, Route } from "react-router";

import { Refund } from "../pages/Refund";
import { Confirm } from "../pages/Confirm";
import { NotFound } from "../pages/NotFound";

import { AppLayout } from "../components/AppLayout";

export function EmployeeRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Refund />} />
                <Route path="/confirm" element={<Confirm />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
