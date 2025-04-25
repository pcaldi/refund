import { useEffect, useState } from "react";

import searchSvg from "../assets/search.svg"

import { api } from "../services/api";
import { AxiosError } from "axios";

import { CATEGORIES } from "../utils/categories";
import { formatCurrency } from "../utils/formatCurrency";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Pagination } from "../components/Pagination";
import { RefundItem, RefundItemProps } from "../components/RefundItems";

// Quantos registros por página exibir
const PER_PAGE = 3

export function Dashboard() {
    const [name, setName] = useState("")
    const [page, setPage] = useState(1)
    const [totalOfPages, setTotalOfPages] = useState(0)
    const [refunds, setRefunds] = useState<RefundItemProps[]>([])


    async function fetchRefunds() {
        try {
            const response = await api.get<RefundsPaginationAPIResponse>(
                `/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`)

            setRefunds(
                response.data.refunds.map((refund) => ({
                    id: refund.id,
                    name: refund.user.name,
                    description: refund.name,
                    amount: formatCurrency(refund.amount),
                    categoryImg: CATEGORIES[refund.category].icon

                }))
            )

            setTotalOfPages(response.data.pagination.totalPages)

        } catch (error) {
            console.log(error)

            if (error instanceof AxiosError) {
                alert(error.response?.data.massage)
            }
        }

    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()

        fetchRefunds()
    }

    function handlePageChange(action: "previous" | "next") {
        setPage((prevPage) => {
            if (action === "next" && prevPage < totalOfPages) {
                return prevPage + 1;
            }

            if (action === "previous" && prevPage > 1) {
                return prevPage - 1;
            }

            return prevPage
        })
    }

    useEffect(() => {
        fetchRefunds()
    }, [])

    return (
        <div className="bg-gray-500 rounded-xl p-10 w-full md:min-w-[762px]">
            <h1 className="font-bold text-xl text-gray-100 flex-1">Solicitações</h1>

            <form
                onSubmit={onSubmit}
                className="flex flex-1 gap-2 mt-6 border-b-[1px]  border-gray-400 pb-6 md:flex-row"
            >

                <Input
                    placeholder="Pesquisar pelo nome"
                    onChange={(e) => setName(e.target.value)}
                />

                <Button type="submit" variant="icon">
                    <img
                        src={searchSvg}
                        alt="Ícone de uma lupa"
                        className="w-5"
                    />
                </Button>

            </form>

            <div className="my-6 flex flex-col gap-4 max-h-[345px] overflow-y-scroll">
                {
                    refunds.map((item) => (
                        <RefundItem key={item.id} data={item} href={`/refund/${item.id}`} />

                    ))
                }
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalOfPages}
                onPrevious={() => handlePageChange("previous")}
                onNext={() => handlePageChange("next")}
            />


        </div>
    )
}
