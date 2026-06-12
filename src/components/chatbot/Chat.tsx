import { ReactNode, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Input } from "../ui/input";
import { SendHorizonal } from "lucide-react";
import { iMessage } from "../../types/iMessage";
import Message from "./Message";
import { socket } from "@/lib/socket";

export default function Chat({ children }: { children:ReactNode }) {

    const [chatMessages, setChatMessages] = useState<iMessage[]>([
        { author: 'Bot', content: 'Olá, eu sou o assistente inteligente, me chame aqui no chat caso precise de alguma ajuda! 😄' },
    ])

    useEffect(() => {
        socket.connect()

        socket.once('connect', () => {
            console.log('chat conectado com sucesso')
        })

        socket.on('response', (message) => {
            console.log(message)
            setChatMessages(messages => [...messages, { author: 'Bot', content: message }])
            setIsProcessingMessage(false)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const sendMessage = () => {
        if(!message) return
        if(isProcessingMessage) return
        socket.emit('message', {
            message
        })

        setChatMessages(messages => [...messages, { author: 'User', content: message! }])
        setMessage('')
        setIsProcessingMessage(true)
    }

    const [message, setMessage] = useState<string>()
    const [isProcessingMessage, setIsProcessingMessage] = useState<boolean>(false)

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
                <div className="flex flex-col gap-y-2 p-1 overflow-y-auto">
                    {chatMessages.map((m, i) => (
                        <Message
                        key={i}
                        author={m.author}
                        content={m.content}
                        />
                    ))}
                </div>
                 <SheetFooter className="relative">
                    <Input
                    disabled={isProcessingMessage}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message || ''}
                    onKeyDown={(e) => {
                        if(e.key == "Enter") sendMessage()
                    }}
                    type="text" 
                    placeholder="Envie uma mensagem" 
                    className="pr-"/>
                    <SendHorizonal onClick={() => sendMessage()} size={22} className="cursor-pointer absolute top-1/3 right-5"/>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}