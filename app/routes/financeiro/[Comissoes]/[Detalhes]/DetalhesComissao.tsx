'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Detalhescomissao() {
    return (
        <div className="flex space-x-5">
            <div className="">
                <Card className="w-[350px] shadow-xl rounded-lg">
                    <CardHeader>
                        <CardTitle>Detalhes contrato</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="Insira">N° Contrato</Label>
                                    <Input className="rounded-none opacity-40" id="address" placeholder="Insira" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="cnpj/cpf">Data</Label>
                                    <Input className="rounded-none opacity-40" id="cpf" placeholder="Data" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="cnpj/cpf">Cliente</Label>
                                    <Input className="rounded-none opacity-40" id="cpf" placeholder="Nome" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="cnpj/cpf">Tipo</Label>
                                    <Input className="rounded-none opacity-40" id="cpf" placeholder="Tipo" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="cnpj/cpf">Parcelas</Label>
                                    <Input className="rounded-none opacity-40" id="cpf" placeholder="Parcelas" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="cnpj/cpf">Valor Total</Label>
                                    <Input className="rounded-none opacity-40" id="cpf" placeholder="Valor" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center items-center">
                <Card className=" h-[730px] w-[600] shadow-xl">
                    <CardHeader className="items-center">
                        <CardTitle>Detalhes parcelas</CardTitle>
                    </CardHeader>
                    <div className="flex space-x-2">
                        <ScrollArea className="h-[600px] w-[500px] rounded-md border p-4">
                            <Table>
                                <TableHeader>
                                    <TableRow className="grid-cols-3 grid-rows-3 space-x-5">
                                        <TableHead className="text-lg text-black text-center">Dias</TableHead>
                                        <TableHead className="text-lg text-center text-black">Parcelas</TableHead>
                                        <TableHead className="text-lg pl-7 text-black">Comissão</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                </TableBody>

                            </Table>
                        </ScrollArea>
                        <ScrollArea className="h-[600px] w-[500px] rounded-md border p-4">
                            <Table className="h-[600px] w-[500px] rounded-md border p-4">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center">20/01/2023</TableCell>
                                        <TableCell className="text-center">1x R$250.00</TableCell>
                                        <TableCell className="text-center">R$104.00</TableCell>
                                    </TableRow>
                                </TableBody>

                            </Table>
                        </ScrollArea>
                    </div>
                </Card>
            </div>
        </div>
    )
}

