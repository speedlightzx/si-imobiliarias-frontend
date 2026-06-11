import { Ellipsis } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import ConfirmListDelete from "./ConfirmListDelete"
import EditList from "./EditList"

export default function ListOptions(
    {
        name, 
        color, 
        id
    }: 
    { 
        name:string, 
        color?:string, 
        id:number 
    }
    ) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis className="cursor-pointer" size={16}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                    <EditList name={name} color={color} id={id}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Editar</DropdownMenuItem>
                    </EditList>
                    <ConfirmListDelete id={id}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Apagar</DropdownMenuItem>
                    </ConfirmListDelete>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}