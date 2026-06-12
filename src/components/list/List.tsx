import { ChevronsDownUp, Ellipsis, Plus } from "lucide-react";
import { iList } from "../../types/iList";
import { iLead } from "../../types/iLead";
import Lead from "../lead/Lead";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import ListOptions from "./ListOptions";
import ListAddLead from "./ListAddLead";

export default function List(
    { 
        color, 
        leads, 
        name, 
        id, 
        moveLeadToOtherList,
        setLists
    }: 
    iList & 
    { 
        moveLeadToOtherList: (leadId:number, previousListId:number, newList:number) => void,
        setLists: Dispatch<SetStateAction<iList[]>>
    }
) {
    
    const transferLead = async(e: React.DragEvent) => {
        e.preventDefault()

        const transferedData = e.dataTransfer.getData('leadData')
        if(!transferedData) return

        const leadData = JSON.parse(transferedData)
        moveLeadToOtherList(leadData.id, leadData.listId, id)
    }

    const [isOpen, setIsOpen] = useState<boolean>(true)
    console.log(color)
    return (
        <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => transferLead(e)}
        style={{ background: color || '#9CA3AF' }}
        className={`rounded-lg ${color ? `bg-[${color}]` : 'bg-gray-400'} p-3 w-60 shadow-sm flex flex-col gap-y-5`}>
            <div className="flex justify-between ">
                <h1 className="text-sm text-white font-bold">{name}</h1>
                <div className="flex gap-x-1 items-center">
                    <ListAddLead setLists={setLists} listId={id}/>
                    <CollapsibleTrigger>
                        <ChevronsDownUp color="white" className="cursor-pointer" size={16}/>
                    </CollapsibleTrigger>
                    <ListOptions
                    setLists={setLists}
                    color={color}
                    id={id}
                    name={name}
                    />
                </div>
            </div>
            <CollapsibleContent className="flex flex-col gap-y-3">
                {Array.isArray(leads) && leads?.map((l:iLead) => (
                    <Lead setLists={setLists} key={l.id} listId={id} id={l.id} name={l.name} status={l.status}/>
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}