import { Plus } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AddNewList() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='backdrop-blur-xl bg-gray-400/40 border-white border rounded-lg p-3 w-60 shadow-sm flex justify-center items-center gap-x-2 cursor-pointer'>
                    <h1 className="text-sm text-white font-bold">Criar nova lista</h1>
                    <Plus color="white"/>
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar nova lista</DialogTitle>
                </DialogHeader>
                <form id="createListForm" method="post" className="flex flex-col gap-y-5">
                <div className="form">
                    <Label className="place-self-center">Nome da lista:</Label>
                    <Input required type="text" placeholder="Insira o nome da lista"/>
                </div>
                <div className="form">
                    <Label className="place-self-center">Cor da lista:</Label>
                    <Input type="color"/>
                </div>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button>Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" form="createListForm" className="bg-green-500">Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}