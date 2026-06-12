import { Plus } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { iList } from "@/types/iList";

export default function AddNewList({ setLists }: { setLists: Dispatch<SetStateAction<iList[]>>}) {

    const submitNewListForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const listName = formData.get('name')
        const listColor = formData.get('color') || undefined

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: listName,
                    color: listColor
                })
            })

            if(!res.ok) {
                const errorData = await res.json()
                toast.error(errorData.message)
                return
            }

            const createdList = await res.json()
            setIsOpen(false)
            setLists(currentList => [...currentList, createdList])

        } catch(e) {
            toast.error('Algum erro inesperado aconteceu...')
        }
    }

    const [isOpen, setIsOpen] =  useState<boolean>(false)
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                <form onSubmit={submitNewListForm} id="createListForm" method="post" className="flex flex-col gap-y-5">
                <div className="form">
                    <Label className="place-self-center">Nome da lista:</Label>
                    <Input required type="text" name="name" placeholder="Insira o nome da lista"/>
                </div>
                <div className="form">
                    <Label className="place-self-center">Cor da lista:</Label>
                    <Input defaultValue="#9CA3AF" name="color" type="color"/>
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