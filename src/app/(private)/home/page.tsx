'use client'

import List from "@/components/List"
import { useState } from "react"
import { iList } from "../../../../types/iList"
import AddNewList from "@/components/AddNewList"

export default function Home() {

    const [lists, setLists] = useState<iList[]>([
        { id: 1, name: "lista teste", leads: [
            { name: "teste frio", "status": "Frio", id: 1 },
            { name: "teste morno", "status": "Morno", id: 2 },
            { name: "teste quente", "status": "Quente", id: 3 }
        ] },
        { id: 2, name: "lista de pessoas", leads: [
            { name: "pedro", "status": "Morno", id: 4 },
            { name: "joao", "status": "Frio", id: 5 },
            { name: "henrique", "status": "Quente", id: 6 },
            { name: "marcos", "status": "Frio", id: 7 },
        ] }
    ])

    const moveLeadToOtherList = (leadId: number, previousListId: number, newListId: number) => {
    //se mover pra mesma lista retorna
    if (previousListId === newListId) return

    setLists(currentList => {

        //busca o lead na lista atual
        const lead = currentList
        ?.find(list => list.id === previousListId)
        ?.leads!.find(l => l.id === leadId)

        if (!lead) return currentList

        return currentList.map(list => {

        //remove o lead da lista anterior
        if (list.id === previousListId) return { ...list, leads: list.leads!.filter(l => l.id !== leadId) }
        
        //adiciona o lead na nova lista
        if (list.id === newListId) return { ...list, leads: [...list.leads!, lead] }
        
        return list
        })
    })
    }

    return (
        <div className="w-full h-screen overflow-x-auto bg-neutral-200 p-2">
            <div className="flex items-start gap-x-5">
                {lists.length > 0 && lists.map(l => (
                    <List
                    key={l.id}
                    id={l.id}
                    name={l.name}
                    color={l.color}
                    leads={l.leads}
                    moveLeadToOtherList={moveLeadToOtherList}
                    />
                ))}
                <AddNewList />
            </div>
        </div>
    )
}