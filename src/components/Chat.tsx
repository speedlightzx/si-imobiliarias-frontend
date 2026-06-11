import { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { SendHorizonal } from "lucide-react";
import { iMessage } from "../types/iMessage";
import Message from "./Message";

export default function Chat({ children }: { children:ReactNode }) {

    const [messages, setMessages] = useState<iMessage[]>([
        { author: 'Bot', content: 'Olá, eu sou o assistente inteligente, me chame aqui no chat caso precise de alguma ajuda! 😄' },
    ])

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Chatbot</SheetTitle>
                    <SheetDescription>Converse com nosso assistente inteligente.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-y-2 p-1">
                    {messages.map((m, i) => (
                        <Message
                        key={i}
                        author={m.author}
                        content={m.content}
                        />
                    ))}
                </div>
                <SheetFooter className="relative">
                    <Input type="text" placeholder="Envie uma mensagem" className="pr-"/>
                    <SendHorizonal size={22} className="absolute top-1/3 right-5"/>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}