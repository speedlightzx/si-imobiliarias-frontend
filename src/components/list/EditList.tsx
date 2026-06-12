import { Dispatch, FormEvent, ReactNode, SetStateAction, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { iList } from "../../types/iList";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function EditList(
    { 
        id, 
        name, 
        color, 
        children, 
        setLists 
    }: iList & { 
        children: ReactNode,
        setLists: Dispatch<SetStateAction<iList[]>>
    }) {
    
    const submitEditedListForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name')
        const color = formData.get('color')

        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name: name || undefined,
                color: color || undefined
            })
        })

        if(!res.ok) {
            const errorData = await res.json()
            toast.error(errorData.message)
            return
        }

        setIsOpen(false)
        setLists(currentList => {
            return currentList.map(l => {
                if(l.id != id) return l

                return {
                    ...l,
                    name: name ? name.toString() : l.name,
                    color: color ? color.toString() : l.color
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
                    <DialogTitle>Editar lista</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitEditedListForm} method="post" id="editListForm" className="flex flex-col gap-y-5">
                    <div className="form">
                        <Label>Nome da lista:</Label>
                        <Input name="name" placeholder={name} type="text"/>
                    </div>
                    <div className="form">
                        <Label>Cor da lista:</Label>
                        <Input name="color" defaultValue={color} type="color"/>
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