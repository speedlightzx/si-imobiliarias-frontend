import { Dispatch, ReactNode, SetStateAction } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { toast } from "sonner";
import { iList } from "@/types/iList";

export default function ConfirmListDelete(
    { 
        id, 
        children,
        setLists
    }: { 
        id:number, 
        children: ReactNode,
        setLists: Dispatch<SetStateAction<iList[]>>
    }) {
    
    const deleteList = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            if(!res.ok) {
                const errorData = await res.json()
                toast.error(errorData.message)
                return
            }

            setLists(currentList => {
                return currentList.filter(l => l.id != id)
            })

        } catch(e) {
            toast.error('Algum erro inesperado aconteceu...')
        }
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza que quer apagar essa lista?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apagar essa lista é um caminho sem volta! Ao apagar essa lista, todos os Leads associados a essa lista também serão apagados!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                    onClick={() => deleteList()}
                    className="bg-red-500 hover:bg-red-700">
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}