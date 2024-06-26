import {backendURL} from "@/lib/URLS/backendURL";

// Retorna os clientes 
export async function getAllClient() {
    const response = await fetch(`${backendURL()}/VendaService.php?acao=getAllClient`);
    const dados = await response.json();
    console.log(dados);
    return dados;
}

// Retorna os users
export async function getAllUsers() {
    const resposta = await fetch(`${backendURL()}/VendaService.php?acao=getAllUsers`)
    const dados = await resposta.json();
    return dados;
}

// Retorna os produtos
export async function getAllProductById() {
    const resposta = await fetch(`${backendURL()}/VendaService.php?acao=getAllProductById`)
    const dados = await resposta.json();
    return dados;
}

// Faz o insert
export async function createNewSell(
    new_cliente_id: number,
    new_tipo_contrato_id: number,
    new_produto_id: number,
    new_usuario_id: number,
    final_contrato: Date,
    valor_entrada: number,
    valor_total: number,
    inicio_contrato: Date,
    metodo_pagamento: string,
    email: string,
    telefone: string,
    nome_contato: string,
    numero_parcelo: number,
    new_status: number
) {
    try {
        const response = await fetch(`${backendURL()}/VendaService.php?acao=createNewSell`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cliente_id: new_cliente_id,
                tipo_contrato_id: new_tipo_contrato_id,
                numero_parcelo: numero_parcelo,
                produto_id: new_produto_id,
                usuario_id: new_usuario_id,
                final_contrato: final_contrato,
                valor_entrada: valor_entrada,
                valor_total: valor_total,
                inicio_contrato: inicio_contrato,
                metodo_pagamento: metodo_pagamento,
                email: email,
                telefone: telefone,
                nome_contato: nome_contato,
                status: new_status
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}