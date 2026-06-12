import { Ellipsis } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import ConfirmListDelete from "./ConfirmListDelete"
import EditList from "./EditList"
import { Dispatch, SetStateAction } from "react"
import { iList } from "@/types/iList"

export default function ListOptions(
    {
        name, 
        color, 
        id,
        setLists
    }: 
    { 
        name:string, 
        color?:string, 
        id:number,
        setLists: Dispatch<SetStateAction<iList[]>>
    }
    ) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis color="white" className="cursor-pointer" size={16}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                    <EditList setLists={setLists} name={name} color={color} id={id}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Editar</DropdownMenuItem>
                    </EditList>
                    <ConfirmListDelete setLists={setLists} id={id}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Apagar</DropdownMenuItem>
                    </ConfirmListDelete>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}