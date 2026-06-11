import { EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import EditLead from "./EditLead"
import ConfirmLeadDelete from "./ConfirmLeadDelete"

export default function LeadOptions(
    { 
        id, 
        name, 
        status 
    }: 
    {
        id:number,
        name:string,
        status:string
    }
) {
    return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <EllipsisVertical className="cursor-pointer" size={16}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
            <DropdownMenuGroup>
                <DropdownMenuLabel>Opções</DropdownMenuLabel>
                <EditLead id={id} name={name} status={status}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Editar</DropdownMenuItem>
                </EditLead>
                <ConfirmLeadDelete id={id}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Apagar</DropdownMenuItem>
                </ConfirmLeadDelete>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}