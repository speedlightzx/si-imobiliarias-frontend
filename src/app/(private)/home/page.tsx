'use client'

import List from "@/components/list/List"
import { useEffect, useState } from "react"
import { iList } from "../../../types/iList"
import AddNewList from "@/components/list/AddNewList"
import { toast } from "sonner"

export default function Home() {
    const [lists, setLists] = useState<iList[]>([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(res => setLists(res.lists))
    }, [])

    const moveLeadToOtherList = async(leadId: number, previousListId: number, newListId: number) => {
    //se mover pra mesma lista retorna
    if (previousListId === newListId) return

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${leadId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                listId: newListId
            })
        })

        if(!res.ok) {
            const errorData = await res.json()
            toast.error(errorData.message)
            return
        }

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
            if (list.id === newListId) return { ...list, leads: [...list.leads! || [], lead] }
            
            return list
            })
        })
    } catch(e) {
        toast.error('Algum erro inesperado aconteceu.')
    }

    }

    return (
        <div className="w-full h-screen bg-neutral-200 overflow-y-hidden overflow-x-auto p-2">
            <div className="flex items-start gap-x-5 w-max">
                {Array.isArray(lists) && lists.map(l => (
                    <List
                    setLists={setLists}
                    key={l.id}
                    id={l.id}
                    name={l.name}
                    color={l.color}
                    leads={l.leads}
                    moveLeadToOtherList={moveLeadToOtherList}
                    />
                ))}
                <AddNewList setLists={setLists}/>
            </div>
        </div>
    )
}