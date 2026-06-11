import { ReactNode } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { iList } from "../../types/iList";
import { Button } from "./ui/button";

export default function EditList({ id, name, color,  children }: iList & { children: ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar lista</DialogTitle>
                </DialogHeader>
                <form method="post" id="editListForm" className="flex flex-col gap-y-5">
                    <div className="form">
                        <Label>Nome da lista:</Label>
                        <Input placeholder={name} type="text"/>
                    </div>
                    <div className="form">
                        <Label>Cor da lista:</Label>
                        <Input placeholder={color || "Nenhuma cor escolhida."} type="color"/>
                    </div>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'}>Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" form="editListForm" className="bg-green-500">Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}