import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { GoGear } from "react-icons/go";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createNewSell } from "@/lib/VendaController";
import { dadosCliente, dadosModelo_contrato, dadosProduto } from "@/lib/interfaces/dadosUsuarios";
import { getAllProduto } from "@/lib/ProdutoController";
import { getAllContratos } from "@/lib/ContratoController";
import { getAllClient } from "@/lib/ClienteController";
import CardCliente from '@/components/CardClienteGestao';
import PopUpConfig from "./PopUpConfig";
import { getCookie } from "@/lib/coockie";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export default function CardCadastro() {
    const [numero_parcelas, setNumeroParcelas] = useState("");
    const [valor_entrada, setValorEntrada] = useState("");
    const [TiposProduto, setTipoProduto] = useState<dadosProduto[]>([]);
    const [ModeloContrato, setModeloContrato] = useState<dadosModelo_contrato[]>([]);
    const [listaCliente, setListaCliente] = useState<dadosCliente[]>([]);
    const [mostrarParcelas, setMostrarParcelas] = useState(false);
    const [DataInicio, setDataInicio] = useState("");
    const [DataFim, setDataFim] = useState("");
    const [nome_contato, setNomeContato] = useState("");
    const [telefone, setTelefoneContato] = useState("");
    const [email, setEmailContato] = useState("");
    const [new_cliente_id, setnew_cliente_id] = useState("");
    const [new_tipo_contrato_id, setnew_tipo_contrato_id] = useState("");
    const [new_produto_id, setnew_produto_id] = useState("");
    const [new_usuario_id, setnew_usuario_id] = useState("");
    const [valor_total, setvalortotal] = useState(0);
    const [metodo_pagamento, setmetodo_pagamento] = useState("");
    const [numero_parcelo, setnumero_parcelo] = useState("1");
    const [cpf_cnpj_input, setCpfCnpjInput] = useState("");
    const [statusCliente, setstatusCliente] = useState("");
    const [statusClienteValor, setstatusClienteValor] = useState(0);
    const [foundCliente, setFoundCliente] = useState<dadosCliente | null>(null);
    const [horas_trabalhadas, setHorasTrabalhadas] = useState(0);
    const route = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (foundCliente) {
            setnew_cliente_id(foundCliente.id.toString());
        }
    }, [foundCliente]);

    useEffect(() => {
        async function fetchUsername() {
            const user = await getCookie("CookiCriado");
            setnew_usuario_id(user || "Usuário");
        }
        fetchUsername();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const tipos_contrato = await getAllContratos();
            setModeloContrato(tipos_contrato);
            const tipo_Produto = await getAllProduto();
            setTipoProduto(tipo_Produto);
            const LCliente = await getAllClient();
            setListaCliente(LCliente);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (new_produto_id && horas_trabalhadas) {
            const selectedProduct = TiposProduto.find(produto => produto.id.toString() === new_produto_id);
            if (selectedProduct) {
                setvalortotal(selectedProduct.horas_trabalhadas * horas_trabalhadas);
            }
        }
    }, [new_produto_id, horas_trabalhadas, valor_entrada]);

    useEffect(() => {
        if (new_produto_id) {
            const selectedProduct = TiposProduto.find(produto => produto.id.toString() === new_produto_id);
            if (selectedProduct) {
                const comissao = statusCliente === "antigo" ? selectedProduct.comissao_antiga : selectedProduct.comissao_nova;
                setstatusClienteValor(comissao);
            }
        }
    }, [statusCliente, new_produto_id]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!cpf_cnpj_input) newErrors.cpf_cnpj_input = "CPF/CNPJ é obrigatório";
        if (!DataInicio) newErrors.DataInicio = "Data de início é obrigatória";
        if (!DataFim) newErrors.DataFim = "Data de fim é obrigatória";
        if (!new_tipo_contrato_id) newErrors.new_tipo_contrato_id = "Modelo de contrato é obrigatório";
        if (!new_produto_id) newErrors.new_produto_id = "Produto é obrigatório";
        if (!horas_trabalhadas) newErrors.horas_trabalhadas = "Horas trabalhadas são obrigatórias";
        if (!nome_contato) newErrors.nome_contato = "Nome do contato é obrigatório";
        if (!telefone) newErrors.telefone = "Telefone do contato é obrigatório";
        if (!email) newErrors.email = "Email do contato é obrigatório";
        if (!metodo_pagamento) newErrors.metodo_pagamento = "Método de pagamento é obrigatório";

        if (Object.keys(newErrors).length > 0) {
            toast({
                title: "Erro de Validação",
                description: "Por favor, preencha todos os campos obrigatórios.",
            });
            return false;
        }

        return true;
    };

    const resetForm = () => {
        setNumeroParcelas("");
        setValorEntrada("");
        setMostrarParcelas(false);
        setDataInicio("");
        setDataFim("");
        setNomeContato("");
        setTelefoneContato("");
        setEmailContato("");
        setnew_cliente_id("");
        setnew_usuario_id("");
        setvalortotal(0);
        setmetodo_pagamento("");
        setnumero_parcelo("1");
        setCpfCnpjInput("");
        setstatusCliente("");
        setstatusClienteValor(0);
        setFoundCliente(null);
        setHorasTrabalhadas(0);
    };

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!validateForm()) return;

        const datadoinicio = new Date(DataInicio);
        const datadofim = new Date(DataFim);

        await createNewSell(
            Number(new_cliente_id),
            Number(new_tipo_contrato_id),
            Number(new_produto_id),
            Number(new_usuario_id),
            statusClienteValor,
            horas_trabalhadas,
            datadofim,
            Number(valor_entrada),
            valor_total,
            datadoinicio,
            metodo_pagamento,
            email,
            telefone,
            nome_contato,
            numero_parcelo,
            2
        );

        toast({
            title: "Sucesso",
            description: "Cadastro realizado com sucesso!",
            className: "bg-green-500 text-white"
        });

        resetForm();
        route.push("/routes/cadastros");
    }

    async function handleSearchCPF(event: FormEvent) {
        event.preventDefault();
        const clienteEncontrado = listaCliente.find(client => client.cpf_cnpj === cpf_cnpj_input);
        setFoundCliente(clienteEncontrado || null);
        if (!clienteEncontrado) {
            toast({
                title: "Erro de Validação",
                description: "Cliente não encontrado",
            });
        }
    }

    const renderGestaoCliente = () => {
        if (!foundCliente) return null;
        return (
            <Link href={`/routes/gestao/cliente/${foundCliente.id}`} key={foundCliente.id}>
                <div onClick={() => route.push(`/routes/gestao/cliente/${foundCliente.id}`)} className='bg-gray-300 mb-4 rounded-lg flex-grow'>
                    <a className="block w-full">
                        <CardCliente dados={foundCliente} />
                    </a>
                </div>
            </Link>
        );
    };

    return (
        <>
            <div className="flex flex-col md:gap-3 md:flex md:flex-col lg:flex-row">
                <div className="w-full lg:w-3/5">
                    <Card className="p-10 drop-shadow-xl">
                        <form onSubmit={handleSearchCPF}>
                            <div className="flex justify-between mb-6 md:text-2xl font-bold">
                                <h1>Contrato</h1>
                                <h1 className="hidden">Nº 00005</h1>
                            </div>
                            <h2 className="mb-5 font-bold">Dados do Contrato</h2>
                            <div className="md:grid md:grid-cols-2 gap-5 mb-5">
                                <div className="md:grid md:grid-cols-2 gap-5 mt-5">
                                    <input
                                        className="border-b-2 h-6 mt-auto focus:outline-none focus:border-blue-500"
                                        placeholder="CPF/CNPJ do Cliente"
                                        type="text"
                                        value={cpf_cnpj_input}
                                        onChange={(e) => setCpfCnpjInput(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="w-28 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                        BUSCAR
                                    </button>
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2 gap-5 mt-5">
                                <div className="flex flex-col mb-5">
                                    <label className="text-sm" htmlFor="teste">Data Inicio</label>
                                    <input
                                        className="border-b-2 focus:outline-none focus:border-blue-500"
                                        placeholder="Data de inicio" type="date"
                                        value={DataInicio}
                                        onChange={(event) => setDataInicio(event.target.value)} />
                                </div>
                                <div className="flex flex-col mb-5">
                                    <label className="text-sm" htmlFor="teste">Data Termino</label>
                                    <input
                                        className="border-b-2 focus:outline-none focus:border-blue-500" type="date"
                                        value={DataFim}
                                        onChange={(event) => setDataFim(event.target.value)} />
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2">
                                <div className="md:grid md:grid-cols-1 mb-5 md:mb-9 w-48">
                                    <label className="col-span-2 text-sm" htmlFor="teste">Modelo do Contratos</label>
                                    <Select onValueChange={(value) => setnew_tipo_contrato_id(value)}>
                                        <SelectTrigger className="h-8 mt-1 mb-4 rounded-lg w-36">
                                            <SelectValue placeholder="Tipo Contrato" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ModeloContrato.map((tipos_contrato) => (
                                                <SelectItem key={tipos_contrato.id} value={tipos_contrato.id.toString()}>{tipos_contrato.nome}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <label className="col-span-2 text-sm" htmlFor="teste">Produto</label>
                                    <Select onValueChange={(value) => setnew_produto_id(value)}>
                                        <SelectTrigger className="h-8 mt-1 rounded-lg w-36">
                                            <SelectValue placeholder="Produto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TiposProduto.map((tipo_Produto) => (
                                                <SelectItem key={tipo_Produto.id} value={tipo_Produto.id.toString()}>{tipo_Produto.nome}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col mb-5 md:ml-5">
                                    <label className="text-sm mb-2" htmlFor="teste">Horas Trabalhadas</label>
                                    <input
                                        className="border-b-2 focus:outline-none focus:border-blue-500"
                                        placeholder="Horas"
                                        type="number"
                                        value={horas_trabalhadas}
                                        onChange={(event) => setHorasTrabalhadas(Number(event.target.value))}
                                    />
                                </div>
                            </div>
                            <h2 className="font-bold">Dados do Contato</h2>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Nome"
                                    value={nome_contato}
                                    onChange={(event) => setNomeContato(event.target.value)}
                                    type="text" />
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="(99) 99999-9999"
                                    value={telefone}
                                    onChange={(event) => setTelefoneContato(event.target.value)}
                                    type="tel" />
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Email" 
                                    value={email}
                                    onChange={(event) => setEmailContato(event.target.value)}
                                    type="email" />
                            </div>
                        </form>
                    </Card>
                </div>
                <div className="w-full lg:w-2/5">
                    <Card className="p-10 drop-shadow-xl">
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-center mb-6 text-2xl font-bold">
                                <h1>Forma de Pagamento</h1>
                            </div>
                            <div className="flex mb-4 ">
                                <label className="mr-4" htmlFor="teste">Valor da Entrada</label>
                                <input
                                    className="border-b-2 w-28 focus:outline-none focus:border-blue-500"
                                    placeholder="R$ 0000,00" type="text"
                                    value={valor_entrada}
                                    onChange={(event) => setValorEntrada(event.target.value)} />
                            </div>
                            <div className="mb-5">
                                <label className="text-sm" htmlFor="Nn">Status Cliente</label>
                                <Select onValueChange={(value) => setstatusCliente(value)}>
                                    <SelectTrigger className="h-8 mt-2 rounded-lg w-36">
                                        <SelectValue placeholder="Tipo Cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"antigo"}>Antigo</SelectItem>
                                        <SelectItem value={"novo"}>Novo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <h2 className="font-bold mb-5">Metodo de Pagamento</h2>
                            <div className="space-y-4 md:flex md:justify-between md:w-full">
                                <div className="flex gap-3">
                                    <div className="flex items-center">
                                        <input
                                            id="pagamento-opcao-1" type="radio" name="forma-pagamento"
                                            value="À vista"
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                            aria-labelledby="pagamento-opcao-1"
                                            aria-describedby="pagamento-opcao-1"
                                            onClick={() => {
                                                setmetodo_pagamento("À vista");
                                                setnumero_parcelo("1");
                                                setMostrarParcelas(false);
                                            }} />
                                        <label htmlFor="pagamento-opcao-1"
                                            className="block ml-2 text-sm font-medium text-gray-900">
                                            À vista
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="pagamento-opcao-2" type="radio" name="forma-pagamento"
                                            value="Parcelado"
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                            aria-labelledby="pagamento-opcao-2"
                                            aria-describedby="pagamento-opcao-2"
                                            onClick={() => {
                                                setmetodo_pagamento("Parcelado");
                                                setMostrarParcelas(true);
                                            }} />
                                        <label htmlFor="pagamento-opcao-2"
                                            className="block ml-2 text-sm font-medium text-gray-900">
                                            Parcelado
                                        </label>
                                    </div>
                                </div>
                                {mostrarParcelas && (
                                    <div className="flex space-x-4">
                                        <input
                                            className="border-b-2 text-center w-14 flex focus:outline-none focus:border-blue-500"
                                            placeholder="36x"
                                            type="number"
                                            value={numero_parcelo}
                                            onChange={(event) => setnumero_parcelo(event.target.value)}
                                        />
                                        <Link href="">
                                            <PopUpConfig valorTotal={valor_total} parcelas={numero_parcelo} />
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between mt-5 h-auto">
                                <label className="font-bold" htmlFor="teste">Valor total a pagar:</label>
                                <h1 className="font-bold">{`R$ ${valor_total.toFixed(2)}`}</h1>
                            </div>
                            <div className="mt-5 text-center">
                                <button type="submit"
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                    CADASTRAR
                                </button>
                            </div>
                        </form>
                    </Card>
                    <div className="flex flex-col mb-5 py-3">
                        {renderGestaoCliente()}
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
}
