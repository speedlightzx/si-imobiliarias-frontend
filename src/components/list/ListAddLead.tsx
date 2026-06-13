import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { iList } from "@/types/iList";
import { toast } from "sonner";

export default function ListAddLead(
    { 
        listId,
        setLists
    }: { 
        listId: number,
        setLists: Dispatch<SetStateAction<iList[]>>
    }) {

    const submitNewLeadForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name')
        const temperature = formData.get('temperature')
        const status = formData.get('status')

        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name,
                status,
                listId,
                temperature
            })
        })

        if(!res.ok) {
            const errorData = await res.json()
            toast.error(errorData.message)
            return
        }

        const leadData = await res.json()

        setIsOpen(false)
        setLists(currentList => {
            return currentList.map(l => {
                if(l.id != listId) return l

                return {
                    ...l,
                    leads:  [...l.leads || [], {
                        id: leadData.id,
                        name: name!.toString(),
                        status: status!.toString(),
                        temperature: temperature!.toString()
                    }]
                }
            })
        })

        } catch(e) {
            toast.error('Algum erro inesperado aconteceu...')
        }
    }

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Plus className="cursor-pointer" color="white" size={16}/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar lead</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitNewLeadForm} method="post" id="editLeadForm" className="flex flex-col gap-y-5">
                    <div className="form">
                        <Label>Nome do lead:</Label>
                        <Input name="name" type="text"/>
                    </div>
                    <div className="form">
                        <Label>Temperatura do lead:</Label>
                        <Select required name="temperature">
                            <SelectTrigger>
                                <SelectValue placeholder={status}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Alterar temperatura do lead</SelectLabel>
                                    <SelectItem value="Frio">Frio</SelectItem>
                                    <SelectItem value="Morno">Morno</SelectItem>
                                    <SelectItem value="Quente">Quente</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="form">
                        <Label>Status do lead:</Label>
                        <Select required name="status">
                            <SelectTrigger>
                                <SelectValue placeholder={status}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Alterar status do lead</SelectLabel>
                                    <SelectItem value="Novo">Novo</SelectItem>
                                    <SelectItem value="Contato">Contato</SelectItem>
                                    <SelectItem value="Qualificado">Qualificado</SelectItem>
                                    <SelectItem value="Visita">Visita</SelectItem>
                                    <SelectItem value="Proposta">Proposta</SelectItem>
                                    <SelectItem value="Fechado">Fechado</SelectItem>
                                    <SelectItem value="Lost">Perdido</SelectItem>
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