"use client";
import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createNewProduto, getAllTiposClientes } from '@/lib/ProdutoController';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dadosTipo_cliente } from '@/lib/interfaces/dadosUsuarios';

export default function CadastroProduto() {
    const [nomeProduto, setNomeProduto] = useState<string>('');
    const [horasTrabalhadas, setHorasTrabalhadas] = useState<string>('');
    const [descricaoProduto, setDescricaoProduto] = useState<string>('');
    const [comissaoNovo, setComissaoNovo] = useState<string>('');
    const [comissaoAntigo, setComissaoAntigo] = useState<string>('');
    const descricaoLimiteCaracteres = 255;
    const router = useRouter();

    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const descricao = event.target.value;
        if (descricao.length <= descricaoLimiteCaracteres) {
            setDescricaoProduto(descricao);
        }
    };



    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await createNewProduto(
            nomeProduto,
            Number(horasTrabalhadas),
            descricaoProduto,
            Number(comissaoNovo),
            Number(comissaoAntigo)
        );
        router.push('/routes/ajustes');
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center items-center flex-grow">
                <div className="max-w-lg w-full bg-white shadow-xl rounded-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Cadastro Produto</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="nomeProduto"
                                name="nomeProduto"
                                value={nomeProduto}
                                onChange={(event) => setNomeProduto(event.target.value)}
                                placeholder="Nome do Produto"
                                required
                                className="w-full border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="gap-5 mb-4 grid grid-cols-3 rounded-none">
                            <input
                                type="text"
                                id="horasTrabalhadas"
                                name="horasTrabalhadas"
                                value={horasTrabalhadas}
                                onChange={(event) => setHorasTrabalhadas(event.target.value)}
                                placeholder="R$"
                                required
                                className="col-span-1 border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="number"
                                id="comissaoNovo"
                                name="comissaoNovo"
                                value={comissaoNovo}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    if (Number(value) >= 0) {
                                        setComissaoNovo(value);
                                    }
                                }}
                                min="0"
                                placeholder="Nova Comissão"
                                required
                                className="col-span-1 border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="number"
                                id="comissaoAntigo"
                                name="comissaoAntigo"
                                value={comissaoAntigo}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    if (Number(value) >= 0) {
                                        setComissaoAntigo(value);
                                    }
                                }}
                                min="0"
                                placeholder="Comissão Antiga"
                                required
                                className="col-span-1 border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                            />

                        </div>
                        <div className="mb-4 flex flex-col">
                            <div>
                                <textarea
                                    id="descricaoProduto"
                                    name="descricaoProduto"
                                    value={descricaoProduto}
                                    onChange={handleDescricaoChange}
                                    placeholder="Descrição do Produto"
                                    rows={4}
                                    maxLength={descricaoLimiteCaracteres}
                                    className="shadow-inner-2 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                                <div className="flex justify-end">
                                    <p className="text-sm text-gray-500">{descricaoProduto.length}/{descricaoLimiteCaracteres}</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                CADASTRAR
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
