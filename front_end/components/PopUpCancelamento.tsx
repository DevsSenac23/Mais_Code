import { CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import { CancelamentodaVenda } from "@/lib/VendaController";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";


export default function PopUpCancelamento({ id }: { id: number }) {
    const [descricaoProduto, setDescricaoProduto] = useState<string>('');
    const descricaoLimiteCaracteres = 255;
    const route = useRouter()
    const { toast } = useToast();
    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const descricao = event.target.value;
        // Verifica se a descrição excede o limite de caracteres
        if (descricao.length <= descricaoLimiteCaracteres) {
            setDescricaoProduto(descricao);
        }
    };


    async function handleCancel() {
        try {
            const response = await CancelamentodaVenda(id)
            if (response.status === 1) {
                toast({
                    title: "Sucesso",
                    description: "Venda inativada!",
                    className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
                });
                setTimeout(() => {
                    route.push('/routes/relatorio');
                }, 2000);
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao inativada a venda!",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
            console.error("Erro ao cancelar a venda:", error);
        }
    }

    return (
        <CardFooter className="flex justify-center items-center w-full h-full">
            <Dialog>
                <DialogTrigger asChild >
                    {/* <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ">Confirmar</button> */}
                    <button className="col-span-1  font-bold text-black bg-white rounded border border-red-600 hover:bg-red-700 hover:text-white focus:outline-none">Inativar Venda</button>
                </DialogTrigger>
                <DialogContent className="w-1/3 rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="mt-2 text-center text-4xl text-red-500 mb-2">
                            Cancelamento Venda
                        </DialogTitle>
                        <DialogDescription className="flex justify-center items-center">
                            Explique o motivo do cancelamento
                            da venda no campo a baixo
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <textarea
                            id="descricaoProduto"
                            name="descricaoProduto"
                            value={descricaoProduto}
                            onChange={handleDescricaoChange}
                            placeholder="Descreva o motivo do cancelamento"
                            rows={4}
                            maxLength={descricaoLimiteCaracteres}
                            className="shadow-inner-2 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        {/* Exibe o contador de caracteres restantes */}
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500">{descricaoProduto.length}/{descricaoLimiteCaracteres}</p>
                        </div>
                    </div>
                    <DialogFooter className="flex justify-center items-center">
                        <div>
                            <button className="w-auto border border-green-500 text-black font-semibold bg-white transition duration-500 ease-in-out
                             hover:bg-green-500 hover:text-white" type="button" onClick={handleCancel}>Confirmar</button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    )
}
