"use client"

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
    id: number
    valor_total: number
    status: | "Em andamento " | "Concluido" | "Inativo"
    email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "NºContrato",
        header: () => <div className="text-center w-auto max-w-12">NºContrato</div>,
        cell: ({ row }) => <div className="lowercase">#{row.getValue("NºContrato")}</div>,
    },

    {
        accessorKey: "Data_Venda",
        header: () => <div className="text-center w-auto min-w-24">Data</div>,
        cell: ({ row }) => <div className="lowercase">{row.getValue("Data_Venda")}</div>,
    },

    {
        accessorKey: "Cliente",
        header: () => <div className="text-center min-w-24">Cliente</div>,
        cell: ({ row }) => <div className="lowercase">{row.getValue("Cliente")}</div>,
    },

    {
        accessorKey: "Valor",
        header: () => <div className="text-center">Valor</div>,
        cell: ({ row }) => {
            const quantia = parseFloat(row.getValue("Valor"))


            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(quantia)

            return <div className="text-center">{formatted}</div>
        },
    },
    
    {
        accessorKey: "status",
        header: () => <div className="text-center min-w-28">Status</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("status")}</div>
        ),
    },

    
]
