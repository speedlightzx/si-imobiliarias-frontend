import { EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { ReactNode } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

export default function EditLead(
    { 
        id, 
        name, 
        status,
        children
    }: 
    {
        id:number,
        name:string,
        status:string,
        children: ReactNode
    }
) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar lista</DialogTitle>
                </DialogHeader>
                <form method="post" id="editLeadForm" className="flex flex-col gap-y-5">
                    <div className="form">
                        <Label>Nome do lead:</Label>
                        <Input placeholder={name} type="text"/>
                    </div>
                    <div className="form">
                        <Label>Status do lead:</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder={status}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Alterar status do lead</SelectLabel>
                                    <SelectItem value="Frio">Frio</SelectItem>
                                    <SelectItem value="Morno">Morno</SelectItem>
                                    <SelectItem value="Quente">Quente</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'}>Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" form="editLeadForm" className="bg-green-500">Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}