import { EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Dispatch, FormEvent, ReactNode, SetStateAction, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { iList } from "@/types/iList"
import { toast } from "sonner"

export default function EditLead(
    { 
        id, 
        name, 
        status,
        children,
        setLists
    }: 
    {
        id:number,
        name:string,
        status:string,
        children: ReactNode,
        setLists: Dispatch<SetStateAction<iList[]>>
    }
) {

    const editLead = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const updatedName = formData.get('name') || undefined
        const updatedStatus = formData.get('status') || undefined

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: updatedName,
                    status: updatedStatus
                })
            })

            if(!res.ok) {
                const errorData = await res.json()
                toast.error(errorData.message)
                return
            }

            setIsOpen(false)
            setLists(currentList => {
                return currentList.map(list => {
                    return {
                        ...list,
                        leads:  list.leads?.map(lead => {
                            if(lead.id != id) return lead

                            return {
                                ...lead,
                                name: updatedName?.toString() || lead.name,
                                status: updatedStatus?.toString() || lead.status,
                            }
                        })
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
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar lead</DialogTitle>
                </DialogHeader>
                <form onSubmit={editLead} method="post" id="editLeadForm" className="flex flex-col gap-y-5">
                    <div className="form">
                        <Label>Nome do lead:</Label>
                        <Input name="name" placeholder={name} type="text"/>
                    </div>
                    <div className="form">
                        <Label>Status do lead:</Label>
                        <Select name="status">
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