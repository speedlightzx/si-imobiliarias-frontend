'use client'

import { MessageCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Chat from "./Chat";

export default function FloatingChat() {
    return (
        <div>
            <Tooltip>
                <Chat>
                    <TooltipTrigger asChild>
                        <button className="transform duration-200 hover:scale-110 hover:bg-blue-500 cursor-pointer absolute bottom-3 right-5 rounded-full bg-blue-400 p-5">
                            <MessageCircle color="white" size={30}/>
                        </button>
                    </TooltipTrigger>
                </Chat>
                <TooltipContent side="left">
                    <p>Clique aqui para falar com o assistente de IA!</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}