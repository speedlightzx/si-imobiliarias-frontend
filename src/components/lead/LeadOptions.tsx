import { EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import EditLead from "./EditLead"
import ConfirmLeadDelete from "./ConfirmLeadDelete"
import { Dispatch, SetStateAction } from "react"
import { iList } from "@/types/iList"
import { iLead } from "@/types/iLead"

export default function LeadOptions(
    { 
        id, 
        name, 
        status,
        temperature,
        setLists
    }: 
    iLead &{
        setLists: Dispatch<SetStateAction<iList[]>>
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
                <EditLead temperature={temperature} setLists={setLists} id={id} name={name} status={status}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Editar</DropdownMenuItem>
                </EditLead>
                <ConfirmLeadDelete setLists={setLists} id={id}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Apagar</DropdownMenuItem>
                </ConfirmLeadDelete>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}