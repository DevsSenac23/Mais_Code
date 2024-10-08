"use client"
import { useRouter } from "next/navigation"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const hoje = new Date()
    var dataHojeFormatado = `${hoje.getFullYear()}-${(hoje.getMonth().toString().padStart(2, "0"))}`

    const [startDate, setStartDate] = useState(dataHojeFormatado);

    const router = useRouter()
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    // const headers = [
    //     { label: "numero_contrato", key: "numero_contrato" },
    //     { label: "data_inicio", key: "data_inicio" },
    //     { label: "data_fim", key: "data_fim" },
    //     { label: "nome_cliente", key: "nome_cliente" },
    //     { label: "nome_vendedor", key: "nome_vendedor" }

    // ];

    function handleSubmit() {
        // Lógica para submissão do formulário (opcional)
        console.log("Formulário enviado:", { startDate })
    }


    console.log(table.getRowModel().rows.map(row => row.original))
    

    return (
        <div>
            <div className="flex flex-col items-start py-5 input-container">
           

            <div className="bg-white h-3/5 shadow-xl shadow-gray-400 rounded-lg p-4">
            <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={(table.getColumn("nome_cliente")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("nome_cliente")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm border border-gray-300 rounded-md shadow-md shadow-gray-400 py-2 px-4 focus:outline-none focus:border-blue-500"
                />
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => router.push(`/routes/relatorio/${Number(row.id) + 1}`)}
                                    className="cursor-pointer"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="bg-gray-100 text-center">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Nenhum Resultado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="space-x-3 mt-4 flex justify-center items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próximo
                    </Button>
                </div>
            </div>
            </div>
        </div>
    );
}