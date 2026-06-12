import { Dispatch, ReactNode, SetStateAction } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { toast } from "sonner"
import { iList } from "@/types/iList"

export default function ConfirmLeadDelete(
    { 
        id, 
        children,
        setLists
    }: 
    {
        id:number,
        children: ReactNode,
        setLists: Dispatch<SetStateAction<iList[]>>
    }
) {

    const deleteLead = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${id}`, {
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
                return currentList.map(l => {
                    return {
                        ...l,
                        leads:  l.leads?.filter(l => l.id != id)
                    }
                })
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
                    <AlertDialogTitle>Você tem certeza que quer apagar esse lead?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apagar esse lead é um caminho sem volta! Não será possível recuperar depois.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                    onClick={() => deleteLead()}
                    className="bg-red-500 hover:bg-red-700">
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}