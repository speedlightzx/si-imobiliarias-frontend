import { iMessage } from "../../types/iMessage";

export default function Message({ author, content }: iMessage ) {
    return (
        <div className={`border p-1.5 rounded-lg max-w-[80%]  ${author == 'Bot' ? 'bg-gray-800 self-start mb-3' : 'bg-gray-500 self-end'}`}>
            <p className="text-white text-sm">{content}</p>
        </div>
    )
}