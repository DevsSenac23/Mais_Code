import { remuneracaoComissao } from "@/lib/RelatorioComissaoController";
import { getCookie } from "@/lib/coockie";
import React from "react";
import { useEffect, useState } from "react";

export default function CardSalarioHome() {
    const [comissaoTotal, setComissaoTotal] = useState(0);
    const [usuario_id, set_usuario_id] = useState("");

    useEffect(() => {
        async function fetchUsername() {
            const user = await getCookie("CookiCriado");
            set_usuario_id(user || "Usuário");
        }
        fetchUsername();
    }, []);

    useEffect(() => {
        if (usuario_id) {
            carregarRemuneracao();
        }
    }, [usuario_id]);

    async function carregarRemuneracao() {
        try {
            const remuneracao = await remuneracaoComissao(Number(usuario_id));
            console.log(remuneracao);
            if (Array.isArray(remuneracao) && remuneracao.length > 0) {
                setComissaoTotal(parseFloat(remuneracao[0]["SUM(comissao_total)"]));
            } else {    
                setComissaoTotal(0);
            }
        } catch (error) {
            console.error('Failed to load remuneracao:', error);
            setComissaoTotal(0);
        }
    }

    return (
        <div className='rounded-lg flex flex-col justify-end bg-white drop-shadow-xl p-2'>
            <h3 className='text-center text-lg'>Remuneração</h3>
            <h1 className='text-4xl text-center font-bold'>R${comissaoTotal.toFixed(2)}</h1>
        </div>
    );
}
