import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function CardWithForm() {
    return (
        <CardFooter className="flex justify-center items-center shadow-2xl">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ">Cadastrar cliente </Button>
                </DialogTrigger>
                <DialogContent className="w-auto">
                    <DialogHeader>
                        <DialogTitle className="mt-3 text-center text-xl">Confirmar alteração?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="flex justify-center items-center">
                        <div className="space-x-3">
                            <Button className="bg-green-500" type="button">Confirmar </Button>
                            <Button className="bg-red-500 " type="button"> Cancelar</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    )
}