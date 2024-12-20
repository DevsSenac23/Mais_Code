import { criarCookie, getCookie } from "./coockie";
import { Cargos } from "./interfaces/dadosUsuarios";
import { backendURL } from "./URLS/backendURL";

export async function createNewUserGestao(
    newNome: string,
    newCargoid: number,
    newEmail: string,
    newSenha: string
) {
    const request = await fetch(`${backendURL()}/UserService.php?acao=createNewUserGestao`,
        {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: newNome,
                cargo_id: newCargoid,
                senha: newSenha,
                email: newEmail
            }
            )
        });
    const response = await request.json();
    return JSON.parse(response)
}

export async function validacaoLogin(
    newEmail: string,
    newSenha: string
) {
    const request = await fetch(`${backendURL()}/UserService.php?acao=validacaoLogin`, {
        method: "POST",
        body: JSON.stringify({
            email: newEmail,
            senha: newSenha
        }
        )
    });

    const response = await request.json();


    if (response != 0) {
        if (response[0].status_usuario == 1) {
            await criarCookie("CookiCriado", response[0].id);
            await criarCookie("UserName", response[0].nome);
            await criarCookie("UserEmail", response[0].email);
            await criarCookie("UserSenha", response[0].senha);
            await criarCookie("UserCargo", response[0].cargo_id);
            return response;
        } else {
            return { error: "Usuário inativo. Entre em contato com o administrador." };
        }
    }

    return { error: "Usuário não encontrado." };
}


export async function updateUserPerfil(
    nome: string,
    email: string,
    senha: string,
) {
    const userId = await getCookie("CookiCriado");

    const response = await fetch(`${backendURL()}/UserService.php?acao=updateUserPerfil&id=${userId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        })
    });

    const result = await response.json();
    console.log('Response from server:', result);

    if (result.status === 1) {
        await criarCookie("UserName", nome);
        await criarCookie("UserEmail", email);
        await criarCookie("UserSenha", senha);
    }
    return result;
}
export async function getAllUsers() {
    const resposta = await fetch(`${backendURL()}/UserService.php?acao=getAllUsers`)
    const dados = await resposta.json();
    return dados;
}

export async function getAllCargo() {
    const resposta = await fetch(`${backendURL()}/UserService.php?acao=getAllCargo`)
    const dados = await resposta.json();
    return dados;
}

export function escolheTipoCliente(cargo_id: number) {
    switch (cargo_id) {


        case Cargos.Administrador:
            return "Administrador"
            break;
        case Cargos.Vendedor:
            return "Vendedor"
            break;
        case Cargos.Financeiro:
            return "Financeiro"
            break;

        case Cargos.Cliente:
            return "Cliente"
            break;
    }
}

export async function getUserById(userId: number) {
    const response = await fetch(`${backendURL()}/UserService.php?acao=GetUserById&id=${userId}`);
    const dados = await response.json();
    return dados;
}

export async function updateUser(
    newNome: string,
    newCargoid: number,
    newEmail: string,
    newSenha: string,
    newStatus: number,
    paramsId: number
) {
    const request = await fetch(`${backendURL()}/UserService.php?acao=UpdateUserById&id=${paramsId}`, {
        method: "POST",
        body: JSON.stringify({
            nome: newNome,
            cargo_id: newCargoid,
            senha: newSenha,
            status_usuario: newStatus,
            email: newEmail
        }
        )
    });
    const response = JSON.parse(await request.json());
    return response;
}

export async function updatePerfil(
    newNome: string,
    newEmail: string,
    newSenha: string,
    paramsId: number
) {
    const request = await fetch(`${backendURL()}/UserService.php?acao=UpdateUserById&id=${paramsId}`, {
        method: "POST",
        body: JSON.stringify({
            nome: newNome,
            senha: newSenha,
            email: newEmail
        }
        )
    });
    const response = await request.json();
    return response.message;
}

export async function createDefaultUserIfNoneExist(): Promise<any> {
    const resposta = await fetch(`${backendURL()}/UserService.php?acao=createDefaultUserIfNoneExist`);

    if (!resposta.ok) {
        throw new Error("Erro ao criar usuário administrador.");
    }

    const dados = await resposta.json();
    return dados;
}
