import {backendURL} from "@/lib/URLS/backendURL";

export async function fetchData() {
    try {
        const response = await fetch(`${backendURL()}/RelatorioVendas.php?acao=BuscaRelatorio`);
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados do relatório");
        }
        const jsonData = await response.json();
        console.log(jsonData)
        return (jsonData);

    } catch (error) {
        console.error("Erro:", error);
    }
}

export async function GetDadosVendaByData(
    Newdata: Date
) {
    try {
        const response = await fetch(
            `${backendURL()}/RelatorioVendas.php?acao=BuscaRelatorioByData`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: Newdata
                }),
            }
        );
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados do relatório");
        }
        const jsonData = await response.json();
        console.log(jsonData)
        return (jsonData);

    } catch (error) {
        console.error("Erro:", error);
    }
}