import { ChevronsDownUp, Ellipsis } from "lucide-react";
import { iList } from "../types/iList";
import { iLead } from "../types/iLead";
import Lead from "./Lead";
import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import ListOptions from "./ListOptions";

export default function List(
    { 
        color, 
        leads, 
        name, 
        id, 
        moveLeadToOtherList 
    }: 
    iList & 
    { moveLeadToOtherList: (leadId:number, previousListId:number, newList:number) => void }
) {
    
    const transferLead = async(e: React.DragEvent) => {
        e.preventDefault()

        const transferedData = e.dataTransfer.getData('leadData')
        if(!transferedData) return

        const leadData = JSON.parse(transferedData)
        moveLeadToOtherList(leadData.id, leadData.listId, id)
    }

    const [isOpen, setIsOpen] = useState<boolean>(true)
    
    return (
        <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => transferLead(e)}
        className={`rounded-lg ${color ? `bg-[#${color}]` : 'bg-gray-400'} p-3 w-60 shadow-sm flex flex-col gap-y-5`}>
            <div className="flex justify-between ">
                <h1 className="text-sm text-white font-bold">{name}</h1>
                <div className="flex gap-x-1 items-center">
                    <CollapsibleTrigger>
                        <ChevronsDownUp className="cursor-pointer" size={16}/>
                    </CollapsibleTrigger>
                    <ListOptions 
                    color={color}
                    id={id}
                    name={name}
                    />
                </div>
            </div>
            <CollapsibleContent className="flex flex-col gap-y-3">
                {leads?.map((l:iLead) => (
                    <Lead key={l.id} listId={id} id={l.id} name={l.name} status={l.status}/>
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}