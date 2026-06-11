import { iLead } from "../types/iLead";
import LeadOptions from "./LeadOptions";
import { Badge } from "./ui/badge";

export default function Lead(
    { 
        id, 
        name, 
        status, 
        listId 
    }: 
    iLead &
    { listId: number }
) {
    const getBadgeColor = (status:string) => {
        if(status == 'Frio') return '#3730ff'
        if(status == 'Morno') return '#ff8c00'
        if(status == 'Quente') return '#FF0000'
    }

    return (
        <div 
        draggable
        onDragStart={(e) => {
            e.dataTransfer.setData("leadData", JSON.stringify({ id, name, status, listId }))
        }}
        className="bg-white rounded-lg shadow-xs flex p-1.5 ">
            <div className="flex flex-col gap-y-2 w-[95%]">
                <h1 className="text-sm">{name}</h1>
                <Badge 
                style={{ background: getBadgeColor(status) }}
                className={`text-xs text-white rounded-sm!`}>
                    {status}
                </Badge>
            </div>
            <div className="flex item-center self-center">
                <LeadOptions 
                id={id}
                name={name}
                status={status}
                />
            </div>
        </div>
    )
}